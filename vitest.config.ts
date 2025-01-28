import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  root: __dirname,
  test: {
    environment: 'nuxt',
    alias: {
      '@': './src',
      '@base': '../layers/base/src',
      '@main': '../layers/main/src',
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['layers/**/src/**/*.{js,ts,vue}'],
      exclude: ['**/node_modules/**', '**/dist/**', '**/test/**', '**/*.d.ts'],
    },
  },
})
