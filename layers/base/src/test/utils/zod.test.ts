import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { z } from 'zod'
import { ensureValueOf, requireValueOf } from '../../utils/zod'

describe('zod utils', () => {
  const originalEnv = process.env.NUXT_ENV
  const mockConsoleError = vi.spyOn(console, 'error')

  beforeEach(() => {
    mockConsoleError.mockReset()
    vi.unstubAllEnvs()
  })

  afterEach(() => {
    process.env.NUXT_ENV = originalEnv
  })

  describe('ensureValueOf', () => {
    beforeEach(() => {
      vi.unstubAllEnvs()
      mockConsoleError.mockReset()
      process.env.NUXT_ENV = 'development' // デフォルトの環境を開発環境に設定
    })

    const schema = z.object({
      name: z.string(),
      age: z.number(),
    })

    it('有効な値を受け入れるべき', () => {
      const validData = {
        name: 'テスト',
        age: 20,
      }

      expect(() => ensureValueOf(schema, validData)).not.toThrow()
    })

    it('開発環境で無効な値の場合エラーをログ出力するべき', () => {
      process.env.NUXT_ENV = 'development'
      const invalidData = {
        name: 'テスト',
        age: '20', // 数値である必要がある
      }

      expect(() => ensureValueOf(schema, invalidData)).toThrow()
      expect(mockConsoleError).toHaveBeenCalled()
    })

    it('本番環境で無効な値の場合エラーをログ出力しないべき', () => {
      process.env.NUXT_ENV = 'production'
      const invalidData = {
        name: 'テスト',
        age: '20', // 数値である必要がある
      }

      expect(() => ensureValueOf(schema, invalidData)).toThrow()
      expect(mockConsoleError).not.toHaveBeenCalled()
    })

    it('必須フィールドが欠けている場合エラーを投げるべき', () => {
      const incompleteData = {
        name: 'テスト',
        // age が欠けている
      }

      expect(() => ensureValueOf(schema, incompleteData)).toThrow()
    })
  })

  describe('requireValueOf', () => {
    const schema = z.object({
      name: z.string(),
      age: z.number(),
    })

    it('有効な値を返すべき', () => {
      const validData = {
        name: 'テスト',
        age: 20,
      }

      const result = requireValueOf(schema, validData)
      expect(result).toEqual(validData)
    })

    it('無効な値の場合エラーを投げるべき', () => {
      const invalidData = {
        name: 'テスト',
        age: '20', // 数値である必要がある
      }

      expect(() => requireValueOf(schema, invalidData)).toThrow()
    })

    it('返り値の型が正しいべき', () => {
      const validData = {
        name: 'テスト',
        age: 20,
      }

      const result = requireValueOf(schema, validData)
      expect(typeof result.name).toBe('string')
      expect(typeof result.age).toBe('number')
    })
  })
})
