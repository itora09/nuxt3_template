import { describe, test, expect } from 'vitest'
import { useValidationRules } from '../../composables/useValidationRules'

describe('useValidationRules', () => {
  describe('createRules', () => {
    test('requiredルールが正しく動作する', () => {
      const { createRules } = useValidationRules()
      const schema = createRules('テストフィールド', [{ key: 'required' }])

      // 空文字列の場合はエラー
      const resultEmpty = schema.safeParse('')
      expect(resultEmpty.success).toBe(false)
      if (!resultEmpty.success) {
        expect(resultEmpty.error.issues[0].message).toBe(
          'テストフィールド is required',
        )
      }

      // 値がある場合は成功
      const resultValid = schema.safeParse('test')
      expect(resultValid.success).toBe(true)
    })

    test('maxLengthルールが正しく動作する', () => {
      const { createRules } = useValidationRules()
      const schema = createRules('テストフィールド', [
        { key: 'maxLength', option: { maximum: 5 } },
      ])

      // 制限を超える文字列の場合はエラー
      const resultTooLong = schema.safeParse('123456')
      expect(resultTooLong.success).toBe(false)
      if (!resultTooLong.success) {
        expect(resultTooLong.error.issues[0].message).toBe(
          'テストフィールド must be at most 5 characters',
        )
      }

      // 制限内の文字列は成功
      const resultValid = schema.safeParse('12345')
      expect(resultValid.success).toBe(true)
    })

    test('複数のルールを組み合わせて使用できる', () => {
      const { createRules } = useValidationRules()
      const schema = createRules('テストフィールド', [
        { key: 'required' },
        { key: 'maxLength', option: { maximum: 5 } },
      ])

      // 空文字列の場合はrequiredエラー
      const resultEmpty = schema.safeParse('')
      expect(resultEmpty.success).toBe(false)
      if (!resultEmpty.success) {
        expect(resultEmpty.error.issues[0].message).toBe(
          'テストフィールド is required',
        )
      }

      // 文字数制限を超える場合はmaxLengthエラー
      const resultTooLong = schema.safeParse('123456')
      expect(resultTooLong.success).toBe(false)
      if (!resultTooLong.success) {
        expect(resultTooLong.error.issues[0].message).toBe(
          'テストフィールド must be at most 5 characters',
        )
      }

      // 全ての条件を満たす場合は成功
      const resultValid = schema.safeParse('12345')
      expect(resultValid.success).toBe(true)
    })

    test('ルールリストが空の場合はエラーをスローする', () => {
      const { createRules } = useValidationRules()
      expect(() => createRules('テストフィールド', [])).toThrow(
        'rules is required.',
      )
    })

    test('nameが省略された場合でも動作する', () => {
      const { createRules } = useValidationRules()
      const schema = createRules(undefined, [{ key: 'required' }])

      const resultEmpty = schema.safeParse('')
      expect(resultEmpty.success).toBe(false)
      if (!resultEmpty.success) {
        expect(resultEmpty.error.issues[0].message).toBe(' is required')
      }
    })
  })
})
