<!--
  @name AtomsBaseButton
  @description ボタンを模したデザインで使うコンポーネント、aタグとbuttonタグの両方に対応
-->
<template>
  <component :is="props.tag" class="atoms-base-button">
    <slot />
  </component>
  <img />
</template>

<script setup lang="ts">
type Props = {
  tag?: 'a' | 'button'
}
const props = withDefaults(defineProps<Props>(), {
  tag: 'button',
})
</script>

<style lang="scss" scoped>
.atoms-base-button {
  all: unset;
}
</style>
