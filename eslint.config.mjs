// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import { rules as customRules } from './eslint/rules/index.mjs'

export default withNuxt(
  // Your custom configs here
  {
    rules: {
      'vue/max-attributes-per-line': 'off', // 1行につき属性を1つだけ許容する(prettierと競合するため)
      'vue/html-self-closing': 'off', // 自己終了タグを強制する(prettierと競合するため)
      'vue/singleline-html-element-content-newline': 'off', // タグの中身を1行にする(prettierと競合するため)
    },
  },
  {
    files: ['src/components/**/*.vue'],
    plugins: {
      'custom-rules': {
        rules: customRules,
      },
    },
    rules: {
      'custom-rules/require-header-comment': 'error', // ファイルの先頭にコメントブロックが必要
    },
  },
)
