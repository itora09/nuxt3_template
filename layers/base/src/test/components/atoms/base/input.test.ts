import { describe, test, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import * as veeValidate from 'vee-validate'
import AtomsBaseInput from '../../../../components/atoms/base/input.vue'

vi.mock('vee-validate', () => ({
  useField: vi.fn(() => ({
    value: ref(''),
    errorMessage: ref(''),
    meta: {
      valid: true,
      touched: false,
      dirty: false,
      validated: true,
      pending: false,
      required: false,
    },
    errors: ref([]),
    name: 'test-field',
    validate: vi.fn(),
    handleChange: vi.fn(),
    handleBlur: vi.fn(),
    handleReset: vi.fn(),
    resetField: vi.fn(),
    setTouched: vi.fn(),
    setValue: vi.fn(),
    setState: vi.fn(),
    setErrors: vi.fn(),
  })),
}))

describe('AtomsBaseInput', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('デフォルトでinputタグがレンダリングされる', () => {
    const wrapper = mount(AtomsBaseInput)
    expect(wrapper.find('input.atoms-base-input').exists()).toBe(true)
  })

  test('カスタムプロパティが正しく適用される', () => {
    const props = {
      type: 'text',
      placeholder: 'テスト入力',
      name: 'test-input',
      required: true,
      class: 'custom-class',
      modelValue: '',
      validatorName: 'test-input',
    }

    vi.mocked(veeValidate.useField).mockReturnValueOnce({
      value: ref(props.modelValue),
      errorMessage: ref(''),
      meta: {
        valid: true,
        touched: false,
        dirty: false,
        validated: true,
        pending: false,
        required: false,
      },
      errors: ref([]),
      name: 'test-field',
      validate: vi.fn(),
      handleChange: vi.fn(),
      handleBlur: vi.fn(),
      handleReset: vi.fn(),
      resetField: vi.fn(),
      setTouched: vi.fn(),
      setValue: vi.fn(),
      setState: vi.fn(),
      setErrors: vi.fn(),
    })
    const wrapper = mount(AtomsBaseInput, { props })
    const input = wrapper.find('input')

    expect(input.attributes('type')).toBe(props.type)
    expect(input.attributes('placeholder')).toBe(props.placeholder)
    expect(input.attributes('name')).toBe(props.name)
    expect(input.attributes('required')).toBe('')
    expect(input.classes()).toContain('custom-class')
  })

  test('エラーメッセージが正しく表示される', () => {
    vi.mocked(veeValidate.useField).mockReturnValueOnce({
      value: ref(''),
      errorMessage: ref('エラーメッセージ'),
      meta: {
        valid: true,
        touched: false,
        dirty: false,
        validated: true,
        pending: false,
        required: false,
      },
      errors: ref([]),
      name: 'test-field',
      validate: vi.fn(),
      handleChange: vi.fn(),
      handleBlur: vi.fn(),
      handleReset: vi.fn(),
      resetField: vi.fn(),
      setTouched: vi.fn(),
      setValue: vi.fn(),
      setState: vi.fn(),
      setErrors: vi.fn(),
    })
    const wrapper = mount(AtomsBaseInput, {
      props: {
        validatorName: 'test-field',
        modelValue: '',
      },
    })

    // エラーメッセージ要素が存在することを確認
    expect(wrapper.find('p.error').exists()).toBe(true)
  })

  test('エラーオプションが正しく適用される', () => {
    const props = {
      errorOption: {
        hideError: true,
        isSmall: true,
      },
      modelValue: '',
      validatorName: 'test-input',
    }

    vi.mocked(veeValidate.useField).mockReturnValueOnce({
      value: ref(props.modelValue),
      errorMessage: ref(''),
      meta: {
        valid: true,
        touched: false,
        dirty: false,
        validated: true,
        pending: false,
        required: false,
      },
      errors: ref([]),
      name: 'test-field',
      validate: vi.fn(),
      handleChange: vi.fn(),
      handleBlur: vi.fn(),
      handleReset: vi.fn(),
      resetField: vi.fn(),
      setTouched: vi.fn(),
      setValue: vi.fn(),
      setState: vi.fn(),
      setErrors: vi.fn(),
    })
    const wrapper = mount(AtomsBaseInput, { props })
    const errorElement = wrapper.find('small.error')

    expect(errorElement.exists()).toBe(true)
    expect(errorElement.classes()).toContain('-hide')
    expect(errorElement.classes()).toContain('-small')
  })

  test('v-modelが正しく動作する', async () => {
    vi.mocked(veeValidate.useField).mockReturnValueOnce({
      value: ref(''),
      errorMessage: ref(''),
      meta: {
        valid: true,
        touched: false,
        dirty: false,
        validated: true,
        pending: false,
        required: false,
      },
      errors: ref([]),
      name: 'test-field',
      validate: vi.fn(),
      handleChange: vi.fn(),
      handleBlur: vi.fn(),
      handleReset: vi.fn(),
      resetField: vi.fn(),
      setTouched: vi.fn(),
      setValue: vi.fn(),
      setState: vi.fn(),
      setErrors: vi.fn(),
    })
    const wrapper = mount(AtomsBaseInput, {
      props: {
        modelValue: '',
        validatorName: 'test-input',
      },
    })
    const input = wrapper.find('input')

    await input.setValue('テスト値')
    expect((input.element as HTMLInputElement).value).toBe('テスト値')
  })
})
