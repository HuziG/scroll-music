<script setup lang="ts">
import { useDialog, useMessage } from 'naive-ui'
import ImageClip from './imageClip.vue'
import { useCreateSheetStore } from '~/stores/createSheetMusic'
import { useSheetMusicDepot } from '~/stores/sheetMusicDepot'
import { addSheet, editSheet } from '~/api/sheetMusic'
import { delFiles } from '~/api/base'
import useMediaSize from '~/mixins/useMediaSize'

const { isLargeScreen } = useMediaSize()
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
  return createSheetStore.sheetData.imgs.length === 0
    || createSheetStore.sheetData.name === ''
})

const cancelCreate = () => {
  emit('cancel')
}

const handleUpload = () => {
  createSheetStore.$patch((state) => {
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
      createSheetStore.$patch((state) => {
        const fileId = state.sheetData.imgs[index].fileId || null

        if (fileId)
          delFiles([fileId])

        state.sheetData.imgs.splice(index, 1)
      })
    },
  })
}

const handleEditSheet = async() => {
  submitLoading.value = true

  const data = await editSheet({
    name: createSheetStore.sheetData.name,
    imgs: toRaw(createSheetStore.sheetData.imgs),
    _id: createSheetStore.sheetData._id,
  })

  submitLoading.value = false

  createSheetStore.clearStore()
  createSheetStore.showCreateModal = false

  message.success('修改成功')

  smt.handleInitSheet()
}

const handleAddSheet = async() => {
  submitLoading.value = true

  const data = await addSheet({
    name: createSheetStore.sheetData.name,
    imgs: createSheetStore.sheetData.imgs,
  })

  submitLoading.value = false

  createSheetStore.clearStore()
  createSheetStore.showCreateModal = false

  message.success('添加成功')

  smt.handleInitSheet()
}

const handleSubmit = () => {
  if (createSheetStore.sheetData._id)
    handleEditSheet()
  else
    handleAddSheet()
}

const handleShowClip = (data, index) => {
  showClipModal.value = true
  clipImage.value = { ...data, index }
  clipImgIndex.value = index
}

const handleClipConfirm = (e) => {
  createSheetStore.$patch((state) => {
    const imgData = state.sheetData.imgs[clipImgIndex.value]
    state.sheetData.imgs[clipImgIndex.value] = { ...imgData, ...e }
  })

  showClipModal.value = false
}
</script>

<template>
  <n-card
    :style="{
      width: isLargeScreen ? '60%' : '90%'
    }"
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
        v-for="(item, index) in createSheetStore.sheetData.imgs"
        :key="index" class="sheet-item"
        relative w-45 h-55 lg:w-55 lg:h-65 mt-5 ml-5 rounded-2 border-2
        border-primary overflow-hidden
      >
        <div
          absolute w-8 h-8 inline-block bg-primary text-white text-center
          style="line-height: 2rem;border-bottom-right-radius: 0.5rem"
        >
          #{{ index + 1 }}
        </div>

        <n-image
          width="224"
          object-fit="cover"
          :src="item.url"
        />

        <div bg-white absolute left-2 bottom-2>
          <n-button strong secondary circle type="success" @click="handleShowClip(item, index)">
            <template #icon>
              <div i-mdi:image-edit text-base />
            </template>
          </n-button>
        </div>

        <div bg-white absolute right-2 bottom-2>
          <n-button strong secondary circle type="error" @click="handleDel(index)">
            <template #icon>
              <div i-mdi-close-circle text-base />
            </template>
          </n-button>
        </div>
      </div>

      <div
        v-if="createSheetStore.sheetData.imgs && createSheetStore.sheetData.imgs.length <= 8"
        w-45 h-55 lg:w-55 lg:h-65 mt-5 ml-5 border-2 border-primary flex justify-center items-center rounded-2
        text-primary flex-col hover:bg-opacity-5 bg-opacity-0 bg-primary transition
        cursor-pointer
        @click="handleUpload"
      >
        <div i-mdi-cloud-upload text-2xl text-primary />
        <div mt-2>
          上传曲谱
        </div>
      </div>
    </div>

    <div text-xs text-red-500 font-bold mt-5>
      <div>
        * 一份曲谱可容纳图片数量最多8个
      </div>
      <div mt-2>
        * 曲谱图片有大量留白会影响滚动效果，上传成功后可进行剪裁
      </div>
    </div>

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
