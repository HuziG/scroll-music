<script setup lang="ts">
import { useCreateSheetStore } from '~/stores/createSheet'

const emit = defineEmits('cancel') 

const createSheetStore = useCreateSheetStore()
</script>

<template>
  <n-card
    style="width: 40%"
    title="上传曲谱"
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

    <div>通过填写曲谱地址上传</div>
    <div mt-2>
      <n-input v-model:value="url" placeholder="请输入曲谱地址" />
    </div>

    <div mt-5>通过曲谱文件上传</div>
    <div mt-2>
      <n-upload action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f">
        <n-upload-dragger>
          <div style="margin-bottom: 12px;" text-center>
            <div i-mdi-cloud-upload text-3xl inline-block/>
          </div>
          <n-text style="font-size: 16px">
            点击或者拖动文件到该区域来上传
          </n-text>
          <n-p depth="3" style="margin: 8px 0 0 0">
            <div>
              请不要上传敏感数据，请上传合法文件，请上传曲谱图片，仅支持图片上传
            </div>
          </n-p>
        </n-upload-dragger>
      </n-upload>
    </div>

    <template #footer>
      <div text-right>
        <n-button :disabled="disabledCreate" type="primary">确定</n-button>
      </div>
    </template>
  </n-card>
</template>
