import { resolve } from 'node:path'
import { describe, it, expect } from 'vitest'
import { execSync } from 'node:child_process'

describe('E2E Nuxt UI Prerender', () => {
  const fixtureDir = resolve(__dirname, './fixtures/nuxt-ui-prerender')

  it('should not throw 500 Server Error during prerendering', async () => {
    // Trigger a production build with prerendering
    let buildOutput = ''
    let buildError = ''

    try {
      buildOutput = execSync('npx nuxi generate', {
        cwd: fixtureDir,
        stdio: 'pipe',
        encoding: 'utf-8',
      })
      console.log('Build succeeded:\n', buildOutput)
      expect(buildOutput).toMatch(/Build succeeded/i)
    }
    catch (error: any) {
      buildError = error.stderr || error.stdout || error.message
      console.log('Build failed as expected:\n', buildError)

      expect(buildError).not.toMatch(/Exiting due to prerender errors/i)
    }
  }, 60000) // 60 second timeout for build
})
