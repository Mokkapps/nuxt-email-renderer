export const CODE_HIGHLIGHTING_DEFINE = '__NUXT_EMAIL_RENDERER_CODE_HIGHLIGHTING__'

type NitroBuildConfigLike = {
  esbuild?: {
    options?: {
      target?: string
      define?: Record<string, string>
    }
  }
  replace?: Record<string, string | ((id: string) => string)>
}

export function applyCodeHighlightingBuildConfig(
  nitroConfig: NitroBuildConfigLike,
  codeHighlighting: boolean,
) {
  nitroConfig.esbuild ||= {}
  nitroConfig.esbuild.options ||= {}
  nitroConfig.esbuild.options.target ||= 'es2020'

  nitroConfig.esbuild.options.define = {
    ...nitroConfig.esbuild.options.define,
    [CODE_HIGHLIGHTING_DEFINE]: JSON.stringify(codeHighlighting),
  }

  nitroConfig.replace = {
    ...nitroConfig.replace,
    [CODE_HIGHLIGHTING_DEFINE]: JSON.stringify(codeHighlighting),
  }
}
