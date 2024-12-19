// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import { rules as customRules } from './linter/eslint/index.mjs'

/**
 * @description eslintの基本方針は以下の通りで調整している
 * - 基本的にはプラグインの設定に順守する
 * - prettierと競合する設定はoffにする
 * - コーディング規約に関する設定でeslintで対応できる場合カスタムルールで設定している
 */
export default withNuxt(
  // Your custom configs here
  {
    plugins: {
      'custom-rules': {
        rules: customRules, // カスタムルールの追加
      },
    },
    rules: {
      'vue/max-attributes-per-line': 'off', // 1行につき属性を1つだけ許容する(prettierと競合するため)
      'vue/html-self-closing': 'off', // 自己終了タグを強制する(prettierと競合するため)
      'vue/singleline-html-element-content-newline': 'off', // タグの中身を1行にする(prettierと競合するため)
      '@stylistic/operator-linebreak': 'off', // 演算子の改行を許容する(prettierと競合するため)
      '@stylistic/brace-style': 'off', // ブレースのスタイルを許容する(prettierと競合するため)
      '@stylistic/arrow-parens': 'off', // アロー関数の括弧省略を許容する（使えないと不便。。。）
      'custom-rules/no-use-state': 'error', // useStateの使用を禁止
      'vue/multi-word-component-names': 'off', // コンポーネント名に複数の単語を許容する
    },
  },
  {
    files: ['**/components/**/*.vue'],
    rules: {
      'custom-rules/require-component-header-comment': 'error', // ファイルの先頭にコメントブロックが必要
    },
  },
  {
    files: ['**/composables/**/*.ts'],
    rules: {
      'custom-rules/no-use-state': 'off', // composable内でのuseStateの使用を許容
      'custom-rules/use-state-with-note-comment': 'error', // useStateを使う場合、// Note: コメントを必須とする
    },
  },
)
