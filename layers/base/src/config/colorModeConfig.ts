import type { ModuleOptions } from '@nuxtjs/color-mode'

/**
 * @see https://color-mode.nuxtjs.org/
 */
export const colorMode: ModuleOptions = {
  preference: 'system', // default value of $colorMode.preference
  fallback: 'light', // fallback value if not system preference found
  hid: 'nuxt-color-mode-script',
  globalName: '__NUXT_COLOR_MODE__',
  componentName: 'ColorScheme',
  classPrefix: '',
  classSuffix: '',
  storage: 'localStorage', // or 'sessionStorage' or 'cookie'
  storageKey: 'nuxt-color-mode',
  dataValue: 'light',
}
