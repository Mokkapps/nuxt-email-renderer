// @nuxtjs/i18n v10 resolves `vueI18n` inside `restructureDir` (`i18n/`) and
// provides `defineI18nConfig` as a global macro.
export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      welcome: 'Welcome',
      greeting: 'Hello, {name}!',
      message: 'This is a test email',
      button: 'Click here',
    },
    de: {
      welcome: 'Willkommen',
      greeting: 'Hallo, {name}!',
      message: 'Dies ist eine Test-E-Mail',
      button: 'Hier klicken',
    },
    es: {
      welcome: 'Bienvenido',
      greeting: '¡Hola, {name}!',
      message: 'Este es un correo electrónico de prueba',
      button: 'Haz clic aquí',
    },
  },
}))
