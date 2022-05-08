<script setup lang="ts">
import { useSheetDetailStore } from '~/stores/sheetDetail'
import { editSheet } from '~/api/sheetMusic'
import { useMessage } from 'naive-ui'

const message = useMessage()
const sheetDetailStore = useSheetDetailStore()
const router = useRouter()
const countDown = ref(0)
const baseSpeed = 0.5
const scrollMode = ref(0)
const showSpeedModal = ref(false)

const step = ref(null)
const stepSlider = ref(null)
const speedSlider = ref(null)

let countDownInterval
let scrollInterval

onMounted(() => {
  initSessionSheet()
})

const initSessionSheet = () => {
  const data = sessionStorage.sheet_detail

  if (data) {
    sheetDetailStore.dispatchSheet(JSON.parse(data))
    step.value = sheetDetailStore.sheetData.step
    stepSlider.value = sheetDetailStore.sheetData.step * 100
    speedSlider.value = sheetDetailStore.sheetData.speed
  }
}

const handleStart = () => {
  scrollMode.value = 1

  startCountDown().then(() => {
    startScroll()
  })
}

const handleRestart = () => {
  scrollMode.value = 0
  clearInterval(scrollInterval)
  document.documentElement.scrollTop = 0
}

const handleStop = () => {
  scrollMode.value = 0
  clearInterval(scrollInterval)
}

const startScroll = () => {
  scrollInterval = setInterval(() => {
    let topDistance = document.documentElement.scrollTop;
    topDistance += step.value
    document.documentElement.scrollTop = topDistance
  }, speedSlider.value)
}

const startCountDown = () => {
  return new Promise((resolve) => {
    clearInterval(countDownInterval)

    countDown.value = 5

    countDownInterval = setInterval(() => {
      countDown.value -= 1
      if (countDown.value === 0) {
        resolve(true)
        clearInterval(countDownInterval)
      }
    }, 1000)
  })
}

watch(showSpeedModal, (newValue) => {
  document.documentElement.scrollTop = 0

  if (newValue) {
    startScroll()
  } else {
    handleRestart()
  }
})

const handleConfirm = async () => {
  showSpeedModal.value = false

  const data = await editSheet({
    _id: sheetDetailStore.sheetData._id,
    step: Number(step.value),
    speed: Number(speedSlider.value),
  })

  sheetDetailStore.dispatchSpeed(step.value, speedSlider.value)

  message.success('设置成功')
}

watch(stepSlider, (newValue) => {
  const n = (newValue / 20 * 0.1)
  step.value = (0.5 + Number(toRaw(n.toFixed(1))))
})

const handleSpeedChange = () => {
  clearInterval(scrollInterval)
  startScroll()
}

onBeforeUnmount(() => {
  clearInterval(countDownInterval)
  clearInterval(scrollInterval)
  sheetDetailStore.clearData()
})
</script>

<template>
  <div style="background-color: #F0F2F5">
    <div fixed top-5 left-8>
      <div 
        i-mdi:arrow-left-circle text-5xl text-primary cursor-pointer 
        class="hover-active-opacity" 
        @click="router.replace('/')"
      />
    </div>

    <div fixed top-5 right-8>
      <div 
        v-if="scrollMode === 0"
        i-ic:sharp-not-started text-5xl text-primary cursor-pointer 
        class="hover-active-opacity" 
        @click="handleStart"
      />
      <div
        v-if="scrollMode === 1" 
        i-ic:round-stop-circle text-5xl text-primary cursor-pointer 
        class="hover-active-opacity" 
        @click="handleStop"
      />
      <div
        i-ic:baseline-restart-alt text-5xl text-primary cursor-pointer mt-10
        class="hover-active-opacity" 
        @click="handleRestart"
      />
    </div>

    <div fixed bottom-8 right-8>
      <div 
        i-mdi:tune-vertical text-5xl text-primary cursor-pointer
        class="hover-active-opacity" 
        @click="showSpeedModal = true"
      />
    </div>

    <div style="width: 80%" mx-auto>
      <img 
        w-full 
        v-for="item in sheetDetailStore.sheetData.imgs" 
        :src="item.url" 
        alt="error" 
        :key="item.url" 
      />
    </div>

    <n-modal v-model:show="showSpeedModal">
      <n-card
        title="速度调节"
        bordered
        size="huge"
        :closable="false"
        role="dialog"
        aria-modal="true"
        style="width: 500px; position: fixed; right: 100px; bottom: 100px"
      >
        <template #header-extra>
          <n-button quaternary circle @click="showSpeedModal = false">
            <template #icon>
              <div i-mdi-close text-base />
            </template>
          </n-button>
        </template>
        
        <div>跨度调节</div>
        <div text-xs text-vice my-1>一次滚动的距离</div>
        <n-slider v-model:value="stepSlider" :step="20" />

        <div mt-10>速度调节</div>
        <div text-xs text-vice my-1>每多少 ms 滚动一次</div>
        <n-slider v-model:value="speedSlider" :min="30" :step="5" @update:value="handleSpeedChange" />
        
        <template #footer>
          <div style="text-align: right">
            <n-button type="primary" @click="handleConfirm">确定</n-button>
          </div>
        </template>
      </n-card>
    </n-modal>

    <div 
      v-if="countDown > 0"
      style="left: 50%;top: 50%;transform: translateY(-50%) translateX(-50%)"
      z-20 w-50 h-50 flex items-center rounded-full justify-center text-7xl absolute bg-primary text-white
    >
      {{countDown}}
    </div>
  </div>
</template>

<style scoped>

</style>
