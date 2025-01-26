import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AtomsBaseLink from '../../../../components/atoms/base/link.vue'

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

describe('AtomsBaseLink', () => {
  const defaultStubs = {
    NuxtLink: {
      template: '<a v-bind="$attrs"><slot /></a>',
    },
  }
  const defaultMocks = {
    useRuntimeConfig: () => mockRuntimeConfig,
    useLocalePath: () => mockLocalePath,
  }

  test('NuxtLinkがレンダリングされる', () => {
    const wrapper = mount(AtomsBaseLink, {
      props: {
        to: '/test',
      },
      global: {
        stubs: defaultStubs,
        mocks: defaultMocks,
      },
    })
    expect(wrapper.find('a').exists()).toBe(true)
  })

  test('スロットの内容が正しく表示される', () => {
    const slotContent = 'リンクテキスト'
    const wrapper = mount(AtomsBaseLink, {
      props: {
        to: '/test',
      },
      slots: {
        default: slotContent,
      },
      global: {
        stubs: defaultStubs,
        mocks: defaultMocks,
      },
    })
    expect(wrapper.find('a').text()).toBe(slotContent)
  })

  test('プロパティが正しく渡される', () => {
    const wrapper = mount(AtomsBaseLink, {
      props: {
        to: '/test',
        blank: true,
        rel: 'nofollow',
        forceAnchorLink: true,
      },
      global: {
        stubs: defaultStubs,
        mocks: defaultMocks,
      },
    })
    const link = wrapper.find('a')

    expect(link.attributes('to')).toBe('/test')
    expect(link.attributes('target')).toBe('_blank')
    expect(link.attributes('rel')).toBe('nofollow')
    expect(link.attributes('external')).toBe('true')
  })

  describe('リンクの処理', () => {
    test('外部リンクの場合、URLがそのまま使用される', () => {
      const externalUrl = 'https://example.com'
      const wrapper = mount(AtomsBaseLink, {
        props: {
          to: externalUrl,
        },
        global: {
          stubs: defaultStubs,
          mocks: defaultMocks,
        },
      })
      expect(wrapper.find('a').attributes('to')).toBe(externalUrl)
    })

    test('クエリパラメータを含む内部リンクが正しく処理される', () => {
      const wrapper = mount(AtomsBaseLink, {
        props: {
          to: '/test?param=value',
        },
        global: {
          stubs: defaultStubs,
          mocks: defaultMocks,
        },
      })
      expect(wrapper.find('a').attributes('to')).toBe('/test?param=value')
    })

    test('ハッシュを含む内部リンクが正しく処理される', () => {
      const wrapper = mount(AtomsBaseLink, {
        props: {
          to: '/test#section',
        },
        global: {
          stubs: defaultStubs,
          mocks: defaultMocks,
        },
      })
      expect(wrapper.find('a').attributes('to')).toBe('/test#section')
    })

    test('クエリパラメータとハッシュを含む内部リンクが正しく処理される', () => {
      const wrapper = mount(AtomsBaseLink, {
        props: {
          to: '/test?param=value#section',
        },
        global: {
          stubs: defaultStubs,
          mocks: defaultMocks,
        },
      })
      expect(wrapper.find('a').attributes('to')).toBe(
        '/test?param=value#section',
      )
    })
  })
})
