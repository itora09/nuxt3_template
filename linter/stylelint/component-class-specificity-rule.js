import path from 'path'
import stylelint from 'stylelint'
import * as specificity from 'specificity' // specificity パッケージを使用

const {
  createPlugin,
  utils: { ruleMessages },
} = stylelint

// 関数: ファイルパスから期待するクラス名を生成
function generateExpectedClassName(filePath) {
  const projectRoot = process.cwd() // 現在の作業ディレクトリを取得
  const relativePath = path.relative(projectRoot, filePath)

  // 相対パスをディレクトリ名で分割し、最後の要素（ファイル名）を含むようにクラス名を生成
  const parts = relativePath.split(path.sep)
  const fileName = path.basename(parts.pop(), path.extname(filePath))
  parts.push(fileName)

  // すべてのパス部分をハイフンで連結し、無効な文字を削除
  return `.${parts.join('-').replace(/.*components-/g, '')}`
}

const ruleName = 'custom/component-class-specificity'
const messages = ruleMessages(ruleName, {
  rejected: () =>
    'ルートで指定するセレクタは詳細度を [0, 1, 1] 以上にしてください',
})
const meta = {}

/**
 * @type {import('stylelint').Rule}
 */
const ruleFunction = (primaryOption) => {
  return (root, result) => {
    const validOptions = stylelint.utils.validateOptions(result, ruleName, {
      actual: primaryOption,
    })

    if (!validOptions) {
      return
    }

    // ファイルパスを取得して期待するクラス名を生成
    const filePath = result.opts.from
    const expectedClassName = generateExpectedClassName(filePath).replace(
      /.*components/g,
      '',
    )

    // すべてのルールを走査
    root.walkRules((rule) => {
      // ルートセレクタの場合のみチェック
      if (rule.parent && rule.parent.type !== 'root') {
        return // 入れ子のセレクタはスキップ
      }

      // specificity パッケージを使用して詳細度を計算
      const specificityResults = specificity.calculate(rule.selector)

      // 計算結果が存在し、適切な詳細度データが含まれているかをチェック
      if (!specificityResults) {
        return // 結果が無効な場合はスキップ
      }

      const score =
        specificityResults.A * 100 +
        specificityResults.B * 10 +
        specificityResults.C

      // 詳細度が [0, 1, 0] 以下で、期待されるクラス名ではない場合にエラーを出力
      if (score <= 10 && rule.selector !== expectedClassName) {
        stylelint.utils.report({
          message: messages.rejected,
          node: rule,
          result,
          ruleName,
        })
      }
    })
  }
}

ruleFunction.ruleName = ruleName
ruleFunction.messages = messages
ruleFunction.meta = meta

export default createPlugin(ruleName, ruleFunction)
