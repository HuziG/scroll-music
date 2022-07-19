<script setup lang="ts">
import { NButton, NForm, NFormItem, NInput, NSpin } from 'naive-ui'
import { getPasswordByEmail } from '~/api/user'
import { deepClone } from '~/utils/utils.ts'
import { useUserStore } from '~/stores/user'

const useStore = useUserStore()
const emit = defineEmits(['submitForm', 'changeState'])
const buttonLoading = ref(false)
const formRef = ref(null)
const formValue = ref({
  email: '',
})

const rules = ref({
  email: [
    {
      required: true,
      validator(rule, value: string) {
        if (!value)
          return new Error('需要邮箱')
        else if (!/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(value))
          return new Error('邮箱地址格式错误')

        return true
      },
      trigger: ['input', 'blur'],
    },
  ],
})

const handleValidateForm = (e) => {
  e.preventDefault()

  formRef.value?.validate((errors) => {
    if (!errors) {
      await getPasswordByEmail({ email: payload.email })

      buttonLoading.value = true

      notification.info({
        content: '邮件已发送',
        meta: '请登录邮箱地址，找回密码',
      })

      buttonLoading.value = false

      useStore.loginPanel = 'login'
    }
    else {
      message.error('注册信息填写有误，请纠正')
    }
  })
}
</script>

<template>
  <div>
    <n-form
      ref="formRef"
      :rules="rules"
      :label-width="80"
      :model="formValue"
      size="large"
    >
      <n-form-item label="邮箱" path="email">
        <n-input
          v-model:value="formValue.email"
          placeholder="输入注册邮箱"
          @keydown.enter="handleValidateForm"
        />
      </n-form-item>
    </n-form>

    <n-button
      w-full mt-4
      type="primary"
      :loading="buttonLoading"
      @click="handleValidateForm"
    >
      提交
    </n-button>
  </div>
</template>
