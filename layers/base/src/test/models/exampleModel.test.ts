import { ZodError } from 'zod'
import { describe, it, expect } from 'vitest'
import { exampleSchema } from '../../models/exampleModel'

describe('exampleModel', () => {
  it('スキーマが存在するべき', () => {
    expect(exampleSchema).toBeDefined()
  })

  it('有効なデータを受け入れるべき', () => {
    const validData = {
      hoge: 'テスト',
      fuga: 123,
      piyo: true,
    }

    const result = exampleSchema.safeParse(validData)
    expect(result.success).toBe(true)
  })

  describe('バリデーションエラー', () => {
    it('hogeが文字列でない場合エラーを返すべき', () => {
      const invalidData = {
        hoge: 123, // 数値は不正
        fuga: 456,
        piyo: true,
      }

      const result = exampleSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error).toBeInstanceOf(ZodError)
        expect(result.error.issues[0].path).toContain('hoge')
      }
    })

    it('fugaが数値でない場合エラーを返すべき', () => {
      const invalidData = {
        hoge: 'テスト',
        fuga: '123', // 文字列は不正
        piyo: true,
      }

      const result = exampleSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error).toBeInstanceOf(ZodError)
        expect(result.error.issues[0].path).toContain('fuga')
      }
    })

    it('piyoが真偽値でない場合エラーを返すべき', () => {
      const invalidData = {
        hoge: 'テスト',
        fuga: 123,
        piyo: 'true', // 文字列は不正
      }

      const result = exampleSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error).toBeInstanceOf(ZodError)
        expect(result.error.issues[0].path).toContain('piyo')
      }
    })

    it('必須フィールドが欠けている場合エラーを返すべき', () => {
      const invalidData = {
        hoge: 'テスト',
        fuga: 123,
        // piyo が欠けている
      }

      const result = exampleSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error).toBeInstanceOf(ZodError)
        expect(result.error.issues[0].path).toContain('piyo')
      }
    })
  })

  it('型変換後のデータが正しい形式であるべき', () => {
    const data = {
      hoge: 'テスト',
      fuga: 123,
      piyo: true,
    }

    const parsed = exampleSchema.parse(data)
    expect(parsed).toEqual(data)
    expect(typeof parsed.hoge).toBe('string')
    expect(typeof parsed.fuga).toBe('number')
    expect(typeof parsed.piyo).toBe('boolean')
  })
})
