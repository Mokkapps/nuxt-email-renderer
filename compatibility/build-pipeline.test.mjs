import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { once } from 'node:events'
import { cp, mkdtemp, readdir, readFile, rm, writeFile } from 'node:fs/promises'
import { createServer } from 'node:net'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { after, before, test } from 'node:test'
import { fileURLToPath } from 'node:url'
import { setTimeout as delay } from 'node:timers/promises'

const repoDir = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const nuxtVersion = process.env.EMAIL_TEST_NUXT || '4.4.6'
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm'
let fixtureDir

function start(command, args, options = {}) {
  const child = spawn(command, args, {
    cwd: fixtureDir,
    detached: process.platform !== 'win32',
    stdio: ['ignore', 'pipe', 'pipe'],
    ...options,
    env: { ...process.env, NO_COLOR: '1', ...options.env },
  })
  let output = ''
  let stdout = ''
  child.stdout.on('data', (chunk) => {
    stdout += chunk
    output += chunk
  })
  child.stderr.on('data', chunk => output += chunk)
  // Attach immediately so a missing executable cannot become an unhandled error.
  const finished = new Promise((resolve, reject) => {
    child.once('error', reject)
    child.once('close', (code, signal) => resolve({ code, signal }))
  })
  finished.catch(() => {})
  return { child, finished, output: () => output, stdout: () => stdout }
}

async function stop(running) {
  if (!running.child.pid || running.child.exitCode !== null || running.child.signalCode !== null) return
  // Nuxt dev starts worker processes; terminate the whole group as well.
  if (process.platform === 'win32') {
    const killer = spawn('taskkill', ['/pid', String(running.child.pid), '/T', '/F'])
    await once(killer, 'exit')
  }
  else {
    try {
      process.kill(-running.child.pid, 'SIGKILL')
    }
    catch (error) {
      if (error.code !== 'ESRCH') throw error
    }
  }
  await running.finished
}

async function run(command, args, options) {
  const running = start(command, args, options)
  const timeout = setTimeout(() => void stop(running), 240_000)
  try {
    const { code } = await running.finished
    assert.equal(code, 0, `${command} ${args.join(' ')} failed:\n${running.output()}`)
    return running.stdout()
  }
  finally {
    clearTimeout(timeout)
    await stop(running)
  }
}

async function freePort() {
  const server = createServer()
  server.listen(0, '127.0.0.1')
  await once(server, 'listening')
  const { port } = server.address()
  await new Promise((resolve, reject) => server.close(error => error ? reject(error) : resolve()))
  return port
}

async function waitForServer(url, running) {
  const deadline = Date.now() + 90_000
  while (Date.now() < deadline) {
    assert.equal(running.child.exitCode, null, running.output())
    try {
      // Nuxt 5 serves a 503 loading screen before its server is ready. Retry
      // that response only; a rendering error (500) must fail the assertions.
      const response = await fetch(url, { signal: AbortSignal.timeout(1000) })
      await response.body?.cancel()
      if (response.status === 503) {
        await delay(200)
        continue
      }
      return
    }
    catch {
      await delay(200)
    }
  }
  assert.fail(`Server did not start at ${url}:\n${running.output()}`)
}

before(async () => {
  fixtureDir = await mkdtemp(join(tmpdir(), 'nuxt-email-pipeline-'))
  await cp(join(repoDir, 'compatibility/fixture'), fixtureDir, { recursive: true })
  const packOutput = await run(npm, ['pack', '--ignore-scripts', '--json', '--pack-destination', fixtureDir], { cwd: repoDir })
  const [{ filename }] = JSON.parse(packOutput)
  await writeFile(join(fixtureDir, 'package.json'), JSON.stringify({
    name: 'email-build-pipeline-fixture',
    private: true,
    type: 'module',
    dependencies: {
      'nuxt': nuxtVersion,
      'nuxt-email-renderer': `file:./${filename}`,
      'vue': '^3.5.34',
    },
  }, null, 2))
  await run(npm, ['install', '--no-audit', '--no-fund'])
}, { timeout: 300_000 })

after(async () => {
  if (fixtureDir) await rm(fixtureDir, { recursive: true, force: true })
})

for (const mode of ['development', 'production', 'prerender']) {
  test(`${nuxtVersion}: ${mode}`, { timeout: 300_000 }, async (t) => {
    const port = await freePort()
    const url = `http://127.0.0.1:${port}`
    const cli = join(fixtureDir, 'node_modules/nuxt/bin/nuxt.mjs')
    const env = {
      ...process.env,
      EMAIL_TEST_PRERENDER: String(mode === 'prerender'),
      NITRO_PORT: String(port),
      NITRO_HOST: '127.0.0.1',
    }

    if (mode !== 'development') {
      // Remove generated output so the preceding mode cannot mask a failure.
      await rm(join(fixtureDir, '.nuxt'), { recursive: true, force: true })
      await rm(join(fixtureDir, '.output'), { recursive: true, force: true })
      await run(process.execPath, [cli, 'build'], { env })
    }

    if (mode === 'prerender') {
      const html = await readFile(join(fixtureDir, '.output/public/index.html'), 'utf8')
      assert.ok(html.includes('Email build pipeline'), 'Missing prerendered page')
      assert.match(html, /Welcome to Acme &amp; Co/, 'Prerendering must call the email endpoint successfully')
    }

    const server = start(process.execPath, mode === 'development'
      ? [cli, 'dev', '--host', '127.0.0.1', '--port', String(port)]
      : [join(fixtureDir, '.output/server/index.mjs')], { env })
    try {
      await waitForServer(url, server)
      const page = await fetch(url, { signal: AbortSignal.timeout(30_000) })
      assert.equal(page.status, 200, server.output())
      const pageHtml = await page.text()
      assert.match(pageHtml, /Application whitespace<\/p>/, 'Application components must keep their default whitespace handling')
      assert.match(pageHtml, /Imported email: Welcome/, 'Application code must be able to import email templates')
      if (mode !== 'development') {
        const assetsDir = join(fixtureDir, '.output/public/_nuxt')
        const css = await Promise.all((await readdir(assetsDir))
          .filter(file => file.endsWith('.css'))
          .map(file => readFile(join(assetsDir, file), 'utf8')))
        const styles = [pageHtml, ...css].join('\n')
        assert.match(styles, /\.email-import-probe\[data-v-\w+\]/, 'Missing scoped application style')
        assert.doesNotMatch(styles, /\.email-import-probe(?:\[data-v-\w+\]){2}/, 'Application styles must be scoped once')
      }
      const response = await fetch(`${url}/api/email`, {
        headers: { accept: 'application/json' },
        signal: AbortSignal.timeout(30_000),
      })
      const body = await response.text()
      assert.equal(response.status, 200, `${body}\n${server.output()}`)
      const email = JSON.parse(body)

      await t.test('renders HTML and captures the decoded subject', () => {
        assert.equal(email.subject, 'Welcome to Acme & Co')
        assert.match(email.html, /^<!DOCTYPE html/)
        assert.match(email.html, /alt="Pipeline logo"/)
      })
      await t.test('preserves literal and inter-element whitespace', () => {
        assert.match(email.html, /Hello {3}pipeline<\/p>/)
        assert.match(email.html, /First<\/a> <a[^>]*>Second<\/a>/)
      })
      await t.test('embeds the SVG as a base64 data URL', async () => {
        const svg = await readFile(join(fixtureDir, 'app/emails/assets/logo.svg'))
        assert.ok(email.html.includes(`data:image/svg+xml;base64,${svg.toString('base64')}`))
      })
      await t.test('embeds inline CSS in the email style element', () => {
        assert.match(email.html, /<style data-id="__nuxt-email-style">[^<]*--email-pipeline-color:\s*#123456;/)
      })
    }
    finally {
      await stop(server)
    }
  })
}
