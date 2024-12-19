// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ['../base'],
  srcDir: 'src/',
  i18n: {
    langDir: '../src/locales/',
    locales: [
      { code: 'ja', iso: 'ja-JP', name: '日本語', file: 'ja.yaml' },
      { code: 'en', iso: 'en-US', name: 'English', file: 'en.yaml' },
    ],
  },
})
