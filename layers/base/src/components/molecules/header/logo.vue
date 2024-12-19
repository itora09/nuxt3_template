<!--
  @name MoleculesHeaderLogo
  @description Headerのロゴを表示するコンポーネント
-->
<template>
  <AtomsBaseLink class="molecules-header-logo" :to="props.to">
    <AtomsBaseImage :src="props.src" :alt="props.alt" class="image" />
  </AtomsBaseLink>
</template>

<script setup lang="ts">
type Props = {
  to: string
  src: string
  alt?: string
}
const props = withDefaults(defineProps<Props>(), {
  alt: '',
})
</script>

<style lang="scss" scoped>
.molecules-header-logo {
  > .image {
    width: 100%;
    height: 100%;
  }
}
</style>
