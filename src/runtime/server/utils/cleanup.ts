export function cleanup(str: string) {
  if (!str)
    return str

  return str
    .replace(/ data-v-inspector="[^"]*"/g, '')
    .replace(/<!--\[-->/g, '')
    .replace(/<!--\]-->/g, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    // Only remove style tags that don't contain @font-face (preserve EFont styles)
    .replace(/<style>(?![\s\S]*@font-face)[\s\S]*?<\/style>/g, '')
    .replace(/<script>[\s\S]*?<\/script>/g, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/g, '')
    .replace(/<template>/g, '')
    .replace(/<template[^>]*>/g, '')
    .replace(/<\/template>/g, '')
    .replace(/<\/tailwind-clean-component>/g, '')
}
