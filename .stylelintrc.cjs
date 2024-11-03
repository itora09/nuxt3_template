module.exports = {
  // lint機能を追加
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
  },
  overrides: [
    {
      files: ['**/*.vue'],
      customSyntax: 'postcss-html',
    },
  ],
}
