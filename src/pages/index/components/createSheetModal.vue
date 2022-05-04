<script setup lang="ts">
import { useCreateSheetStore } from '~/stores/createSheet'

const emit = defineEmits('cancel') 

const sheetName = ref('')
const createSheetStore = useCreateSheetStore()

const disabledPreview = computed(() => {
  return createSheetStore.sheetArray.length === 0
})

const disabledCreate = computed(() => {
  return createSheetStore.sheetArray.length === 0 || sheetName.value === ''
})

const cancelCreate = () => {
  emit('cancel')
}

const handleUpload = () => {
  createSheetStore.$patch(state => {
    state.showUploadModal = true
  })
}
</script>

<template>
  <n-card
    style="width: 60%"
    title="创建曲谱"
    :bordered="false"
    size="huge"
    role="dialog"
    aria-modal="true"
  >
    <template #header-extra>
      <n-button :disabled="disabledPreview" strong secondary round type="primary" mr-5>
        预览
      </n-button>
      <n-button quaternary circle @click="cancelCreate">
        <template #icon>
          <div i-mdi-close text-base />
        </template>
      </n-button>
    </template>

    <n-input v-model:value="sheetName" placeholder="请输入曲谱名称" />

    <div class="-ml-5" mt-3 flex flex-wrap>
      <div v-for="(item, index) in createSheetStore.sheetArray" :key="index">
        {{index}}
      </div>

      <div 
        w-55 h-65 mt-5 ml-5 border-2 border-primary flex justify-center items-center rounded-2 text-primary
        flex-col hover:bg-opacity-5 bg-opacity-0 bg-primary transition cursor-pointer
        @click="handleUpload"
      >
        <div i-mdi-cloud-upload text-2xl text-primary />
        <div mt-2>上传曲谱</div>
      </div>
    </div>

    <template #footer>
      <div text-right>
        <n-button @click="cancelCreate">取消创建</n-button>
        <div w-3 inline-block />
        <n-button :disabled="disabledCreate" type="primary">提交</n-button>
      </div>
    </template>
  </n-card>
</template>
