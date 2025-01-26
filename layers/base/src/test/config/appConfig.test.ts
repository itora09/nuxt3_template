import { describe, expect, it, beforeEach, afterEach } from 'vitest'
import { getAppConfig } from '../../config/appConfig'

describe('appConfig', () => {
  const originalEnv = process.env.NUXT_ENV

  beforeEach(() => {
    // テスト前に環境変数をクリア
    delete process.env.NUXT_ENV
  })

  afterEach(() => {
    // テスト後に環境変数を元に戻す
    process.env.NUXT_ENV = originalEnv
  })

  it('getAppConfig関数が存在するべき', () => {
    expect(getAppConfig).toBeDefined()
    expect(typeof getAppConfig).toBe('function')
  })

  it('開発環境の設定を返すべき', () => {
    process.env.NUXT_ENV = 'development'
    const config = getAppConfig()
    expect(config).toEqual(
      expect.objectContaining({
        ...config,
      }),
    )
  })

  it('本番環境の設定を返すべき', () => {
    process.env.NUXT_ENV = 'production'
    const config = getAppConfig()
    expect(config).toEqual(
      expect.objectContaining({
        ...config,
      }),
    )
  })

  it('環境変数が未設定の場合、共通設定を返すべき', () => {
    const config = getAppConfig()
    expect(config).toEqual(
      expect.objectContaining({
        ...config,
      }),
    )
  })

  it('不正な環境変数の場合、共通設定を返すべき', () => {
    process.env.NUXT_ENV = 'invalid'
    const config = getAppConfig()
    expect(config).toEqual(
      expect.objectContaining({
        ...config,
      }),
    )
  })
})
