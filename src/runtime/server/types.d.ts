declare module '#nuxt-email-renderer' {
  export async function renderEmailComponent<T extends Component>(componentName: string, props?: ExtractComponentProps<T>,
    options?: Options): Promise<string>
}
