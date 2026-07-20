import { defineNitroPlugin } from 'nitropack/runtime'

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('nuxt-email-renderer:devtools:resolveProps', (context) => {
    if (context.templateName !== 'Test') {
      return
    }

    const verificationCode = String(context.props.verificationCode || '000000')

    context.props = {
      ...context.props,
      heading: `Verify your account: ${verificationCode}`,
      siteName: String(context.props.siteName || 'AWS'),
    }
  })
})
