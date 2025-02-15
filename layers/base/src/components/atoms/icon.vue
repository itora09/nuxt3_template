<!--
  @name AtomsIcon
  @description ライブラリで提供されているアイコンを表示するコンポーネント
  @see remix icon: https://icones.js.org/collection/ri
-->
<template>
  <Icon :name="props.name" />
</template>

<script setup lang="ts">
import type RiIconsJson from '@iconify-json/ri/icons.json'

type RiIconNames = keyof (typeof RiIconsJson)['icons']
type RiIcons = `ri:${RiIconNames}`

// FIXME: ICONに渡せるPropを全て再定義する
type Props = {
  name: RiIcons
}
const props = defineProps<Props>()
</script>

<style lang="scss" scoped></style>
