/**
 * @type {import('eslint').Rule.RuleModule}
 * @description useStateの使用を禁止するルール
 */
export const noUseState = {
  meta: {
    type: 'problem',
    docs: {
      description: 'useStateを使う場合、jsdocを必須とするルール',
      recommended: false,
    },
    schema: [], // ルールにオプションがない場合は空の配列
    messages: {
      useStateError:
        'useStateの使用は禁止されています。 composable+provide/inject を使用してください。',
    },
  },
  create(context) {
    return {
      ImportDeclaration(node) {
        // "useState" がインポートされているかをチェック
        if (
          node.specifiers.some(
            (specifier) =>
              specifier.imported && specifier.imported.name === 'useState',
          )
        ) {
          context.report({
            node,
            messageId: 'useStateError',
          })
        }
      },
      CallExpression(node) {
        // "useState" が関数として呼び出されているかをチェック
        if (node.callee.name === 'useState') {
          context.report({
            node,
            messageId: 'useStateError',
          })
        }
      },
    }
  },
}
