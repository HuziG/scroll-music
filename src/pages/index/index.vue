<script setup lang="ts">
import PageHeader from './components/header.vue'
import SheetMusicItem from './components/sheetMusic.vue'
import CreateSheetModal from './components/createSheetModal.vue'
import UploadSheetModal from './components/uploadSheetModal.vue'
import { useCreateSheetStore } from '~/stores/createSheet'

const value = ref('')
const showCreateModal = ref(true)

const createSheetStore = useCreateSheetStore()

const hideUploadModal = () => {
  createSheetStore.$patch(state => {
    state.showUploadModal = false
  })
}
</script>

<template>
  <div>
    <page-header />

    <div style="width: 1080px;" mx-auto my-5>
      <div flex items-center justify-between>
        <span text-xl>我的曲谱</span>

        <n-button strong secondary round type="primary" @click="showCreateModal = true"> 
          <template #icon>
            <div i-mdi-plus text-base/>
          </template>
          创建曲谱
        </n-button>
      </div>

      <div flex flex-wrap class="-ml-5">
        <sheet-music-item />
      </div>
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
