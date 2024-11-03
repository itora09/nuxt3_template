/**
 * @see https://i18n.nuxtjs.org/docs/getting-started
 */

import type { NuxtI18nOptions } from '@nuxtjs/i18n'
import ja from '../locales/ja.json'
import en from '../locales/en.json'

export const i18n: NuxtI18nOptions = {
  strategy: 'prefix_and_default',
  defaultLocale: 'ja',
  locales: [
    { code: 'ja', iso: 'ja-JP', name: '日本語' },
    { code: 'en', iso: 'en-US', name: 'English' },
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
} as const

export default {
  legacy: false,
  locale: 'ja',
  messages: {
    ja,
    en,
  },
}
