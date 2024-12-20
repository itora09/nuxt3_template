import { getAppConfig } from './src/config/appConfig'
import { getRuntimeConfig } from './src/config/runtimeConfig'

const appConfig = getAppConfig()
const runtimeConfig = getRuntimeConfig()

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ['../base'],
  appConfig,
  runtimeConfig,
  srcDir: 'src/',
  i18n: {
    langDir: '../src/locales/',
    locales: [
      { code: 'ja', iso: 'ja-JP', name: '日本語', file: 'ja.yaml' },
      { code: 'en', iso: 'en-US', name: 'English', file: 'en.yaml' },
    ],
  },
})
