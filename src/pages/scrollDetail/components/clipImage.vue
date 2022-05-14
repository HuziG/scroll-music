<script setup>
import { useResizeObserver } from '@vueuse/core'

const props = defineProps(['value', 'prevValue'])
const el = ref(null)

const clipTop = ref(0)
const clipBottom = ref(0)
const prevClipBottom = ref(0)
const showHeight = ref(null)

useResizeObserver(el, (entries) => {
  const entry = entries[0]
  const { height } = entry.contentRect

  clipTop.value = props.value.clipTop / 100 * height
  clipBottom.value = props.value.clipBottom / 100 * height

  prevClipBottom.value = props.prevValue.clipBottom / 100 * height

  showHeight.value = Math.ceil(height - clipTop.value - clipBottom.value + 50)
})
</script>

<template>
  <img 
    ref="el"
    w-full
    :src="props.value.url" 
    :style="`clip-path: inset(${clipTop}px 0 ${clipBottom}px 0);margin-top: -${clipTop + prevClipBottom}px`" 
    alt="error" 
  />
</template>

<style lang="scss" scoped>

</style>
