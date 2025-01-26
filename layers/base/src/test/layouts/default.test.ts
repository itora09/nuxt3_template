import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DefaultLayout from '../../layouts/default.vue'

describe('DefaultLayout', () => {
  it('snapshot', () => {
    const wrapper = mount(DefaultLayout)
    expect(wrapper.element).toMatchSnapshot()
  })

  it('コンポーネントがマウントされるべき', () => {
    const wrapper = mount(DefaultLayout)
    expect(wrapper.exists()).toBe(true)
  })

  it('layoutsクラスを持つべき', () => {
    const wrapper = mount(DefaultLayout)
    expect(wrapper.classes()).toContain('layouts')
  })

  it('slotコンテンツを表示するべき', () => {
    const slotContent = 'Test Content'
    const wrapper = mount(DefaultLayout, {
      slots: {
        default: slotContent,
      },
    })
    expect(wrapper.text()).toContain(slotContent)
  })
})
