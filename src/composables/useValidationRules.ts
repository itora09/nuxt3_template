import type { ZodSchema } from 'zod'
import { z } from 'zod'

export const useValidationRules = () => {
  /** createRules関数の型定義を動的にするためいろいろと定義している */
  type Rules = typeof rules
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type SecondArgument<T> = T extends (arg1: any, arg2: infer U) => any
    ? U
    : never
  type RuleSecondArguments = {
    [K in keyof Rules]: SecondArgument<Rules[K]>
  }
  type RuleListItem = {
    [K in keyof Rules]: {
      key: K
      option?: RuleSecondArguments[K]
    }
  }[keyof Rules]

  const i18n = useNuxtApp().$i18n

  /**
   * バリデーションルールの定義
   */
  const rules = {
    /**
     * 必須
     */
    required: (name: string) => {
      return z.coerce.string().min(1, {
        message: i18n.t('validation.required', { name }),
      })
    },
    /**
     * stringのlengthが引数に指定された値以上。
     */
    maxLength: (name: string, option: { maximum: number }) => {
      return z.coerce.string().max(option.maximum, {
        message: i18n.t('validation.max', { length: option.maximum, name }),
      })
    },
  }

  /**
   * 指定したnameを用いてメッセージを設定しつつ、ruleListをandで連結したZodSchemaを返す。
   * @param name エラーメッセージに含めるフィールド名
   * @param ruleList rulesのkeyに対して引数のoptionを指定する
   * @example
   *  createRules('hoge', [
   *    { key: 'maxLength', option: { maximum: 10 } },
   *  ])
   *
   * @returns ruleListをandで連結したZodSchema
   */
  const createRules = (name: string = '', ruleList: RuleListItem[]) => {
    if (!ruleList || ruleList.length === 0)
      throw new Error('rules is required.')
    const schema = ruleList.reduce<ZodSchema | null>((result, rule) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const option = rule.option as any
      if (result === null) return rules[rule.key](name, option)
      return result.and(rules[rule.key](name, option))
    }, null)
    if (!schema) throw new Error('schema is required.')
    return schema
  }

  return {
    createRules,
  }
}
