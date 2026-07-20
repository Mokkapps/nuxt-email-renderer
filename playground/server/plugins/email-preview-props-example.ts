import { defineNitroPlugin } from 'nitropack/runtime'

interface DevtoolsPreviewPropsContext {
  templateName: string
  props: Record<string, unknown>
}

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook(
    'nuxt-email-renderer:devtools:resolveProps',
    (context: DevtoolsPreviewPropsContext) => {

      console.info('Resolving props for template:', context.templateName, context.props)

      if (context.templateName !== 'AwsVerifyEmail') {
        return
      }

      context.props = {
        ...context.props,
        verificationCode: String(
          context.props.verificationCode || Math.floor(100000 + Math.random() * 900000),
        ),
      }
    },
  )
})
