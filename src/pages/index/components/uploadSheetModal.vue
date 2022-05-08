<script setup lang="ts">
import { useCreateSheetStore } from '~/stores/createSheetMusic'
import { uploadFile } from '~/api/base'
import { useMessage } from 'naive-ui'
import { baasFile } from '~/interface/base'

const emit = defineEmits('cancel') 

const message = useMessage()
const createSheetStore = useCreateSheetStore()
const submitDisabled = ref(true)
const uploadDisabled = ref(false)
const uploadLoading = ref(false)
const formValue = ref({
  uploadUrl: '',
})
const fileId = ref('')

const rules = ref({
  uploadUrl: [
    {
      required: false,
      validator (rule, value: string) {
        if (!value) {
          submitDisabled.value = true
          return new Error('需要曲谱地址')
        } else if (!/http[s]{0,1}:\/\/([\w.]+\/?)\S*/.test(value)) {
          submitDisabled.value = true
          return new Error('曲谱地址格式错误')
        }

        submitDisabled.value = false

        return true
      },
      trigger: ['input', 'blur']
    }
  ]
})

const handleSubmit = (data: {
  url: string, fileId: string
}) => {
  createSheetStore.$patch(state => {
    state.imgs.push(data)
    emit('cancel')
  })
}

const handleBeforeUpload = async ({ file }) => {
  const fileObj = file.file
  const size = fileObj.size / 1024

  if (size > 500) {
    message.error('文件超出 500kb 大小，请压缩文件再上传')
    return false
  }

  uploadDisabled.value = true
  uploadLoading.value = true

  const { data }: {
    data: baasFile
  } = await uploadFile(fileObj)

  uploadDisabled.value = false
  uploadLoading.value = false

  formValue.uploadUrl = data.path

  handleSubmit({
    url: formValue.uploadUrl,
    fileId: data.file.id
  })

  message.success('上传成功！')
}
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

    <div>填写曲谱地址</div>
    <div mt-2>
      <n-form
        ref="formRef"
        :rules="rules"
        :model="formValue"
        :show-label="false"
        size="large"
      >
        <n-form-item label="曲谱地址" path="uploadUrl">
          <n-input 
            v-model:value="formValue.uploadUrl" 
            placeholder="请输入曲谱地址 例如：https://..." 
            :clearable="true"
          />
        </n-form-item>
      </n-form>
    </div>

    <div mt-5><span text-red font-bold>或</span> 上传曲谱文件</div>
    
    <div mt-2>
      <n-spin :show="uploadLoading">
        <n-upload 
          accept="image/*" 
          :disabled="uploadDisabled"
          :show-file-list="false"
          :max="1"
          :on-before-upload="handleBeforeUpload"
        >
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
      </n-spin>
    </div>

    <template #footer>
      <div text-right>
        <n-button 
          :disabled="submitDisabled" 
          type="primary" 
          @click="handleSubmit({
            url: formValue.uploadUrl,
            fileId: ''
          })"
        >确定</n-button>
      </div>
    </template>
  </n-card>
</template>
