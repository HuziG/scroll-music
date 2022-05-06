<script setup lang="ts">
import { useSheetDetailStore } from '~/stores/sheetDetail'

const sheetDetailStore = useSheetDetailStore()
const router = useRouter()
const countDown = ref(5)
const step = ref(0.5)
const scrollMode = ref(0)
const showSpeedModal = ref(false)

let countDownInterval
let scrollInterval

onMounted(() => {
  initSessionSheet()
})

const initSessionSheet = () => {
  const data = sessionStorage.sheet_detail
  if (data) {
    sheetDetailStore.dispatchSheet(JSON.parse(data))
  }
}

const handleStart = () => {
  scrollMode.value = 1
  startAutoScroll()
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

const startAutoScroll = () => {
  scrollInterval = setInterval(() => {

    let topDistance = document.documentElement.scrollTop;
    topDistance += step.value
    document.documentElement.scrollTop = topDistance
  }, 30)
}

const startCountDown = () => {
  clearInterval(this.countDownInterval)
  this.countDown = 5

  countDownInterval = setInterval(() => {
    countDown.value -= 1

    if (countDown === 0) {
      this.startAutoScroll()
    }
  }, 1000)
}

onUnmounted(() => {
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

    <div class="w-2/3" mx-auto>
      <img w-full v-for="url in sheetDetailStore.imgs" :src="url" alt="error" :key="url" />
    </div>

    <n-modal v-model:show="showSpeedModal">
      <n-card
        title="速度调节"
        bordered
        size="huge"
        :closable="true"
        role="dialog"
        aria-modal="true"
        style="width: 500px; position: fixed; right: 100px; bottom: 100px"
        @onClose="showSpeedModal = false"
      >
        内容
        <template #footer>
          <div style="text-align: right">
            <n-button type="primary">确定</n-button>
          </div>
        </template>
      </n-card>
    </n-modal>
  </div>
</template>

<style scoped>

</style>
