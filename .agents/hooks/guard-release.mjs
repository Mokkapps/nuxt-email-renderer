#!/usr/bin/env node
// PreToolUse hook for shell commands (Claude Code and Codex share the payload shape).
// Blocks commands that publish to npm or push a release; those stay with a human.

const BLOCKED = [
  /\b(?:pnpm|npm|yarn)\s+(?:run\s+)?release\b/,
  /\b(?:pnpm|npm|yarn)\s+publish\b/,
  /\bchangelogen\b[^\n]*--release\b/,
]

let input = ''
for await (const chunk of process.stdin) input += chunk

let command = ''
try {
  command = JSON.parse(input).tool_input?.command ?? ''
}
catch {
  process.exit(0)
}

if (BLOCKED.some(pattern => pattern.test(command))) {
  process.stderr.write(
    'Blocked: releasing and publishing are done by the maintainer, not by agents. '
    + 'Run lint, test and build instead, and tell the user the change is ready to release.\n',
  )
  process.exit(2)
}
