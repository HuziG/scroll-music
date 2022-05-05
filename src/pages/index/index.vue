<script setup lang="ts">
import PageHeader from './components/header.vue'
import SheetMusicItem from './components/sheetMusic.vue'
import CreateSheetModal from './components/createSheetModal.vue'
import UploadSheetModal from './components/uploadSheetModal.vue'
import { useCreateSheetStore } from '~/stores/createSheet'
import { useSheetMusicStore } from '~/stores/sheetMusic'
import { getSheets } from '~/api/sheetMusic'

const createSheetStore = useCreateSheetStore()
const sheetMusicStore = useSheetMusicStore()
const value = ref('')
const showCreateModal = ref(false)
const loadSheets = ref(false)

const hideUploadModal = () => {
  createSheetStore.$patch(state => {
    state.showUploadModal = false
  })
}

const handleInit = async () => {
  sheetMusicStore.handleInitSheet()
}

onMounted(() => {
  handleInit()
})
</script>

<template>
  <div style="min-width: 600px;">
    <page-header />

    <div style="max-width: 1000px;padding: 0 35px;" mx-auto my-5>
      <div flex items-center justify-between>
        <span text-xl>我的曲谱</span>

        <n-button strong secondary round type="primary" @click="showCreateModal = true"> 
          <template #icon>
            <div i-mdi-plus text-base/>
          </template>
          创建曲谱
        </n-button>
      </div>

      <n-spin :show="loadSheets">
        <div flex flex-wrap class="-ml-5">
          <sheet-music-item />
        </div>
      </n-spin>
    </div>

    <n-modal v-model:show="showCreateModal" :mask-closable="false">
      <create-sheet-modal @cancel="showCreateModal = false" />
    </n-modal>

    <n-modal v-model:show="createSheetStore.showUploadModal" :mask-closable="false">
      <upload-sheet-modal @cancel="hideUploadModal" />
    </n-modal>
  </div>
</template>

<style scoped>

</style>
