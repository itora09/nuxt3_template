<!--
  @name AtomsBaseLink
  @description
    NuxtLinkをラップしたコンポーネント
    リンク遷移はすべてこのコンポーネントを利用する
-->
<template>
  <NuxtLink
    class="ha-link"
    :to="linkTo"
    :target="props.blank ? '_blank' : undefined"
    :rel="props.rel"
    :external="props.forceAnchorLink"
  >
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
import type { LocationQuery } from 'vue-router'

type Props = {
  to: string
  blank?: boolean
  rel?: HTMLAnchorElement['rel']
  forceAnchorLink?: boolean
  noLocale?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  blank: false,
  rel: undefined,
  forceAnchorLink: false,
  noLocale: false,
})

// composable
const runtimeConfig = useRuntimeConfig()
const localePath = useLocalePath()

// computed
const isExternalReference = computed(
  () =>
    !!props.to?.match(/^https?:\/\//) ||
    !!props.to?.match(/^mailto:/) ||
    !!props.to?.match(/^tel:/),
)
const linkTo = computed(() => {
  if (isExternalReference.value) {
    return props.to
  }

  const url = new URL(`${runtimeConfig.public.baseUrl}${props.to}`)
  const query: LocationQuery = Object.fromEntries(
    Array.from(url.searchParams.entries()),
  )

  return localePath({
    path: url.pathname,
    query,
    hash: url.hash,
  })
})
</script>
