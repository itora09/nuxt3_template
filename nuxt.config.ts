import * as path from 'path'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ['./layers/base', './layers/main'], // 明示的に指定することで、後に定義したlayersを優先する
  srcDir: 'src/',
  alias: {
    base: path.resolve(__dirname, 'layers/base/src/'),
    main: path.resolve(__dirname, 'layers/main/src/'),
  },
})
