# Email build pipeline regression tests

These tests cover issue #63 using the packed module in an isolated consumer app.
They run a development server, build and serve a production server, then build
with `/` prerendered and serve that output. The page calls the email endpoint
during prerendering. Every mode checks subject capture, HTML, literal and
inter-element whitespace, base64 SVG assets, and inline CSS.
They also check that application components retain Nuxt's default whitespace handling,
can import email templates, and have their scoped styles scoped exactly once.

Build the package first, then run the Nuxt 4 baseline:

```sh
pnpm build
pnpm test:compatibility
```

To run the pinned Nuxt 5 reproduction (POSIX shell):

```sh
EMAIL_TEST_NUXT=npm:nuxt-nightly@5.0.0-2610111729-78f43dd pnpm test:compatibility
```

The runner needs registry access to install the selected Nuxt version and packed
module into a temporary directory. It removes the directory and terminates server
workers on completion. It does not modify the repository's dependencies or lockfile.

CI requires both versions to pass with the same email output as the Nuxt 4 baseline.
