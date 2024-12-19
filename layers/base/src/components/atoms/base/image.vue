<!--
  @name AtomsBaseImage
  @description Imageタグをラップしたコンポーネント、画像の読み込みは必ずこのコンポーネントを使う
-->
<template>
  <img v-bind="props" />
</template>

<script setup lang="ts">
type Props = {
  // HTMLの属性
  src?: string
  alt?: string
  title?: string
  width?: string
  height?: string
  loading?: 'lazy' | 'eager'
  srcset?: string
}
const props = withDefaults(defineProps<Props>(), {
  src: 'images/no-image.png',
  loading: 'lazy',
})
</script>
