import { describe, expect, it, beforeEach, afterEach } from 'vitest'
import { getRuntimeConfig } from '../../config/runtimeConfig'

describe('runtimeConfig', () => {
  const originalEnv = process.env.NUXT_ENV

  beforeEach(() => {
    // テスト前に環境変数をクリア
    delete process.env.NUXT_ENV
  })

  afterEach(() => {
    // テスト後に環境変数を元に戻す
    process.env.NUXT_ENV = originalEnv
  })

  it('getRuntimeConfig関数が存在するべき', () => {
    expect(getRuntimeConfig).toBeDefined()
    expect(typeof getRuntimeConfig).toBe('function')
  })

  it('開発環境の設定を返すべき', () => {
    process.env.NUXT_ENV = 'development'
    const config = getRuntimeConfig()
    expect(config).toEqual({
      public: {
        baseUrl: 'http://localhost:3000',
      },
    })
  })

  it('本番環境の設定を返すべき', () => {
    process.env.NUXT_ENV = 'production'
    const config = getRuntimeConfig()
    expect(config).toEqual({
      public: {
        baseUrl: 'http://localhost:3000',
      },
    })
  })

  it('環境変数が未設定の場合、共通設定を返すべき', () => {
    const config = getRuntimeConfig()
    expect(config).toEqual({
      public: {
        baseUrl: 'http://localhost:3000',
      },
    })
  })

  it('不正な環境変数の場合、共通設定を返すべき', () => {
    process.env.NUXT_ENV = 'invalid'
    const config = getRuntimeConfig()
    expect(config).toEqual({
      public: {},
    })
  })

  describe('public設定', () => {
    it('開発環境ではbaseUrlがlocalhostを指すべき', () => {
      process.env.NUXT_ENV = 'development'
      const config = getRuntimeConfig()
      expect((config.public as { baseUrl: string }).baseUrl).toBe(
        'http://localhost:3000',
      )
    })

    it('本番環境ではbaseUrlがlocalhostを指すべき', () => {
      process.env.NUXT_ENV = 'production'
      const config = getRuntimeConfig()
      expect((config.public as { baseUrl: string }).baseUrl).toBe(
        'http://localhost:3000',
      )
    })

    it('環境変数未設定の場合もbaseUrlがlocalhostを指すべき', () => {
      const config = getRuntimeConfig()
      expect((config.public as { baseUrl: string }).baseUrl).toBe(
        'http://localhost:3000',
      )
    })
  })
})
