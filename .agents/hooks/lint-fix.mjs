#!/usr/bin/env node
// PostToolUse hook for file edits. Runs `eslint --fix` on the edited files and
// reports what it could not fix. Handles Claude Code (`tool_input.file_path`)
// and Codex (`apply_patch` text in `tool_input.command`).

import { execFileSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { join, resolve } from 'node:path'

const LINTABLE = /\.(?:[cm]?[jt]s|vue)$/

let input = ''
for await (const chunk of process.stdin) input += chunk

let payload
try {
  payload = JSON.parse(input)
}
catch {
  process.exit(0)
}

const root = execFileSync('git', ['rev-parse', '--show-toplevel'], { cwd: payload.cwd, encoding: 'utf8' }).trim()
const toolInput = payload.tool_input ?? {}

const files = toolInput.file_path
  ? [toolInput.file_path]
  : [...String(toolInput.command ?? '').matchAll(/^\*\*\* (?:Add|Update) File: (.+)$/gm)].map(match => match[1].trim())

const targets = files
  .map(file => resolve(payload.cwd ?? root, file))
  .filter(file => LINTABLE.test(file) && existsSync(file))

const eslint = join(root, 'node_modules', '.bin', 'eslint')
if (targets.length === 0 || !existsSync(eslint)) process.exit(0)

try {
  execFileSync(eslint, ['--fix', '--no-warn-ignored', ...targets], { cwd: root, encoding: 'utf8', stdio: 'pipe' })
}
catch (error) {
  process.stderr.write(`eslint --fix left problems to fix by hand:\n${error.stdout || error.stderr}`)
  process.exit(2)
}
