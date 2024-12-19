import { getAppConfig } from './src/config/appConfig'
import { getRuntimeConfig } from './src/config/runtimeConfig'
import { i18n } from './src/config/i18nConfig'
import { colorMode } from './src/config/colorModeConfig'

const appConfig = getAppConfig()
const runtimeConfig = getRuntimeConfig()

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/i18n',
    '@nuxtjs/color-mode',
  ],
  devtools: { enabled: true },
  css: [
    '@/public/css/material-theme/dark-hc.css',
    '@/public/css/material-theme/dark-mc.css',
    '@/public/css/material-theme/light.css',
    '@/public/css/material-theme/light-hc.css',
    '@/public/css/material-theme/light-mc.css',
    '@/public/css/material-theme/light.css',
    '@/assets/styles/style.scss',
  ],
  colorMode,
  appConfig,
  runtimeConfig,
  srcDir: 'src/',
  compatibilityDate: '2024-11-30',
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler', // sass-embeddedでエラーが出るので対応
        },
      },
    },
  },
  typescript: {
    typeCheck: true,
  },
  eslint: {
    config: {
      stylistic: {
        indent: 2,
        quotes: 'single',
      },
    },
  },
  i18n,
})
