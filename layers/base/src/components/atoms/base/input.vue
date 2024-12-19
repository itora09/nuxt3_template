<!--
  @name AtomsBaseInput
  @description
    ベースのinputコンポーネント
    エラーメッセージを表示する都合上ルートに二つのDOMがあるため、スタイルを適用する場合はdeepセレクタを使う
-->
<template>
  <input
    v-model="useFieldValue"
    class="atoms-base-input"
    :class="props.class"
  />
  <component
    :is="props.errorOption?.isSmall ? 'small' : 'p'"
    class="error"
    :class="{
      '-hide': props.errorOption?.hideError,
      '-small': props.errorOption?.isSmall,
    }"
  >
    <!-- NOTE: エラーメッセージが無いとレイアウトシフトを起こすので空文字を入れておく -->
    {{ errorMessage }}&nbsp;
  </component>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'
import type { InputHTMLAttributes } from 'vue'

type Props = {
  // 以下はInputHTMLAttributesの属性
  accept?: InputHTMLAttributes['accept']
  alt?: InputHTMLAttributes['alt']
  autocomplete?: InputHTMLAttributes['autocomplete']
  capture?: InputHTMLAttributes['capture']
  checked?: InputHTMLAttributes['checked']
  dirName?: string
  form?: InputHTMLAttributes['form']
  formAction?: InputHTMLAttributes['formaction']
  formEnctype?: InputHTMLAttributes['formenctype']
  formNoValidate?: InputHTMLAttributes['formnovalidate']
  formTarget?: InputHTMLAttributes['formtarget']
  height?: InputHTMLAttributes['height']
  list?: InputHTMLAttributes['list']
  max?: InputHTMLAttributes['max']
  maxLength?: InputHTMLAttributes['maxlength']
  min?: InputHTMLAttributes['min']
  minLength?: InputHTMLAttributes['minlength']
  multiple?: InputHTMLAttributes['multiple']
  name?: InputHTMLAttributes['name']
  pattern?: InputHTMLAttributes['pattern']
  placeholder?: InputHTMLAttributes['placeholder']
  popoverTargetAction?: string
  readOnly?: InputHTMLAttributes['readonly']
  required?: InputHTMLAttributes['required']
  size?: InputHTMLAttributes['size']
  src?: InputHTMLAttributes['src']
  step?: InputHTMLAttributes['step']
  type?: InputHTMLAttributes['type']
  value?: InputHTMLAttributes['value']
  width?: InputHTMLAttributes['width']
  // 以下はプロジェクトで使う属性
  class?: string
  hideError?: boolean
  modelValue?: string | number
  validatorName?: string
  errorOption?: {
    hideError: boolean
    isSmall: boolean
  }
}

const props = defineProps<Props>()

const { value: useFieldValue, errorMessage } = useField(
  props.validatorName ?? '',
  undefined,
  {
    syncVModel: true,
  },
)
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;

// FIXME: 何故か大文字じゃないとエラーになる。。。
.atoms-base-input {
  display: block;
}

// stylelint-disable-next-line custom/component-class-specificity
.error {
  display: block;
  color: v.$error;

  &.-hide {
    display: none;
  }
}
</style>
