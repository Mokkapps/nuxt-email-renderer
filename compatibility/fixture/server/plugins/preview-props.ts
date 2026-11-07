// Type-checked by the compatibility test: the hook and its context must be typed.
export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('nuxt-email-renderer:devtools:resolveProps', (context) => {
    const templateName: string = context.templateName
    context.props = { ...context.props, templateName }
    // @ts-expect-error The hook context must not be `any`.
    context.doesNotExist = true
  })
})
