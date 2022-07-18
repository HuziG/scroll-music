<script setup lang="ts">
import { toRaw } from 'vue'
import { NButton, NForm, NFormItem, NInput, NSpin, useMessage } from 'naive-ui'
import { deepClone } from '~/utils/utils.ts'
import { loginWithSmsVerificationCode, sendSmsCode, telephoneRegister, verifySmsCode } from '~/api/user'
import SmsInput from '~/components/SmsInput/index.vue'

const message = useMessage()
const formRef = ref(null)
const formValue = ref({
  telephone: '',
  code: '',
})

/**
 * 登录
 */
const handleValidateForm = async(e) => {
  const { telephone, code } = formValue.value

  e.preventDefault()

  formRef.value?.validate((errors) => {
    if (!errors)
      loginWithSmsVerificationCode(telephone, code)
    else
      message.error('登录信息填写有误，请纠正')
  })
}

const disabledSubmit = computed(() => {
  return Object.values(formValue.value).map(item => item.trim()).includes('')
})

watch(() => formValue.telephone, (newValue, oldValue) => {
  if (newValue.length < oldValue.length)
    return false

  if (value.length === 4)
    fromValue.value = `${value.slice(0, 3)} ${value.slice(3, value.length)}`

  if (value.length === 9)
    fromValue.value = `${value.slice(0, 4)}${value.slice(4, 8)} ${value.slice(8, value.length)}`
})
</script>

<template>
  <div>
    <n-form
      ref="formRef"
      :label-width="80"
      :model="formValue"
      size="large"
    >
      <n-form-item label="手机号" path="telephone">
        <n-input v-model:value="formValue.telephone" placeholder="输入手机号">
          <template #prefix>
            <div text-base mr-2 text-gray-400 i-mdi:cellphone-android />
          </template>
        </n-input>
      </n-form-item>
      <n-form-item label="短信验证码" path="code">
        <sms-input :telephone="formValue.telephone" />
      </n-form-item>
    </n-form>

    <n-button
      w-full mt-4
      type="primary"
      :disabled="disabledSubmit"
      @click="handleValidateForm"
    >
      登录
    </n-button>
  </div>
</template>
