<script setup lang="ts">
import { useMessage } from 'naive-ui'
import ClipImage from './components/clipImage.vue'
import richEditModel from './components/richEditModel.vue'
import SheetWidthModal from './components/sheetWidthModal.vue'
import RecorderMusic from './components/recorderMusic.vue'
import keyboardMixins from './keyboardMixins'
import MetronomeSet from './components/metronomeSet.vue'
import useMediaSize from '~/mixins/useMediaSize'
import { useSheetDetailStore } from '~/stores/sheetDetail'
import { addSheetNote, editSheet, editSheetNote, getSheetsNote } from '~/api/sheetMusic'

const message = useMessage()
const sheetDetailStore = useSheetDetailStore()
const router = useRouter()
const countDown = ref(0)
const baseSpeed = 0.5
const scrollMode = ref(0)
const { isLargeScreen } = useMediaSize()

const sheetImgWidth = ref(isLargeScreen ? 70 : 90)

const showSheetWidthModal = ref(false)
const showSpeedModal = ref(false)
const showNoteModal = ref(false)
const noteSaveLoading = ref(false)

const darkMode = ref(false)

const stepSlider = ref(null)
const speedSlider = ref(null)

let countDownInterval
let scrollInterval

const initSheetNote = async() => {
  if (useUserStore().demoUser)
    return false

  const { objects } = await getSheetsNote(sheetDetailStore.sheetData._id)
  sheetDetailStore.$patch((state) => {
    if (objects.length > 0)
      state.sheetNote = objects[0]
  })
}

const initNightDark = () => {
  darkMode.value = localStorage.sheet_detail_mode === 'dark'
}

const initSessionSheet = () => {
  const data = sessionStorage.sheet_detail

  if (data) {
    sheetDetailStore.dispatchSheet(JSON.parse(data))
    stepSlider.value = sheetDetailStore.sheetData.step
    speedSlider.value = sheetDetailStore.sheetData.speed
    sheetImgWidth.value = sheetDetailStore.sheetData.width
  }
}

const handleReturnTop = () => {
  document.documentElement.scrollTop = 0
  window.scrollTo({
    left: 0,
    top: 0,
    behavior: 'smooth',
  })
}

const handleRestart = () => {
  scrollMode.value = 0
  clearInterval(scrollInterval)
  handleReturnTop()
}

const handleStop = () => {
  scrollMode.value = 0
  clearInterval(scrollInterval)
}

const startScroll = () => {
  scrollInterval = setInterval(() => {
    let topDistance = document.documentElement.scrollTop
    topDistance += stepSlider.value
    document.documentElement.scrollTop = topDistance
  }, speedSlider.value)
}

const startCountDown = () => {
  return new Promise((resolve) => {
    clearInterval(countDownInterval)

    countDown.value = 3

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
  clearInterval(scrollInterval)

  document.documentElement.scrollTop = 0

  if (newValue)
    startScroll()

  else
    handleRestart()
})

const handleSaveSpeed = async() => {
  if (useUserStore().demoUser) {
    message.success('保存成功')
    return false
  }

  showSpeedModal.value = false

  const data = await editSheet({
    _id: sheetDetailStore.sheetData._id,
    step: Number(stepSlider.value),
    speed: Number(speedSlider.value),
  })

  sheetDetailStore.dispatchSpeed(stepSlider.value, speedSlider.value)

  message.success('设置成功')
}

// watch(stepSlider, (newValue) => {
//   console.log(newValue)
//   stepSlider.value = newValue
//   // const n = (newValue / 20) * 0.1
//   // step.value = 0.5 + Number(toRaw(n.toFixed(1)))
// })

const handleSpeedChange = () => {
  clearInterval(scrollInterval)
  startScroll()
}

const toggleDarkMode = () => {
  darkMode.value = !darkMode.value
  localStorage.sheet_detail_mode = darkMode.value ? 'dark' : 'light'
}

const handleConfirmNote = async({ content }) => {
  if (useUserStore().demoUser) {
    message.success('保存成功')
    return false
  }

  noteSaveLoading.value = true

  if (sheetDetailStore.sheetNote._id) {
    await editSheetNote({
      _id: sheetDetailStore.sheetNote._id,
      content,
    })
  }
  else {
    await addSheetNote({
      sheet_id: sheetDetailStore.sheetData._id,
      content,
    })
  }

  noteSaveLoading.value = false

  sheetDetailStore.setSheetNote(content)

  message.success('保存笔记成功')

  showNoteModal.value = false
}

const windowHeight = document.documentElement.clientHeight
const handleUpPage = () => {
  document.documentElement.scrollTop = document.documentElement.scrollTop - windowHeight
}

const handleDownPage = () => {
  document.documentElement.scrollTop = document.documentElement.scrollTop + windowHeight
}

const handleStart = () => {
  scrollMode.value = 1

  startCountDown().then(() => {
    startScroll()
  })
}

const stopScroll = () => {
  if (scrollMode.value === 1)
    handleStop()
}

const updateWidth = (width) => {
  sheetImgWidth.value = width
}

const saveWidth = async() => {
  if (useUserStore().demoUser) {
    message.success('保存成功')
    return false
  }

  const data = await editSheet({
    _id: sheetDetailStore.sheetData._id,
    width: sheetImgWidth.value,
  })

  sheetDetailStore.dispatchChangeValue({
    width: sheetImgWidth.value,
  })
  showSheetWidthModal.value = false

  message.success('保存成功')
}

const beforeSheetImgWidth = ref(null)

const cancelWidthSet = () => {
  showSheetWidthModal.value = false
  sheetImgWidth.value = beforeSheetImgWidth.value
}

const handleShowSheetWidthModal = () => {
  beforeSheetImgWidth.value = sheetImgWidth.value
  showSheetWidthModal.value = true
}

const { showActionData } = keyboardMixins({
  scrollMode,
  handleStart,
  handleStop,
  handleRestart,
})

onMounted(() => {
  initSessionSheet()
  initNightDark()
  initSheetNote()
})

onBeforeUnmount(() => {
  clearInterval(countDownInterval)
  clearInterval(scrollInterval)
  sheetDetailStore.clearData()
})
</script>

<template>
  <div
    :style="{
      backgroundColor: darkMode ? '#333333' : '#F0F2F5',
    }"
  >
    <div fixed top-5 left-5 z-30>
      <n-button
        strong
        circle
        type="primary"
        size="medium"
        @click="router.back()"
      >
        <template #icon>
          <div i-mdi:arrow-left-circle text-base />
        </template>
      </n-button>
    </div>

    <div fixed top-5 right-5 z-30>
      <n-tooltip :show-arrow="false" placement="left">
        <template #trigger>
          <n-button
            strong
            circle
            type="primary"
            size="medium"
            @click="scrollMode === 0 ? handleStart() : handleStop()"
          >
            <template #icon>
              <div v-if="scrollMode === 0" i-ic:sharp-not-started text-base />
              <div v-else i-ic:round-stop-circle text-base />
            </template>
          </n-button>
        </template>
        {{ scrollMode === 0 ? "开始" : "暂停" }}
      </n-tooltip> <br><br>
      <n-tooltip :show-arrow="false" placement="left">
        <template #trigger>
          <n-button
            strong
            circle
            type="primary"
            size="medium"
            @click="handleRestart"
          >
            <template #icon>
              <div i-ic:baseline-restart-alt text-base />
            </template>
          </n-button>
        </template>
        重置
      </n-tooltip> <br><br>
      <n-tooltip :show-arrow="false" placement="left">
        <template #trigger>
          <n-button
            strong
            circle
            type="primary"
            size="medium"
            @click="handleReturnTop"
          >
            <template #icon>
              <div i-mdi:arrow-up text-base />
            </template>
          </n-button>
        </template>
        回到顶部
      </n-tooltip>

      <br><br>

      <n-button-group vertical>
        <n-tooltip :show-arrow="false" placement="left">
          <template #trigger>
            <n-button
              strong
              circle
              type="primary"
              size="medium"
              @click="handleUpPage"
            >
              <template #icon>
                <div i-ic:baseline-keyboard-double-arrow-up text-base />
              </template>
            </n-button>
          </template>
          向上翻页
        </n-tooltip>
        <n-tooltip :show-arrow="false" placement="left">
          <template #trigger>
            <n-button
              strong
              circle
              type="primary"
              size="medium"
              @click="handleDownPage"
            >
              <template #icon>
                <div i-ic:baseline-keyboard-double-arrow-down text-base />
              </template>
            </n-button>
          </template>
          向下翻页
        </n-tooltip>
      </n-button-group>
    </div>

    <div fixed bottom-5 right-5 flex flex-col z-30>
      <n-tooltip :show-arrow="false" placement="left">
        <template #trigger>
          <n-button
            strong
            circle
            mt-5
            type="primary"
            size="medium"
            @click="handleShowSheetWidthModal"
          >
            <template #icon>
              <div i-mdi:file-xml text-base />
            </template>
          </n-button>
        </template>
        曲谱宽度
      </n-tooltip>
      <n-tooltip :show-arrow="false" placement="left">
        <template #trigger>
          <n-button
            strong
            circle
            mt-5
            type="primary"
            size="medium"
            @click="showSpeedModal = true"
          >
            <template #icon>
              <div i-mdi:tune-vertical text-base />
            </template>
          </n-button>
        </template>
        速度调节
      </n-tooltip>
    </div>

    <div fixed bottom-5 left-5 flex flex-col z-30>
      <n-tooltip :show-arrow="false" placement="left">
        <template #trigger>
          <n-button
            strong
            circle
            type="primary"
            size="medium"
            @click="toggleDarkMode"
          >
            <template #icon>
              <div v-show="darkMode" i-mdi:weather-sunny text-base />
              <div v-show="!darkMode" i-mdi:weather-night text-base />
            </template>
          </n-button>
        </template>
        {{ darkMode ? "白天模式" : "夜间模式" }}
      </n-tooltip> <br>

      <!-- <recorder-music @stop-scroll="stopScroll" /> <br> -->

      <metronome-set /> <br>

      <n-tooltip :show-arrow="false" placement="left">
        <template #trigger>
          <n-button
            strong
            circle
            type="primary"
            size="medium"
            @click="showNoteModal = true"
          >
            <template #icon>
              <div i-mdi:notebook-multiple text-base />
            </template>
          </n-button>
        </template>
        笔记
      </n-tooltip>
    </div>

    <div
      :style="{
        width: sheetImgWidth + '%',
        filter: darkMode ? 'invert(75%)' : 'none',
      }"
      bg-primary
      mx-auto
      border
      border-primary
    >
      <clip-image
        v-for="(item, index) in sheetDetailStore.sheetData.imgs"
        :key="index"
        :value="item"
        :prev-value="sheetDetailStore.sheetData.imgs[index - 1]"
      />
    </div>

    <n-card
      v-if="showSpeedModal"
      title="速度调节"
      bordered
      size="huge"
      :closable="false"
      role="dialog"
      aria-modal="true"
      style="width: 500px; position: fixed; right: 70px; bottom: 50px"
    >
      <template #header-extra>
        <n-button quaternary circle @click="showSpeedModal = false">
          <template #icon>
            <div i-mdi-close text-base />
          </template>
        </n-button>
      </template>

      <div flex items-center justify-between>
        <div>
          <div>
            跨度调节
          </div>
          <div text-xs text-vice my-1>
            一次滚动的距离
          </div>
        </div>
        <div text-primary font-bold text-2xl>
          {{ stepSlider }} px
        </div>
      </div>
      <n-slider
        v-model:value="stepSlider"
        :step="0.1"
        :min="0.5"
        :max="2"
        :tooltip="false"
      />

      <div flex items-center justify-between mt-10>
        <div>
          <div>
            速度调节
          </div>
          <div text-xs text-vice my-1>
            每多少毫秒滚动一次
          </div>
        </div>
        <div text-primary font-bold text-2xl>
          {{ speedSlider }} ms
        </div>
      </div>
      <n-slider
        v-model:value="speedSlider"
        :min="20"
        :max="50"
        :step="1"
        :tooltip="false"
        @update:value="handleSpeedChange"
      />

      <template #footer>
        <div style="text-align: right">
          <n-button type="primary" @click="handleSaveSpeed">
            保存
          </n-button>
        </div>
      </template>
    </n-card>

    <n-modal v-model:show="showNoteModal">
      <rich-edit-model
        :html-content="sheetDetailStore.sheetNote.content"
        :note-save-loading="noteSaveLoading"
        @cancel="showNoteModal = false"
        @confirm="handleConfirmNote"
      />
    </n-modal>

    <sheet-width-modal
      v-if="showSheetWidthModal"
      :width="sheetImgWidth"
      @widthUpdate="updateWidth"
      @saveWidth="saveWidth"
      @cancel="cancelWidthSet"
    />

    <div
      v-if="countDown > 0"
      style="left: 50%; top: 50%; transform: translateY(-50%) translateX(-50%)"
      z-20 w-80 h-80 flex items-center rounded-full justify-center text-8xl fixed
      bg-primary bg-opacity-90 text-white
    >
      {{ countDown }}
    </div>

    <div
      v-if="showActionData"
      fixed z-30 bottom-5 bg-black w-40 h-30 rounded-xl bg-opacity-90 text-white
      class="left-1/2 -translate-x-1/2 flex flex-col items-center justify-center"
    >
      <div text-4xl :class="`${showActionData.icon || ''}`" />
      <div mt-3 text-xl>
        {{ showActionData.label }}
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
