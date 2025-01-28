import { describe, expect, it } from 'vitest'
import { colorMode } from '../../config/colorModeConfig'

describe('colorModeConfig', () => {
  it('正しいデフォルト値を持つべき', () => {
    expect(colorMode).toBeDefined()
    expect(colorMode).toEqual({
      preference: 'system',
      fallback: 'light',
      hid: 'nuxt-color-mode-script',
      globalName: '__NUXT_COLOR_MODE__',
      componentName: 'ColorScheme',
      classPrefix: '',
      classSuffix: '',
      storage: 'localStorage',
      storageKey: 'nuxt-color-mode',
      dataValue: 'light',
    })
  })

  it('必要なプロパティがすべて存在するべき', () => {
    const requiredProperties = [
      'preference',
      'fallback',
      'hid',
      'globalName',
      'componentName',
      'classPrefix',
      'classSuffix',
      'storage',
      'storageKey',
      'dataValue',
    ]

    requiredProperties.forEach((prop) => {
      expect(colorMode).toHaveProperty(prop)
    })
  })

  it('ストレージとしてlocalStorageを使用するべき', () => {
    expect(colorMode.storage).toBe('localStorage')
  })

  it('デフォルトの設定としてsystemを使用するべき', () => {
    expect(colorMode.preference).toBe('system')
  })

  it('フォールバックモードとしてlightを使用するべき', () => {
    expect(colorMode.fallback).toBe('light')
  })
})
