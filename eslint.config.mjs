// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  // Your custom configs here
  {
    rules: {
      'vue/max-attributes-per-line': 'off', // 1行につき属性を1つだけ許容する(prettierと競合するため)
      'vue/html-self-closing': 'off', // 自己終了タグを強制する(prettierと競合するため)
    },
  },
)
