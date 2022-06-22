<script setup lang="ts">
import { useMessage } from 'naive-ui'
import TagModal from './tagModal.vue'
import { useCreateSheetStore } from '~/stores/createSheetMusic'
import { useSheetMusicDepot } from '~/stores/sheetMusicDepot'
import { useSheetDetailStore } from '~/stores/sheetDetail'
import { delSheet } from '~/api/sheetMusic'
import { deepClone } from '~/utils/utils'

const props = defineProps(['value', 'index'])
const message = useMessage()
const menuOptions = [
  { label: '标签', value: 'tag' },
  { label: '编辑', value: 'edit' },
  { label: '删除', value: 'del' },
]
const router = useRouter()
const createSheetStore = useCreateSheetStore()
const sheetDetailStore = useSheetDetailStore()
const usmd = useSheetMusicDepot()
const selectValue = ref('')
const showTagModal = ref(false)

const timeFormat = computed(() => {
  const date = new Date(props.value.created_at * 1000)

  return `${date.getMonth() + 1}月${date.getDate()}日`
})

const handleToScroll = () => {
  sheetDetailStore.dispatchSheet(props.value)
  router.push('/scroll')
}

/**
 * 选中标签
 */
const selectTag = (tag) => {
  showTagModal.value = false
  usmd.setSheetTag(tag, props.index)
}

watch(selectValue, async(newValue) => {
  selectValue.value = ''
  switch (newValue) {
    case 'edit':
      createSheetStore.$patch((state) => {
        state.sheetData = deepClone(props.value)
        state.showCreateModal = true
      })
      break
    case 'del':
      await usmd.delSheetData(props.value)

      message.success('删除成功')

      usmd.$patch((state) => {
        state.sheetMusicData.splice(props.index, 1)
      })
      break
    case 'tag':
      showTagModal.value = true
      break
  }
})
</script>

<template>
  <div
    class="hvr-grow-shadow"
    style="background-color: #F5F5F7;"
    relative inline-block rounded-2 py-2 px-3 mt-7 ml-5
  >
    <div :class="`${props.value.tag} -top-2 -right-1`" absolute text-3xl />

    <img
      style="width: 210px;height: 300px;"
      :src="props.value.imgs[0].url"
      rounded-1 cursor-pointer
      alt="error"
      @click="handleToScroll"
    >

    <div flex items-center justify-between>
      <div>
        <div text-base>
          {{ props.value.name }}
        </div>
        <div text-xs text-vice>
          创建时间：{{ timeFormat }}
        </div>
      </div>

      <n-popselect v-model:value="selectValue" :options="menuOptions" trigger="click">
        <n-button strong secondary circle>
          <template #icon>
            <div i-mdi-pencil-outline text-base />
          </template>
        </n-button>
      </n-popselect>
    </div>

    <n-modal
      v-model:show="showTagModal"
    >
      <tag-modal @select="selectTag" />
    </n-modal>
  </div>
</template>

<style scoped>
.hvr-grow-shadow {
  display: inline-block;
  vertical-align: middle;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-property: box-shadow, transform;
  transition-property: box-shadow, transform;
}
.hvr-grow-shadow:hover, .hvr-grow-shadow:focus, .hvr-grow-shadow:active {
  box-shadow: 0 10px 10px -10px rgba(0, 0, 0, 0.5);
  -webkit-transform: scale(1.05);
  transform: scale(1.05);
}
</style>
