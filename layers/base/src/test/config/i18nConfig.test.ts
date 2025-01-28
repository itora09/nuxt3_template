import type { NuxtConfig } from '@nuxt/schema'
import { describe, expect, it } from 'vitest'
import i18nConfig, { i18n } from '../../config/i18nConfig'

describe('i18nConfig', () => {
  const config = i18n as Required<NonNullable<NuxtConfig['i18n']>>
  it('i18n設定が存在するべき', () => {
    expect(config).toBeDefined()
  })

  it('基本設定が正しいべき', () => {
    expect(config.langDir).toBe('../src/locales/')
    expect(config.strategy).toBe('prefix_and_default')
    expect(config.defaultLocale).toBe('ja')
    expect(config.vueI18n).toBe('./src/config/i18nConfig.ts')
  })

  it('サポートされる言語が正しく設定されているべき', () => {
    expect(config.locales).toHaveLength(2)

    // 日本語の設定を確認
    const ja = config.locales[0]
    expect(ja).toEqual({
      code: 'ja',
      iso: 'ja-JP',
      name: '日本語',
      file: 'ja.yaml',
    })

    // 英語の設定を確認
    const en = config.locales[1]
    expect(en).toEqual({
      code: 'en',
      iso: 'en-US',
      name: 'English',
      file: 'en.yaml',
    })
  })

  it('ブラウザ言語検出の設定が正しいべき', () => {
    expect(config.detectBrowserLanguage).toEqual({
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      alwaysRedirect: true,
      cookieCrossOrigin: true,
      fallbackLocale: 'ja',
    })
  })

  describe('デフォルト設定', () => {
    it('正しいデフォルト設定を持つべき', () => {
      expect(i18nConfig).toEqual({
        legacy: false,
        locale: 'ja',
      })
    })
  })
})
