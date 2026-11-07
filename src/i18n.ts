import { existsSync, readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { logger } from '@nuxt/kit'
import type { Nuxt } from '@nuxt/schema'
import { defu } from 'defu'
import { createJiti } from 'jiti'
import { parse as parseYaml } from 'yaml'

const LOGGER_PREFIX = 'Nuxt Email Renderer:'

type LocaleMessages = Record<string, Record<string, unknown>>

export interface EmailI18nConfig {
  defaultLocale: string
  messages: LocaleMessages
}

/**
 * The @nuxtjs/i18n options this module reads. It does not depend on that
 * module's types, so every value is checked before use.
 */
interface I18nOptions {
  defaultLocale?: unknown
  locale?: unknown
  vueI18n?: unknown
  restructureDir?: unknown
  langDir?: unknown
  locales?: unknown
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function stringOption(value: unknown): string | undefined {
  return typeof value === 'string' && value ? value : undefined
}

/** Locale file entries are paths or, since @nuxtjs/i18n v10, `{ path, cache }` objects. */
function localeFilePaths(locale: Record<string, unknown>): string[] {
  const entries = locale.file ? [locale.file] : Array.isArray(locale.files) ? locale.files : []
  return entries
    .map(entry => isRecord(entry) ? entry.path : entry)
    .filter((path): path is string => typeof path === 'string')
}

/** Parse a locale message file. Supports JSON and YAML (.yaml / .yml). */
function parseLocaleFile(filePath: string): Record<string, unknown> {
  const raw = readFileSync(filePath, 'utf-8')
  if (/\.ya?ml$/i.test(filePath)) {
    return parseYaml(raw) as Record<string, unknown>
  }
  return JSON.parse(raw)
}

/**
 * Load a vue-i18n config file such as `i18n/i18n.config.ts`. jiti handles
 * TypeScript on every supported Node version; `defineI18nConfig` is a global
 * macro provided by @nuxtjs/i18n, so stub it while the file is evaluated.
 */
async function loadVueI18nConfig(configPath: string): Promise<{ messages?: LocaleMessages } | undefined> {
  const globals = globalThis as { defineI18nConfig?: unknown }
  const previous = globals.defineI18nConfig
  globals.defineI18nConfig ??= (config: unknown) => config
  try {
    const jiti = createJiti(import.meta.url, { moduleCache: false })
    const config = await jiti.import<unknown>(configPath, { default: true })
    return typeof config === 'function' ? await config() : config as { messages?: LocaleMessages }
  }
  finally {
    globals.defineI18nConfig = previous
  }
}

/**
 * Read the messages that @nuxtjs/i18n is configured with, so email templates
 * can be translated on the server.
 */
export async function loadI18nConfig(nuxt: Nuxt): Promise<EmailI18nConfig | undefined> {
  const i18nOptions = (nuxt.options as { i18n?: unknown }).i18n
  if (!isRecord(i18nOptions)) return

  const { defaultLocale, locale, vueI18n, restructureDir, langDir, locales }: I18nOptions = i18nOptions
  // `restructureDir: false` keeps the pre-v10 layout relative to the layer root.
  const localesRoot = restructureDir === false ? '' : stringOption(restructureDir) ?? 'i18n'
  let messages: LocaleMessages = {}

  const vueI18nPath = stringOption(vueI18n)
  if (vueI18nPath) {
    // @nuxtjs/i18n v10 resolves the path inside each layer's restructureDir.
    // Older setups put it next to nuxt.config.
    const candidatePaths = new Set(nuxt.options._layers.flatMap(layer => [
      resolve(layer.cwd, localesRoot, vueI18nPath),
      resolve(layer.cwd, vueI18nPath),
    ]))

    for (const configPath of candidatePaths) {
      if (!existsSync(configPath)) continue
      try {
        const config = await loadVueI18nConfig(configPath)
        if (config?.messages) {
          messages = config.messages
          logger.success(`${LOGGER_PREFIX} Loaded i18n messages for ${Object.keys(messages).length} locale(s)`)
        }
        break
      }
      catch (error) {
        logger.warn(`${LOGGER_PREFIX} Could not load i18n messages from config file: ${error}`)
      }
    }
  }
  else if (isRecord(vueI18n) && isRecord(vueI18n.messages)) {
    messages = vueI18n.messages as LocaleMessages
  }

  // Without a vueI18n config, read the locale files: <layer>/<restructureDir>/<langDir>/<file>.
  if (Object.keys(messages).length === 0 && Array.isArray(locales) && locales.length) {
    const localesDir = stringOption(langDir) ?? 'locales'

    for (const layer of nuxt.options._layers) {
      for (const localeOption of locales) {
        if (!isRecord(localeOption)) continue
        const code = stringOption(localeOption.code)
        if (!code) continue

        for (const file of localeFilePaths(localeOption)) {
          const filePath = join(layer.cwd, localesRoot, localesDir, file)
          if (!existsSync(filePath)) continue
          try {
            // defu keeps keys from higher-priority layers (_layers[0] is the root).
            messages[code] = defu(messages[code] || {}, parseLocaleFile(filePath))
          }
          catch (error) {
            logger.warn(`${LOGGER_PREFIX} Failed to parse i18n locale file "${filePath}": ${(error as Error).message}`)
          }
        }
      }
    }

    if (Object.keys(messages).length > 0) {
      logger.success(`${LOGGER_PREFIX} Loaded i18n messages for ${Object.keys(messages).length} locale(s) from locale files`)
    }
  }

  const resolvedDefaultLocale = stringOption(defaultLocale) ?? stringOption(locale) ?? 'en'
  logger.info(`${LOGGER_PREFIX} i18n support enabled with default locale: ${resolvedDefaultLocale}`)
  return { defaultLocale: resolvedDefaultLocale, messages }
}
