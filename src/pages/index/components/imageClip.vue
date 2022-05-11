<script setup lang="ts">
const props = defineProps(['value'])
const emit = defineEmits(['cancel'])

const moveLineType = ref('')

const topStartY = ref(0)
const bottomStartY = ref(0)

const baseTopDistance = ref(0)
const baseBottomDistance = ref(0)

const topDistance = ref(0)
const bottomDistance = ref(0)

const clipContainer = ref(null)

const handleSubmit = () => {

}

onMounted(() => {
  console.log(clipContainer)
})

const handleMouseDown = ({ event, type }) => {
  if (type === 'top') {
    topStartY.value = event.y
  
  }

  if (type === 'bottom') {
    bottomStartY.value = event.y
  }

  moveLineType.value = type
}

const handleMouseMove = (event) => {
  if (moveLineType.value === 'top') {
    topDistance.value = event.y - topStartY.value + baseTopDistance.value
  }

  if (moveLineType.value === 'bottom') {
    const moveDistance = event.y - bottomStartY.value
    console.log(event.y - bottomStartY.value)
    bottomDistance.value = moveDistance < 0 ? (Math.abs(moveDistance) + baseBottomDistance.value) : (baseBottomDistance.value - Math.abs(moveDistance))
  }
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
      relative mx-auto select-none style="width: 300px;height: 450px;"
      @mousemove="handleMouseMove"
    >
      <div absolute bg-red bg-opacity-20 top-0 left-0 w-full :style="`height: ${topDistance}px`" />
      <div 
        absolute w-full border-b-4 border-red-500 bg-opacity-20 cursor-move :style="`cursor: ns-resize;top: ${topDistance}px`"
        @mousedown="(event) => handleMouseDown({ event, type:'top' })"
        @mouseup="handleTopMouseUp"
      ></div>
 
      <img :src="props.value.url" border-2 box-border border-primary pointer-events-none select-none w-full h-full alt="error">

      <div absolute bg-red bg-opacity-20 bottom-0 left-0 w-full :style="`height: ${bottomDistance}px;`" />
      <div 
        absolute w-full border-t-4 border-red-500 bg-opacity-20 :style="`cursor: ns-resize;bottom: ${bottomDistance}px`"
        @mousedown="(event) => handleMouseDown({ event, type:'bottom' })"
        @mouseup="handleBottomMouseUp"
      ></div>
    </div>

    <template #footer>
      <div text-right>
        <n-button type="primary" @click="handleSubmit">保存</n-button>
      </div>
    </template>
  </n-card>
</template>

<style scoped>

</style>
