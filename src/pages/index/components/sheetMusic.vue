<script setup lang="ts">
import { useCreateSheetStore } from '~/stores/createSheetMusic'
import { useSheetMusicStore } from '~/stores/sheetMusicStore'
import { useMessage } from 'naive-ui'
import { delSheet } from '~/api/sheetMusic'

const props = defineProps(['value', 'index'])
const message = useMessage()
const menuOptions = [
  { label: '编辑', value: 'edit' },
  { label: '删除', value: 'del' },
]

const createSheetStore = useCreateSheetStore()
const sheetMusicStore = useSheetMusicStore()
const selectValue = ref('')

const timeFormat = computed(() => {
  const date = new Date(props.value.created_at * 1000)

  return `${date.getMonth() + 1}月${date.getDate()}日`
})

watch(selectValue, async (newValue) => {
  switch (newValue) {
    case 'edit':
      createSheetStore.$patch(state => {
        state.recordId = props.value._id
        state.sheetName = props.value.name
        state.sheetArray = props.value.imgs
        state.showCreateModal = true
      })
      break;
    case 'del':
      await delSheet({
        recordId: props.value._id
      })    

      message.success('删除成功')

      sheetMusicStore.$patch(state => {
        state.sheetMusicData.splice(props.index, 1)
      })
      break;
  }
})
</script>

<template>
  <div style="background-color: #F5F5F7;" inline-block rounded-2 py-2 px-3 mt-3 ml-5>
    <img style="width: 221px" :src="props.value.imgs[0]" rounded-1 alt="error">

    <div flex items-center justify-between>
      <div>
        <div text-base>{{ props.value.name }}</div>
        <div text-xs text-vice>创建时间：{{ timeFormat }}</div>
      </div>

      <n-popselect v-model:value="selectValue" :options="menuOptions" trigger="click">
        <n-button strong secondary circle>
          <template #icon>
            <div i-mdi-pencil-outline text-base/>
          </template>
        </n-button>
      </n-popselect>
    </div>
  </div>
</template>

<style scoped>

</style>
