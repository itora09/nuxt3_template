import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AtomsBaseImage from '../../../../components/atoms/base/image.vue'

describe('AtomsBaseImage', () => {
  test('デフォルトでimgタグがレンダリングされる', () => {
    const wrapper = mount(AtomsBaseImage)
    expect(wrapper.find('img').exists()).toBe(true)
  })

  test('デフォルトプロパティが正しく設定される', () => {
    const wrapper = mount(AtomsBaseImage)
    const img = wrapper.find('img')
    expect(img.attributes('src')).toBe('images/no-image.png')
    expect(img.attributes('loading')).toBe('lazy')
  })

  test('カスタムプロパティが正しく適用される', () => {
    const props = {
      src: 'test.jpg',
      alt: 'テスト画像',
      title: 'テストタイトル',
      width: '100',
      height: '100',
      loading: 'eager' as const,
      srcset: 'test-1x.jpg 1x, test-2x.jpg 2x',
    }

    const wrapper = mount(AtomsBaseImage, { props })
    const img = wrapper.find('img')

    // 各プロパティが正しく反映されていることを確認
    expect(img.attributes('src')).toBe(props.src)
    expect(img.attributes('alt')).toBe(props.alt)
    expect(img.attributes('title')).toBe(props.title)
    expect(img.attributes('width')).toBe(props.width)
    expect(img.attributes('height')).toBe(props.height)
    expect(img.attributes('loading')).toBe(props.loading)
    expect(img.attributes('srcset')).toBe(props.srcset)
  })
})
