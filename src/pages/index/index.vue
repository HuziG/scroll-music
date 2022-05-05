<script setup lang="ts">
import PageHeader from './components/header.vue'
import SheetMusicItem from './components/sheetMusic.vue'
import CreateSheetModal from './components/createSheetModal.vue'
import UploadSheetModal from './components/uploadSheetModal.vue'
import { useCreateSheetStore } from '~/stores/createSheetMusic'
import { useSheetMusicStore } from '~/stores/sheetMusicStore'
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

const toggleCreateModal = (value) => {
  createSheetStore.$patch(state => {
    state.showCreateModal = value
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

        <n-button strong secondary round type="primary" @click="toggleCreateModal(true)"> 
          <template #icon>
            <div i-mdi-plus text-base/>
          </template>
          创建曲谱
        </n-button>
      </div>

      <n-spin :show="loadSheets">
        <div flex flex-wrap class="-ml-5">
          <div v-for="(item, index) in sheetMusicStore.sheetMusicData" :key="item.id">
            <sheet-music-item :value="item" :index="index" />
          </div>
        </div>

        <div v-if="sheetMusicStore.sheetMusicData.length === 0" mt-35>
          <n-empty description="暂无曲谱">
            <template #icon>
              <div i-mdi:music-clef-treble text-3xl></div>
            </template>
          </n-empty>
        </div>
      </n-spin>
    </div>

    <n-modal v-model:show="createSheetStore.showCreateModal" :mask-closable="false">
      <create-sheet-modal @cancel="toggleCreateModal(false)" />
    </n-modal>

    <n-modal v-model:show="createSheetStore.showUploadModal" :mask-closable="false">
      <upload-sheet-modal @cancel="hideUploadModal" />
    </n-modal>
  </div>
</template>

<style scoped>

</style>
