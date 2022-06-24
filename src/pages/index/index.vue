<script setup lang="ts">
import SheetMusicItem from './components/sheetMusic.vue'
import CreateSheetModal from './components/createSheetModal.vue'
import UploadSheetModal from './components/uploadSheetModal.vue'
import BgImgModal from './components/bgImgModal.vue'
import BgImgModalMixins from './mixins/bgImgModal'
import TagFilter from './mixins/tagFilter'
import TagModal from './components/tagModal.vue'
import PageHeader from '~/components/PageHeader/index.vue'
import { useCreateSheetStore } from '~/stores/createSheetMusic'
import { useSheetMusicDepot } from '~/stores/sheetMusicDepot'
import { getSheets } from '~/api/sheetMusic'
import { deepClone } from '~/utils/utils'
import { useUserStore } from '~/stores/user'

const router = useRouter()
const createSheetStore = useCreateSheetStore()
const usmd = useSheetMusicDepot()
const value = ref('')
const loadSheets = ref(false)

const {
  showBgImgModal, bgImgSaveLoading, configStore,
  cancelBgImgSet, bgImgSet, bgImgSave,
} = BgImgModalMixins()

const {
  showTagModal,
  filterTag,
  handleSelectTag,
} = TagFilter({
  usmd,
})

const hideUploadModal = () => {
  createSheetStore.$patch((state) => {
    state.showUploadModal = false
  })
}

const toggleCreateModal = (value) => {
  if (useUserStore().demoUser && value) {
    window.location.href = '/login'
    return false
  }

  createSheetStore.clearStore()

  createSheetStore.$patch((state) => {
    state.showCreateModal = value
  })
}

const handleInit = async() => {
  await usmd.handleInitSheet()
  await usmd.filterSheetByTag()
}

onMounted(() => {
  configStore.requestUserConfig()
  handleInit()
})
</script>

<template>
  <div style="min-width: 600px;">
    <page-header />

    <img
      fixed top-0 left-0 w-full h-screen
      style="z-index: -1;"
      :src="configStore.userConfig.index_bg_img"
      alt="error"
    >

    <div style="max-width: 1000px;padding: 0 35px;" mx-auto my-20>
      <div flex items-center justify-between mb-2>
        <span
          text-xl :style="{
            color: configStore.userConfig.main_color
          }"
        >我的曲谱</span>

        <div>
          <n-space>
            <n-button round type="primary" @click="showTagModal = true">
              <template v-if="usmd.filterTag" #icon>
                <div :class="`${usmd.filterTag}`" text-base />
              </template>
              筛选曲谱
            </n-button>
            <n-button
              round
              type="primary"
              :disabled="usmd.sheetMusicData.length >= 20"
              @click="toggleCreateModal(true)"
            >
              <template #icon>
                <div i-mdi-plus text-base />
              </template>
              创建曲谱
            </n-button>
          </n-space>
        </div>
      </div>

      <n-spin :show="loadSheets">
        <div flex flex-wrap class="-ml-5 -mt-5">
          <div v-for="(item, index) in usmd.sheetMusicData" :key="item.id">
            <template v-if="item.show">
              <sheet-music-item :value="item" :index="index" />
            </template>
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

    <n-modal
      v-model:show="createSheetStore.showUploadModal"
      :mask-closable="true"
    >
      <upload-sheet-modal @cancel="hideUploadModal" />
    </n-modal>

    <n-modal
      v-model:show="showBgImgModal"
      :mask-closable="true"
    >
      <bg-img-modal
        :save-loading="bgImgSaveLoading"
        @cancel="cancelBgImgSet"
        @set="bgImgSet"
        @save="bgImgSave"
      />
    </n-modal>

    <n-modal
      v-model:show="showTagModal"
    >
      <tag-modal :tag="usmd.filterTag" @select="handleSelectTag" />
    </n-modal>

    <div style="height: 60px;" />

    <div
      fixed left-5 bottom-5 z-30 bg-black
      bg-opacity-60 py-1 px-3 text-white rounded-full cursor-pointer
      @click="router.push('/about')"
    >
      关于作者
    </div>

    <div
      w-10 h-10 fixed right-5 bottom-5 z-30 bg-black rounded-full bg-opacity-60
      flex items-center justify-center cursor-pointer
      @click="showBgImgModal = true"
    >
      <span i-mdi:image-area text-base text-white />
    </div>
  </div>
</template>

<style scoped>

</style>
