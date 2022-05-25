<script setup lang="ts">
const emit = defineEmits(['cancel', 'set', 'save'])
const cid = emit(9)
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
  { label: '每日精选', cid: 1 },
])
const imgList = ref([])

const handleSave = () => {

}

const handleGetImg = async() => {
  const { data } = await getBgImgList(cid.value)
  imgList.value = data
}

onMounted(() => {
  handleGetImg()
})
</script>

<template>
  <n-card
    style="width: 60%"
    title="更换壁纸"
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

    <template #footer>
      <div text-right>
        <n-button
          :disabled="disabledCreate"
          :loading="submitLoading"
          type="primary"
          @click="handleSave"
        >
          保存
        </n-button>
      </div>
    </template>
  </n-card>
</template>

<style scoped>
</style>
