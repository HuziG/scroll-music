<script setup lang="ts">
import { useMessage } from 'naive-ui'
import { useCreateSheetStore } from '~/stores/createSheetMusic'
import { useSheetMusicStore } from '~/stores/sheetMusicStore'
import { addSheet, editSheet } from '~/api/sheetMusic'

const emit = defineEmits('cancel') 
const message = useMessage()
const submitLoading = ref(false)
const createSheetStore = useCreateSheetStore()
const smt = useSheetMusicStore()

const disabledCreate = computed(() => {
  return createSheetStore.sheetArray.length === 0 || 
    createSheetStore.sheetName.value === ''
})

const cancelCreate = () => {
  emit('cancel')
}

const handleUpload = () => {
  createSheetStore.$patch(state => {
    state.showUploadModal = true
  })
}

const handleDel = (index) => {
  // 知晓云删除
  createSheetStore.$patch(state => {
    state.sheetArray.splice(index, 1)
  })
}

const handleSubmit = () => {
  if (createSheetStore.recordId) {
    handleEditSheet()
  } else {
    handleAddSheet()
  }
}

const handleEditSheet = async () => {
  submitLoading.value = true

  console.log(createSheetStore.recordId)
  
  const data = await editSheet({
    name: createSheetStore.sheetName.value,
    imgs: createSheetStore.sheetArray,
    recordId: createSheetStore.recordId
  })

  submitLoading.value = false

  createSheetStore.clearStore()

  message.success('修改成功')
  
  smt.handleInitSheet()
}

const handleAddSheet = async () => {
  submitLoading.value = true
  
  const data = await addSheet({
    name: createSheetStore.sheetName,
    imgs: createSheetStore.sheetArray
  })

  submitLoading.value = false

  createSheetStore.clearStore()

  message.success('添加成功')
  
  smt.handleInitSheet()
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
      <n-button quaternary circle @click="cancelCreate">
        <template #icon>
          <div i-mdi-close text-base />
        </template>
      </n-button>
    </template>

    <n-input v-model:value="createSheetStore.sheetName" placeholder="请输入曲谱名称" />

    <div class="-ml-5" mt-3 flex flex-wrap>
      <div 
        class="sheet-item"
        relative w-55 h-65 mt-5 ml-5 rounded-2 border-2 border-primary overflow-hidden 
        v-for="(url, index) in createSheetStore.sheetArray" :key="index">
        <div 
          absolute w-8 h-8 inline-block bg-primary text-white text-center 
          style="line-height: 2rem;border-bottom-right-radius: 0.5rem"
        >#{{index + 1}}</div>

        <n-image
          width="224"
          object-fit="cover"
          :src="url"
        />

        <div class="close-button" hidden bg-white absolute right-2 bottom-2 cursor-pointer>
          <div 
            i-mdi-close-circle text-red-600 text-2xl transition hover:text-3xl
            @click="handleDel(index)"  
          />
        </div>
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
        <n-button :disabled="disabledCreate" :loading="submitLoading" type="primary" @click="handleSubmit">提交</n-button>
      </div>
    </template>
  </n-card>
</template>

<style scoped>
.sheet-item:hover .close-button{
  display: inline-block;
}
</style>
