import { getAppConfig } from './config/appConfig'
import { getRuntimeConfig } from './config/runtimeConfig'

const appConfig = getAppConfig()
const runtimeConfig = getRuntimeConfig()

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  appConfig,
  runtimeConfig,
  modules: ['@nuxt/eslint', '@nuxtjs/stylelint-module'],
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
})
