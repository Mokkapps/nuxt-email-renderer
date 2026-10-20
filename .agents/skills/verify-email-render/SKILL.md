---
name: verify-email-render
description: Render an email template through the playground's dev server and inspect the HTML or plain text. Use after changing an email component, the renderer, or a playground email, or when asked to run or preview the app.
---

# Verify email render

1. Start the playground in the background: `pnpm play:dev`. It is ready when `GET http://localhost:3000/api/emails` returns JSON; the first start takes about a minute. A `TSConfckParseError` means `pnpm dev:prepare` was skipped.
2. Pick a template: the `name` fields from `/api/emails` are the emails in `playground/emails/`. To exercise a component, use a template that contains it, or add a scratch email to `playground/emails/` and delete it when done.
3. Render it:

   ```sh
   curl -s -X POST localhost:3000/api/emails/render \
     -H 'content-type: application/json' \
     -d '{"name":"StripeWelcome","pretty":true}'
   ```

   Add `"plainText": true` for the text version, `"props": {...}` to pass props, `"locale": "de"` for i18n. `/api/emails/source` returns the template's SFC source.
4. Check the output for the change you made: the expected markup and inline styles in the HTML, readable text in the plain-text version. For visual checks, save the HTML to a file in your scratch space and open it in a browser if you have one. The DevTools UI is at `http://localhost:3000/__nuxt_devtools__/client/modules/custom-nuxt-email-renderer`.
5. Stop the dev server. It also starts the DevTools client on port 3300, which stops with it.

Done when the rendered output shows the change, and you've reported the template you rendered and what you saw.
