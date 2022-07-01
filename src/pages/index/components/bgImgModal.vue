<script setup lang="ts">
import { getBgImgList } from '~/api/sheetMusic'
import { useConfigStore } from '~/stores/config'
import useMediaSize from '~/mixins/useMediaSize'

const prop = defineProps(['saveLoading'])
const emit = defineEmits(['cancel', 'set', 'save'])

const { isLargeScreen } = useMediaSize()

const selectTypeIndex = ref(1)

const typeList = ref([
  { label: '纹路', type: 1 },
  { label: '渐变', type: 2 },
  { label: '纯色', type: 3 },
])

const cssBgList = ref([])
const configStore = useConfigStore()

const cssBgData = {
  1: [
    'line-one', 'line-two', 'line-three', 'line-four',
    'line-five', 'line-six', 'line-seven', 'line-eight',
    'line-nine',
  ],
  2: [
    'active-gradualcolor-one', 'active-gradualcolor-two',
    'linear-gradient-one', 'linear-gradient-two', 'linear-gradient-three',
    'linear-gradient-four', 'linear-gradient-five', 'linear-gradient-six',
    'linear-gradient-seven',
  ],
  3: [
    'color-one', 'color-two', 'color-three', 'color-four', 'color-five',
    'color-six', 'color-seven', 'color-eight', 'color-nine', 'color-ten',
  ],
}

const handleGetImg = async(type) => {
  cssBgList.value = cssBgData[type]
}

const mainColorToggle = () => {
  const color = configStore.userConfig.main_color
  configStore.userConfig.main_color = color === '#333333' ? '#ffffff' : '#333333'
}

const clearBgCss = () => {
  configStore.userConfig.main_color = '#333333'
  emit('set', '')
}

watch(selectTypeIndex, (newValue) => {
  handleGetImg(typeList.value[selectTypeIndex.value].type)
})

onMounted(() => {
  handleGetImg(typeList.value[selectTypeIndex.value].type)
})
</script>

<template>
  <n-card
    :style="{
      width: isLargeScreen ? '60%' : '90%',
    }"
    title="底色设置"
    :bordered="false"
    size="huge"
    role="dialog"
    aria-modal="true"
  >
    <template #header-extra>
      <n-button quaternary circle @click="emit('cancel')">
        <template #icon>
          <div i-mdi-close text-base />
        </template>
      </n-button>
    </template>

    <div flex flex-wrap pb-3 class="-ml-3 -mt-3">
      <div
        v-for="(item, index) in typeList" :key="item.type"
        px-2 py-1 cursor-pointer bg-primary rounded-md bg-opacity-0
        hover:bg-opacity-20 hover:text-primary ml-3 mt-3
        :class="`${selectTypeIndex === index ? 'bg-opacity-20 text-primary' : ''}`"
        @click="selectTypeIndex = index;"
      >
        {{ item.label }}
      </div>
    </div>

    <div flex flex-wrap h-90 overflow-y-auto justify-between pr-5>
      <div
        v-for="item in cssBgList"
        :key="item"
        relative inline-block mt-5 rounded-xl overflow-hidden cursor-pointer
        hover:opacity-70
        style="width: 30%;height: 170px;"
        @click="emit('set', item)"
      >
        <!-- <span
          inline-block py-1 px-1 text-white text-xs rounded-md
          bg-primary absolute top-2 right-3
        >
          动态
        </span> -->
        <div :class="item" w-full h-full />
      </div>
    </div>

    <template #footer>
      <div flex items-center justify-between>
        <div flex items-center>
          文字颜色
          <span
            text-xl ml-3 w-5 h-5 cursor-pointer box-border border-2 border-primary :style="{
              backgroundColor: configStore.userConfig.main_color
            }"
            @click="mainColorToggle"
          />
        </div>

        <n-space>
          <n-button
            type="primary"
            @click="clearBgCss"
          >
            清除底色
          </n-button>
          <n-button
            type="primary"
            :loading="prop.saveLoading"
            @click="emit('save')"
          >
            保存配置
          </n-button>
        </n-space>
      </div>
    </template>
  </n-card>
</template>

<style scoped>
</style>
