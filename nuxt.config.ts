import { getAppConfig } from './src/config/appConfig'
import { getRuntimeConfig } from './src/config/runtimeConfig'
import { i18n } from './src/config/i18nConfig'

const appConfig = getAppConfig()
const runtimeConfig = getRuntimeConfig()

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  appConfig,
  runtimeConfig,
  modules: ['@nuxt/eslint', '@nuxtjs/stylelint-module', '@nuxtjs/i18n'],
  srcDir: 'src/',
  eslint: {
    config: {
      stylistic: {
        indent: 2,
        quotes: 'single',
      },
    },
  },
  typescript: {
    typeCheck: true,
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler', // sass-embeddedでエラーが出るので対応
        },
      },
    },
  },
  i18n,
})
