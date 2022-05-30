<script setup lang="ts">
import { getBgImgList } from '~/api/sheetMusic'

import useMediaSize from '~/mixins/useMediaSize'

const prop = defineProps(['saveLoading'])
const emit = defineEmits(['cancel', 'set', 'save'])
const selectCidIndex = ref(11)
const cidList = ref([
  { label: '每日精选', cid: 1 },
  { label: '游戏', cid: 5 },
  { label: '美女', cid: 6 },
  { label: '风景', cid: 9 },
  { label: '视觉创意', cid: 10 },
  { label: '明星影视', cid: 11 },
  { label: '汽车', cid: 12 },
  { label: '萌宠动物', cid: 14 },
  { label: '小清新', cid: 15 },
  { label: '体育', cid: 16 },
  { label: '军事', cid: 22 },
  { label: '动漫卡通', cid: 26 },
  { label: '情感', cid: 30 },
  { label: '文字', cid: 35 },
])
const imgList = ref([])
const loadingList = ref(false)
const page = ref(1)
const pageCount = ref(1)
const { isLargeScreen } = useMediaSize()

const handleGetImg = async(cid) => {
  loadingList.value = true
  const { data } = await getBgImgList(cid, (page.value - 1) * 20)
  imgList.value = data.data.data
  pageCount.value = Math.floor(Number(data.data.total) / 20)
  loadingList.value = false
}

watch(selectCidIndex, (newValue) => {
  handleGetImg(cidList.value[selectCidIndex.value].cid)
})

watch(page, (newValue) => {
  handleGetImg(cidList.value[selectCidIndex.value].cid)
})

onMounted(() => {
  handleGetImg(cidList.value[selectCidIndex.value].cid)
})
</script>

<template>
  <n-card
    :style="{
      width: isLargeScreen ? '60%' : '90%'
    }"
    title="壁纸设置"
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

    <div flex flex-wrap class="-ml-3 -mt-3">
      <div
        v-for="(item, index) in cidList" :key="item.cid"
        px-2 py-1 cursor-pointer bg-primary rounded-md bg-opacity-0
        hover:bg-opacity-20 hover:text-primary ml-3 mt-3
        :class="`${selectCidIndex === index ? 'bg-opacity-20 text-primary' : ''}`"
        @click="selectCidIndex = index;page = 1"
      >
        {{ item.label }}
      </div>
    </div>

    <n-spin :show="loadingList">
      <div mt-5 flex flex-wrap h-80 overflow-y-auto justify-between>
        <img
          v-for="item in imgList"
          :key="item.url"
          :src="item.url"
          alt="error"
          rounded-md object-cover mb-5 cursor-pointer hover:opacity-80
          style="width: 48%;"
          @click="emit('set', item.url)"
        >
      </div>
    </n-spin>

    <div mt-5 float-right>
      <n-pagination v-model:page="page" :page-count="pageCount" />
    </div>

    <template #footer>
      <div text-right>
        <n-button type="primary" :loading="prop.saveLoading" @click="emit('save')">
          保存配置
        </n-button>
      </div>
    </template>
  </n-card>
</template>

<style scoped>
</style>
