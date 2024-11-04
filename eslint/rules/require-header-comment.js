/**
 * @type {import('eslint').Rule.RuleModule}
 */
export default {
  meta: {
    type: 'problem',
    docs: {
      description:
        'ファイルの先頭に @name と @description を含むコメントブロックが必要です。',
      recommended: false,
    },
    schema: [],
    messages: {
      missingComment:
        'ファイルの先頭に @name と @description を含むコメントブロックが必要です。',
      missingName: 'ファイルの先頭のコメントブロックに @name タグが必要です。',
      missingDescription:
        'ファイルの先頭のコメントブロックに @description タグが必要です。',
    },
  },
  create(context) {
    return {
      Program(node) {
        const sourceCode = context.getSourceCode()
        const text = sourceCode.text

        // ファイルの先頭にあるコメントブロックを抽出
        const firstCommentMatch = text.match(/^<!--([\s\S]*?)-->/)

        // 最初のコメントが空、またはタグがない場合にエラーを出力
        if (!firstCommentMatch || !firstCommentMatch[1].trim()) {
          context.report({
            node,
            messageId: 'missingComment',
            loc: {
              start: { line: 1, column: 0 },
              end: { line: 1, column: 0 },
            },
          })
          return
        }

        // コメントブロック内のテキスト
        const commentText = firstCommentMatch[1]

        // @name と @description の存在確認
        const hasName = /@name\s+\S+/.test(commentText)
        const hasDescription = /@description\s+\S+/.test(commentText)

        // @name がない場合にエラーを報告
        if (!hasName) {
          context.report({
            node,
            messageId: 'missingName',
            loc: {
              start: { line: 1, column: 0 },
              end: { line: 1, column: 0 },
            },
          })
        }

        // @description がない場合にエラーを報告
        if (!hasDescription) {
          context.report({
            node,
            messageId: 'missingDescription',
            loc: {
              start: { line: 1, column: 0 },
              end: { line: 1, column: 0 },
            },
          })
        }
      },
    }
  },
}
