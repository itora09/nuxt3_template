/**
 * @type {import('eslint').Rule.RuleModule}
 */
export const useStateWithNoteComment = {
  meta: {
    type: 'problem',
    docs: {
      description: 'useStateを使う場合、Note: コメントを必須とするルール',
      recommended: false,
    },
    schema: [], // ルールにオプションがない場合は空の配列
    messages: {
      missingNote:
        'useStateを使用する場合は NOTE: コメントを記述してください。',
    },
  },
  create: function (context) {
    return {
      CallExpression: function (node) {
        if (node.callee.name === 'useState') {
          // 全てのコメントの中から対象のuseStateの前のコメントを取得
          const commentList = context.sourceCode.getAllComments()
          const nodeLine = node.loc?.start.line ?? 0
          const comment = commentList.find(
            (comment) => (comment.loc?.end.line ?? 0) === nodeLine - 1,
          )

          if (!comment || !comment.value.includes('NOTE:')) {
            context.report({
              node,
              messageId: 'missingNote',
            })
          }
        }
      },
    }
  },
}
