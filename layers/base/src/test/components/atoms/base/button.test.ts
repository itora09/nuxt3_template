import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AtomsBaseButton from '../../../../components/atoms/base/button.vue'
import AtomsBaseLink from '../../../../components/atoms/base/link.vue'

describe('AtomsBaseButton', () => {
  test('snapshot', () => {
    const wrapper = mount(AtomsBaseButton)
    expect(wrapper.element).toMatchSnapshot()
  })

  test('デフォルトでbuttonタグがレンダリングされる', () => {
    const wrapper = mount(AtomsBaseButton)
    expect(wrapper.find('button').exists()).toBe(true)
  })

  test('typeプロップスでリンクを指定できる', () => {
    const wrapper = mount(AtomsBaseButton, {
      props: {
        type: 'link',
        to: '/test',
      },
    })
    expect(wrapper.findComponent(AtomsBaseLink).exists()).toBe(true)
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
