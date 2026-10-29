# AGENTS.md

Nuxt module that renders HTML emails from Vue components. The module lives in `src/`; `client/` is its DevTools UI, `playground/` a manual-test app with example emails, `docs/` the Docus site behind nuxtemail.com.

## Setup

Run `pnpm dev:prepare` after installing and after switching branches. It stubs the module and generates `.nuxt/` and `client/.nuxt/`; without them lint, tests and the playground fail (`failed to resolve "extends":"./client/.nuxt/tsconfig.json"`). Tests also need a browser once: `pnpm playwright-core install`.

## Verifying a change

- `pnpm lint` and `pnpm test` gate every change. Snapshot updates (`vitest -u`) are a claim that the rendered email changed on purpose: name the snapshot and the reason in your summary.
- Changes to build plumbing (`src/module.ts`, `src/build/`, Vite/Nitro plugins) also need `pnpm build && pnpm test:compatibility`, which tests the packed `dist/` in a fresh consumer app (see `compatibility/README.md`).
- To see what an email actually renders, use the `verify-email-render` skill in `.agents/skills/`.
- CI runs on Windows too: build paths with `node:path`, never by joining strings with `/`.

## Documentation

Review `docs/content/` and README examples for every change. Update affected pages in the same branch when changing user-visible behavior, module options, APIs, email components, or examples. If no docs edit is needed, explain why in the PR summary. Run `pnpm docs:build` after editing docs.

## Email components

A component touches four places: `src/runtime/components/<name>/` (component, test, snapshots), the `emailComponents` map in `src/runtime/components/index.ts`, the type entries in `src/runtime/components/components.d.ts` (hand-maintained despite its "Auto-generated" header), and `docs/content/2.components/<name>.md`.

## Dependencies

Exact pins, `resolutions` in `package.json`, and `patches/` are deliberate. Ask before changing them; bumping a patched package means regenerating its patch.

## Releasing

Releasing is the maintainer's job. Your work ends with lint, test and build green; agent hooks block `pnpm release` and publishing.
