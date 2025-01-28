import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AtomsBaseButton from '../../../../components/atoms/base/button.vue'

describe('AtomsBaseButton', () => {
  test('snapshot', () => {
    const wrapper = mount(AtomsBaseButton)
    expect(wrapper.element).toMatchSnapshot()
  })

  test('デフォルトでbuttonタグがレンダリングされる', () => {
    const wrapper = mount(AtomsBaseButton)
    expect(wrapper.find('button').exists()).toBe(true)
  })

  test('tagプロップスでaタグを指定できる', () => {
    const wrapper = mount(AtomsBaseButton, {
      props: {
        tag: 'a',
      },
    })
    expect(wrapper.find('a').exists()).toBe(true)
  })

  test('スロットの内容が正しく表示される', () => {
    const slotContent = 'ボタンテキスト'
    const wrapper = mount(AtomsBaseButton, {
      slots: {
        default: slotContent,
      },
    })
    expect(wrapper.text()).toBe(slotContent)
  })
})
