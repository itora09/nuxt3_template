<!--
  @name AtomsBaseButton
  @description ボタンを模したデザインで使うコンポーネント、リンクとボタン両方に対応
-->
<template>
  <component :is="targetComponent" v-bind="props" class="atoms-base-button">
    <slot />
  </component>
</template>

<script setup lang="ts">
import AtomsBaseLink from '@base/components/atoms/base/link.vue'

export type Props = {
  type?: 'button' | 'link'
  to?: string
  blank?: boolean
  rel?: HTMLAnchorElement['rel']
  forceAnchorLink?: boolean
  noLocale?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  type: 'button',
})

// computed
const targetComponent = computed(() => {
  if (props.type === 'button') {
    return 'button'
  }
  return AtomsBaseLink
})

// lifecycle
if (props.type === 'link' && props.to === undefined) {
  throw new Error('props.to is required when props.type is link')
}
</script>

<style lang="scss" scoped>
.atoms-base-button {
  all: unset;
}
</style>
