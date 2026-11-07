# Email build pipeline regression tests

These tests cover issue #63 using the packed module in an isolated consumer app.
They run a development server, build and serve a production server, then build
with `/` prerendered and serve that output. The page calls the email endpoint
during prerendering. Every mode checks subject capture, HTML, literal and
inter-element whitespace, base64 SVG assets, and inline CSS.
They also check that application components retain Nuxt's default whitespace handling,
can import email templates, and have their scoped styles scoped exactly once.

It also type checks the consumer app with `vue-tsc` and compares the rendered email
HTML and plain text with the files in `golden/`.

Build the package first, then run the test against the latest supported Nuxt version:

```sh
pnpm build
pnpm test:compatibility
```

Select another Nuxt version or a subset of modes with environment variables:

```sh
EMAIL_TEST_NUXT=4.1.0 EMAIL_TEST_MODES=development,production pnpm test:compatibility
```

When a change to the email output is intended, regenerate the golden files and
review their diff:

```sh
UPDATE_GOLDEN=true pnpm test:compatibility
```

The runner needs registry access to install the selected Nuxt version and packed
module into a temporary directory. It removes the directory and terminates server
workers on completion. It does not modify the repository's dependencies or lockfile.

CI runs the lowest supported version (4.1.0) and the latest version on Linux, and
the latest version on Windows.
