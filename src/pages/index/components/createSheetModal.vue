<script setup lang="ts">
import ImageClip from './imageClip.vue'
import { useMessage } from 'naive-ui'
import { useCreateSheetStore } from '~/stores/createSheetMusic'
import { useSheetMusicDepot } from '~/stores/sheetMusicDepot'
import { addSheet, editSheet } from '~/api/sheetMusic'
import { delFiles } from '~/api/base'
import { useDialog } from 'naive-ui'

const dialog = useDialog()
const emit = defineEmits('cancel') 
const message = useMessage()
const submitLoading = ref(false)
const showClipModal = ref(false)
const clipImgIndex = ref(null)
const clipImage = ref(null)

const createSheetStore = useCreateSheetStore()
const smt = useSheetMusicDepot()

const disabledCreate = computed(() => {
  return createSheetStore.sheetData.imgs.length === 0 || 
    createSheetStore.sheetData.name === ''
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
  dialog.warning({
    title: '警告',
    content: '确定删除吗？',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: () => {
      createSheetStore.$patch(state => {
        const fileId = state.sheetData.imgs[index].fileId || null

        if (fileId) delFiles([fileId])
        
        state.sheetData.imgs.splice(index, 1)
      })
    }
  })
}

const handleSubmit = () => {
  if (createSheetStore.sheetData._id) {
    handleEditSheet()
  } else {
    handleAddSheet()
  }
}

const handleEditSheet = async () => {
  submitLoading.value = true

  const data = await editSheet({
    name: createSheetStore.sheetData.name,
    imgs: toRaw(createSheetStore.sheetData.imgs),
    _id: createSheetStore.sheetData._id
  })

  submitLoading.value = false

  createSheetStore.clearStore()

  message.success('修改成功')
  
  smt.handleInitSheet()
}

const handleAddSheet = async () => {
  submitLoading.value = true
  
  const data = await addSheet({
    name: createSheetStore.sheetData.name,
    imgs: createSheetStore.sheetData.imgs
  })

  submitLoading.value = false

  createSheetStore.clearStore()

  message.success('添加成功')
  
  smt.handleInitSheet()
}

const handleShowClip = (data, index) => {
  showClipModal.value = true
  clipImage.value = { ...data, index }
  clipImgIndex.value = index
}

const handleClipConfirm = (e) => {
  createSheetStore.$patch(state => {
    const imgData = state.sheetData.imgs[clipImgIndex.value]
    state.sheetData.imgs[clipImgIndex.value] = { ...imgData, ...e }
  })

  showClipModal.value = false
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

    <n-input v-model:value="createSheetStore.sheetData.name" placeholder="请输入曲谱名称" />

    <div class="-ml-5" mt-3 flex flex-wrap>
      <div 
        class="sheet-item"
        relative w-55 h-65 mt-5 ml-5 rounded-2 border-2 border-primary overflow-hidden 
        v-for="(item, index) in createSheetStore.sheetData.imgs" :key="index">
        <div 
          absolute w-8 h-8 inline-block bg-primary text-white text-center 
          style="line-height: 2rem;border-bottom-right-radius: 0.5rem"
        >#{{index + 1}}</div>

        <n-image
          width="224"
          object-fit="cover"
          :src="item.url"
        />

        <div bg-white absolute left-2 bottom-2>
          <n-button strong secondary circle type="success" @click="handleShowClip(item, index)">
            <template #icon>
              <div i-mdi:image-edit text-base></div>
            </template>
          </n-button>
        </div>

        <div bg-white absolute right-2 bottom-2>
          <n-button strong secondary circle type="error" @click="handleDel(index)">
            <template #icon>
              <div i-mdi-close-circle text-base></div>
            </template>
          </n-button>
        </div>
      </div>

      <div 
        w-55 h-65 mt-5 ml-5 border-2 border-primary flex justify-center items-center rounded-2 text-primary
        flex-col hover:bg-opacity-5 bg-opacity-0 bg-primary transition cursor-pointer
        v-if="createSheetStore.sheetData.imgs && createSheetStore.sheetData.imgs.length <= 8"
        @click="handleUpload"
      >
        <div i-mdi-cloud-upload text-2xl text-primary />
        <div mt-2>上传曲谱</div>
      </div>

    </div>

    <div text-sm text-red font-bold mt-5>* 图片数量最多8个</div>

    <n-modal 
      v-model:show="showClipModal" 
      :mask-closable="true"
    >
      <image-clip 
        :value="clipImage" 
        @cancel="showClipModal = false" 
        @confirm="handleClipConfirm"
      />
    </n-modal>

    <template #footer>
      <div text-right>
        <n-button 
          :disabled="disabledCreate" 
          :loading="submitLoading" 
          type="primary" 
          @click="handleSubmit"
        >
          保存
        </n-button>
      </div>
    </template>
  </n-card>
</template>

<style scoped>
</style>
