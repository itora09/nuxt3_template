<!--
  @name OrganismListCard
  @description 一覧系に使うカードコンポーネント
-->
<template>
  <component :is="props.tag" class="organism-list-card" @click="onClick">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { getCurrentInstance } from 'vue'

export type Props = {
  tag?: string
  to?: string
}
export type Emits = {
  click: [event: Event]
}
const props = withDefaults(defineProps<Props>(), {
  tag: 'div',
})
const emits = defineEmits<Emits>()

// constants
const instance = getCurrentInstance()

// event
const onClick = (event: Event) => {
  if (instance?.vnode?.props?.onClick) {
    emits('click', event)
    return
  }

  if (props.to) {
    navigateTo(props.to)
  }
}
</script>

<style lang="scss" scoped>
.organism-list-card {
  flex: 1;
}
</style>
