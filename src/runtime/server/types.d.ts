import type { AllowedComponentProps, Component, VNodeProps } from 'vue'
import type { HtmlToTextOptions } from 'html-to-text'

type ExtractComponentProps<TComponent> = TComponent extends new () => {
  $props: infer P
}
  ? Omit<P, keyof VNodeProps | keyof AllowedComponentProps>
  : never

type Options = {
  pretty?: boolean
} & (
  | {
    plainText?: false
  }
  | {
    plainText?: true
    /**
     * These are options you can pass down directly to the library we use for
     * converting the rendered email's HTML into plain text.
     *
     * @see https://github.com/html-to-text/node-html-to-text
     */
    htmlToTextOptions?: HtmlToTextOptions
  }
)

declare module '#nuxt-email-renderer' {
  export function renderEmailComponent<T extends Component>(
    componentName: string,
    props?: ExtractComponentProps<T>,
    options?: Options
  ): Promise<string>
}
