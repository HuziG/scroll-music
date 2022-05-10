<script setup lang="ts">
const props = defineProps(['value'])
const emit = defineEmits(['cancel'])

const moveLineType = ref('')
const startY = ref(0)
const baseDistance = ref(0)
const topDistance = ref(0)

const clipContainer = ref(null)

const handleSubmit = () => {

}

onMounted(() => {
  console.log(clipContainer)
})

const handleMouseDown = ({ event, type }) => {
  console.log('handleMouseDown', event)

  startY.value = event.y
  moveLineType.value = type
}

const handleMouseMove = (event) => {
  // console.log('handleMouseMove', event)
  
  if (moveLineType.value) {
    console.log('handleMouseMove', event)
    topDistance.value = event.y - startY.value + baseDistance.value
  }
}

const handleMouseUp = (e) => {
  console.log('handleMouseUp', e.y)

  baseDistance.value = topDistance.value
  moveLineType.value = ''
  startY.value = e.y
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
      <div 
        absolute w-full border-b-4 border-red bg-red bg-opacity-20 cursor-move :style="`cursor: ns-resize;top: ${topDistance}px`"
        @mousedown="(event) => handleMouseDown({ event, type:'top' })"
        @mouseup="handleMouseUp"
      ></div>
 
      <img :src="props.value.url" border-2 box-border border-primary pointer-events-none select-none w-full h-full alt="error">

      <div 
        absolute w-full top-full border-t-4 border-red bg-red bg-opacity-20 style="cursor: ns-resize"
        @mousedown="handleMouseDown('bottom')"
        @mouseup="handleMouseUp"
      ></div>
    </div>

    <template #footer>
      <div text-right>
        <n-button :loading="submitLoading" type="primary" @click="handleSubmit">保存</n-button>
      </div>
    </template>
  </n-card>
</template>

<style scoped>

</style>
