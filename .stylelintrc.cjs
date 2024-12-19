module.exports = {
  customSyntax: 'postcss-html',
  // lint機能を追加
  plugins: ['./linter/stylelint/component-class-specificity-rule.js'],

  extends: [
    'stylelint-config-recommended',
    'stylelint-config-recommended-scss',
    'stylelint-config-recess-order',
  ],
  rules: {
    'block-no-empty': null, // 空のブロックを許容する
    'no-empty-source': null, // 空のstyleブロックを許容する
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['deep'], // deepセレクタを許容する
      },
    ],
    'no-descending-specificity': null, // スタイルを上から順番に記載しるときに邪魔になるため無効化
  },
  overrides: [
    {
      files: ['**/*.vue'],
      customSyntax: 'postcss-html',
    },
    {
      files: ['**/components/**/*.vue', '**/pages/**/*.vue'],
      rules: {
        'custom/component-class-specificity': true, // コンポーネント名のクラスセレクタ外にクラスセレクタのみでスタイルを記述することを禁止する
      },
    },
  ],
}
