/**
 * @see https://i18n.nuxtjs.org/docs/getting-started
 */

import type { NuxtConfig } from '@nuxt/schema'

export const i18n: NuxtConfig['i18n'] = {
  langDir: '../src/locales/',
  strategy: 'prefix_and_default',
  defaultLocale: 'ja',
  locales: [
    { code: 'ja', iso: 'ja-JP', name: '日本語', file: 'ja.yaml' },
    { code: 'en', iso: 'en-US', name: 'English', file: 'en.yaml' },
  ],
  vueI18n: './src/config/i18nConfig.ts', // NOTE: ファイルを増やしたくないのでこのファイルでまとめて定義している
  detectBrowserLanguage: {
    // NOTE: ユーザーがブラウザに来た時の言語に合わせて切り替える
    useCookie: true,
    cookieKey: 'i18n_redirected',
    redirectOn: 'root', // recommended
    alwaysRedirect: true,
    cookieCrossOrigin: true,
    fallbackLocale: 'ja',
  },
  compilation: {
    strictMessage: false,
  },
} as const

export default {
  legacy: false,
  locale: 'ja',
}
