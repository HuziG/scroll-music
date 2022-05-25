<script setup lang="ts">
import SheetMusicItem from './components/sheetMusic.vue'
import CreateSheetModal from './components/createSheetModal.vue'
import UploadSheetModal from './components/uploadSheetModal.vue'
import PageHeader from '~/components/PageHeader/index.vue'
import PageFooter from '~/components/PageFooter/index.vue'
import { useCreateSheetStore } from '~/stores/createSheetMusic'
import { useSheetMusicDepot } from '~/stores/sheetMusicDepot'
import { getSheets } from '~/api/sheetMusic'
import { deepClone } from '~/utils/utils'

const createSheetStore = useCreateSheetStore()
const usmd = useSheetMusicDepot()
const value = ref('')
const loadSheets = ref(false)

const hideUploadModal = () => {
  createSheetStore.$patch((state) => {
    state.showUploadModal = false
  })
}

const toggleCreateModal = (value) => {
  createSheetStore.clearStore()

  createSheetStore.$patch((state) => {
    state.showCreateModal = value
  })
}

const handleInit = async() => {
  usmd.handleInitSheet()
}

onMounted(() => {
  handleInit()
})
</script>

<template>
  <div style="min-width: 600px;">
    <page-header />

    <img fixed top-0 left-0 w-full h-screen object-cover style="z-index: -1;" src="https://infinitypro-img.infinitynewtab.com/wallpaper/anime/265.jpg?imageView2/2/w/3072/format/webp/interlace/1" alt="">

    <div style="max-width: 1000px;padding: 0 35px;" mx-auto my-5>
      <div flex items-center justify-between>
        <span text-xl>我的曲谱</span>

        <n-button
          strong round
          type="primary"
          :disabled="usmd.sheetMusicData.length >= 20"
          @click="toggleCreateModal(true)"
        >
          <template #icon>
            <div i-mdi-plus text-base />
          </template>
          创建曲谱
        </n-button>
      </div>

      <n-spin :show="loadSheets">
        <div flex flex-wrap class="-ml-5 -mt-3">
          <div v-for="(item, index) in usmd.sheetMusicData" :key="item.id">
            <sheet-music-item :value="item" :index="index" />
          </div>
        </div>

        <div v-if="usmd.sheetMusicData.length === 0" mt-35>
          <n-empty description="暂无曲谱">
            <template #icon>
              <div i-mdi:music-clef-treble text-3xl />
            </template>
          </n-empty>
        </div>
      </n-spin>
    </div>

    <n-modal
      v-model:show="createSheetStore.showCreateModal"
      :mask-closable="false"
    >
      <create-sheet-modal
        @cancel="toggleCreateModal(false)"
      />
    </n-modal>

    <n-modal v-model:show="createSheetStore.showUploadModal" :mask-closable="true">
      <upload-sheet-modal @cancel="hideUploadModal" />
    </n-modal>

    <div style="height: 60px;" />

    <!-- <PageFooter w-full fixed z-20 bottom-0 /> -->
  </div>
</template>

<style scoped>

</style>
