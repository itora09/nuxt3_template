import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MoleculesHeaderLogo from '../../../../components/molecules/header/logo.vue'

const mockRuntimeConfig = {
  public: {
    baseUrl: 'http://localhost:3000',
  },
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockLocalePath = (route: any): string => {
  if (typeof route === 'string') return route
  const { path, query, hash } = route
  const queryString = Object.keys(query).length
    ? `?${new URLSearchParams(query)}`
    : ''
  return path + queryString + (hash || '')
}

describe('MoleculesHeaderLogo', () => {
  const defaultProps = {
    to: '/test',
    src: '/images/logo.png',
    alt: 'Logo',
  }

  const defaultStubs = {
    NuxtLink: {
      template: '<a v-bind="$attrs"><slot /></a>',
    },
  }

  const defaultMocks = {
    useRuntimeConfig: () => mockRuntimeConfig,
    useLocalePath: () => mockLocalePath,
  }

  test('コンポーネントが正しくレンダリングされる', () => {
    const wrapper = mount(MoleculesHeaderLogo, {
      props: defaultProps,
      global: {
        stubs: defaultStubs,
        mocks: defaultMocks,
      },
    })
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.classes()).toContain('molecules-header-logo')
  })

  test('AtomsBaseLinkが正しく使用される', () => {
    const wrapper = mount(MoleculesHeaderLogo, {
      props: defaultProps,
      global: {
        stubs: defaultStubs,
        mocks: defaultMocks,
      },
    })
    const link = wrapper.find('a')
    expect(link.exists()).toBe(true)
    expect(link.attributes('to')).toBe(defaultProps.to)
  })

  test('AtomsBaseImageが正しく使用される', () => {
    const wrapper = mount(MoleculesHeaderLogo, {
      props: defaultProps,
      global: {
        stubs: defaultStubs,
        mocks: defaultMocks,
      },
    })
    const image = wrapper.find('img')
    expect(image.exists()).toBe(true)
    expect(image.attributes('src')).toBe(defaultProps.src)
    expect(image.attributes('alt')).toBe(defaultProps.alt)
    expect(image.classes()).toContain('image')
  })

  test('altが省略された場合、デフォルト値が使用される', () => {
    const propsWithoutAlt = {
      to: '/test',
      src: '/images/logo.png',
    }
    const wrapper = mount(MoleculesHeaderLogo, {
      props: propsWithoutAlt,
      global: {
        stubs: defaultStubs,
        mocks: defaultMocks,
      },
    })
    const image = wrapper.find('img')
    expect(image.attributes('alt')).toBe('')
  })

  test('snapshot', () => {
    const wrapper = mount(MoleculesHeaderLogo, {
      props: defaultProps,
      global: {
        stubs: defaultStubs,
        mocks: defaultMocks,
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
