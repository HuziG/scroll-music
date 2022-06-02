<script setup lang="ts">
import { useMessage } from 'naive-ui'

const props = defineProps(['value'])
const emit = defineEmits(['cancel', 'confirm'])

const message = useMessage()
const { error } = useMessage()
const moveLineType = ref('')
const containerHeight = ref(450)

const topStartY = ref(0)
const bottomStartY = ref(0)

const baseTopDistance = ref(0)
const baseBottomDistance = ref(0)

const topDistance = ref(0)
const bottomDistance = ref(0)

const clipContainer = ref(null)

const handleSubmit = () => {
  emit('confirm', {
    clipTop: Math.ceil(topDistance.value / containerHeight.value * 100),
    clipBottom: Math.ceil(bottomDistance.value / containerHeight.value * 100),
  })
}

onMounted(() => {
  const _top = props.value.clipTop / 100 * containerHeight.value
  const _bottom = props.value.clipBottom / 100 * containerHeight.value

  topDistance.value = _top
  bottomDistance.value = _bottom
  baseTopDistance.value = _top
  baseBottomDistance.value = _bottom
})

const handleMouseDown = ({ event, type }) => {
  if (type === 'top')
    topStartY.value = event.y

  if (type === 'bottom')
    bottomStartY.value = event.y

  moveLineType.value = type
}

const handleTopMouseUp = (e) => {
  baseTopDistance.value = topDistance.value
  moveLineType.value = ''
  topStartY.value = e.y
}

const handleBottomMouseUp = (e) => {
  baseBottomDistance.value = bottomDistance.value
  moveLineType.value = ''
  bottomStartY.value = e.y
}

const handleMouseMove = (event) => {
  if (topDistance.value + bottomDistance.value >= 315) {
    message.warning('可视距离太小，请重新拖动剪裁')

    if (moveLineType.value === 'top') {
      topDistance.value = 0
      baseTopDistance.value = 0
    }

    if (moveLineType.value === 'bottom') {
      bottomDistance.value = 0
      baseBottomDistance.value = 0
    }

    moveLineType.value = ''

    return false
  }

  if (moveLineType.value === 'top') {
    const moveDistance = event.y - topStartY.value + baseTopDistance.value
    if (moveDistance > 0)
      topDistance.value = moveDistance
  }

  if (moveLineType.value === 'bottom') {
    let moveDistance = event.y - bottomStartY.value
    moveDistance = moveDistance < 0 ? (Math.abs(moveDistance) + baseBottomDistance.value) : (baseBottomDistance.value - Math.abs(moveDistance))
    if (moveDistance > 0)
      bottomDistance.value = moveDistance
  }
}

const touchstart = () => {
  console.log('aaa')
}
</script>

<template>
  <n-card
    style="width: 400px;height: 630px;"
    title="剪裁曲谱"
    :bordered="false"
    size="huge"
    role="dialog"
    aria-modal="true"
  >
    <template #header-extra>
      <n-button quaternary circle @click="emit('cancel')">
        <template #icon>
          <div i-mdi-close text-base />
        </template>
      </n-button>
    </template>

    <div
      ref="clipContainer"
      relative mx-auto select-none :style="`width: 300px;height: ${containerHeight}px;`"
      @mousemove="handleMouseMove"
    >
      <div absolute bg-red bg-opacity-20 top-0 left-0 w-full :style="`height: ${topDistance}px`" />
      <div
        absolute transition w-full border-b-4 border-red-500 bg-opacity-20 cursor-move :style="`cursor: ns-resize;top: ${topDistance}px`"
        @mousedown="(event) => handleMouseDown({ event, type:'top' })"
        @mouseup="handleTopMouseUp"
        @touchstart.prevent="touchstart"
      />

      <img :src="props.value.url" border-2 box-border border-primary pointer-events-none select-none w-full h-full alt="error">

      <div absolute bg-red bg-opacity-20 bottom-0 left-0 w-full :style="`height: ${bottomDistance}px;`" />
      <div
        absolute transition w-full border-t-4 border-red-500 bg-opacity-20 :style="`cursor: ns-resize;bottom: ${bottomDistance}px`"
        @mousedown="(event) => handleMouseDown({ event, type:'bottom' })"
        @mouseup="handleBottomMouseUp"
      />
    </div>

    <template #footer>
      <div text-right>
        <n-button type="primary" @click="handleSubmit">
          保存
        </n-button>
      </div>
    </template>
  </n-card>
</template>

<style scoped>

</style>
