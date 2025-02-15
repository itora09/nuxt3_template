<!--
  @name MoleculesSwiperContainer
  @description Nuxt3のmoduleであるnuxt-swiperを利用するためのコンポーネント
  @see https://nuxt.com/modules/swiper
  @example
    <MoleculesSwiperContainer
      ref="swiperContainerRef"
      :loop="true"
      :centered-slides="true"
      :slides-per-view="5"
      :autoplay="true"
    >
      <swiper-slide
        v-for="(item, index) in slideItemList"
        :key="`key-${index}`"
      >
        <AtomsBaseLink :to="item.to">
          <AtomsBaseImage class="image" :src="item.src" :alt="item.alt" />
        </AtomsBaseLink>
      </swiper-slide>
    </MoleculesSwiperContainer>
-->
<template>
  <swiper-container
    ref="swiperContainerRef"
    class="molecules-swiper-container"
    v-bind="props"
  >
    <slot />
  </swiper-container>
</template>

<script setup lang="ts">
import type { SwiperOptions } from 'swiper/types'
import type { SwiperContainer } from 'swiper/element'

type Props = SwiperOptions
const props = withDefaults(defineProps<Props>(), {
  // NOTE: nuxt-swiperのデフォルト値を設定
  allowSlideNext: true,
  allowSlidePrev: true,
  allowTouchMove: true,
  autoHeight: false,
  breakpointsBase: 'window',
  centerInsufficientSlides: false,
  centeredSlides: false,
  centeredSlidesBounds: false,
  containerModifierClass: 'swiper-',
  createElements: false,
  cssMode: false,
  direction: 'horizontal',
  edgeSwipeDetection: false,
  edgeSwipeThreshold: 20,
  effect: 'slide',
  enabled: true,
  eventsPrefix: 'swiper',
  focusableElements: 'input, select, option, textarea, button, video, label',
  followFinger: true,
  grabCursor: false,
  height: null,
  init: true,
  initialSlide: 0,
  lazyPreloadPrevNext: 0,
  lazyPreloaderClass: 'swiper-lazy-preloader',
  longSwipes: true,
  longSwipesMs: 300,
  longSwipesRatio: 0.5,
  loop: false,
  loopAddBlankSlides: true,
  loopAdditionalSlides: 0,
  loopPreventsSliding: true,
  maxBackfaceHiddenSlides: 10,
  nested: false,
  noSwiping: true,
  noSwipingClass: 'swiper-no-swiping',
  noSwipingSelector: 'string',
  normalizeSlideIndex: true,
  observeParents: false,
  observeSlideChildren: false,
  observer: false,
  oneWayMovement: false,
  passiveListeners: true,
  preventClicks: true,
  preventClicksPropagation: true,
  preventInteractionOnTransition: false,
  resistance: true,
  resistanceRatio: 0.85,
  resizeObserver: true,
  rewind: false,
  roundLengths: false,
  runCallbacksOnInit: true,
  setWrapperSize: false,
  shortSwipes: true,
  simulateTouch: true,
  slideActiveClass: 'swiper-slide-active',
  slideBlankClass: 'swiper-slide-blank',
  slideClass: 'swiper-slide',
  slideFullyVisibleClass: 'swiper-slide-fully-visible',
  slideNextClass: 'swiper-slide-next',
  slidePrevClass: 'swiper-slide-prev',
  slideToClickedSlide: false,
  slideVisibleClass: 'swiper-slide-visible',
  slidesOffsetAfter: 0,
  slidesOffsetBefore: 0,
  slidesPerGroup: 1,
  slidesPerGroupAuto: false,
  slidesPerGroupSkip: 0,
  slidesPerView: 1,
  spaceBetween: 0,
  speed: 300,
  swipeHandler: null,
  swiperElementNodeName: 'SWIPER-CONTAINER',
  threshold: 5,
  touchAngle: 45,
  touchEventsTarget: 'wrapper',
  touchMoveStopPropagation: false,
  touchRatio: 1,
  touchReleaseOnEdges: false,
  touchStartForcePreventDefault: false,
  touchStartPreventDefault: true,
  uniqueNavElements: true,
  updateOnWindowResize: true,
  url: null,
  userAgent: null,
  virtualTranslate: false,
  watchOverflow: true,
  watchSlidesProgress: false,
  width: null,
  wrapperClass: 'swiper-wrapper',
})

// ref
const swiperContainerRef = ref<SwiperContainer | null>(null)

// composables
const swiper = useSwiper(swiperContainerRef, {})

// methods
defineExpose({
  swiper,
})
</script>

<style lang="scss" scoped></style>
