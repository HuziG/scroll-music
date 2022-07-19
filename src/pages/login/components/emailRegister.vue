<script setup lang="ts">
import { toRaw } from 'vue'
import { NButton, NForm, NFormItem, NInput, NSpin, useMessage } from 'naive-ui'
import { deepClone } from '~/utils/utils.ts'
import { confirmEmail, emailRegister, useUser } from '~/api/user'
import { useUserStore } from '~/stores/user'

defineProps(['formLoading'])

const useStore = useUserStore()
const emit = defineEmits(['submitForm', 'changeState'])
const message = useMessage()
const formRef = ref(null)
const formValue = ref({
  email: '',
  password: '',
  rePassword: '',
})
const validatePasswordStartWith = (rule, value) => {
  return (
    !!formValue.value.password
    && formValue.value.password.startsWith(value)
    && formValue.value.password.length >= value.length
  )
}
const rules = ref({
  email: [
    {
      required: true,
      validator(rule: FormItemRule, value: string) {
        if (!value)
          return new Error('需要填写邮箱')
        else if (!/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(value))
          return new Error('邮箱地址格式错误')

        return true
      },
      trigger: ['blur'],
    },
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
    },
  ],
  rePassword: [
    {
      required: true,
      message: '请再次输入密码',
      trigger: ['input', 'blur'],
    },
    {
      validator: validatePasswordStartWith,
      message: '两次密码输入不一致',
      trigger: ['blur'],
    },
  ],
})

const handleValidateForm = (e) => {
  e.preventDefault()
  formRef.value?.validate((errors) => {
    if (!errors) {
      await emailRegister({ email: form.email, password: form.password })

      localStorage.user_account = form.email

      await confirmEmail()

      notification.success({
        content: '邮箱注册成功',
        meta: '请登录注册邮箱，验证账号并使用，10分钟有效',
      })

      useStore.loginPanel = 'login'
    }
    else {
      message.error('注册信息填写有误，请纠正')
    }
  })
}

const disabledSubmit = computed(() => {
  return Object.values(formValue.value).map(item => item.trim()).includes('')
})

</script>

<template>
  <div>
    <n-spin :show="formLoading">
      <n-form
        ref="formRef"
        :rules="rules"
        :label-width="80"
        :model="formValue"
        size="large"
      >
        <n-form-item label="邮箱" path="email">
          <n-input v-model:value="formValue.email" placeholder="输入邮箱">
            <template #prefix>
              <div text-base text-gray-400 i-mdi:email />
            </template>
          </n-input>
        </n-form-item>
        <n-form-item label="密码" path="password">
          <n-input
            v-model:value="formValue.password"
            type="password"
            show-password-on="mousedown"
            placeholder="输入密码"
          >
            <template #prefix>
              <div text-base text-gray-400 i-mdi:key />
            </template>
          </n-input>
        </n-form-item>
        <n-form-item label="再次确认密码" path="rePassword">
          <n-input
            v-model:value="formValue.rePassword"
            type="password"
            show-password-on="mousedown"
            placeholder="输入确认密码"
            @keydown.enter="handleValidateForm"
          >
            <template #prefix>
              <div text-base text-gray-400 i-mdi:key />
            </template>
          </n-input>
        </n-form-item>
      </n-form>
    </n-spin>

    <div text-gray-500 text-sm mt-1>
      邮箱注册，需要登录注册进行邮箱验证操作才可以使用账号
    </div>

    <n-button
      w-full mt-4
      type="primary"
      :disabled="disabledSubmit"
      @click="handleValidateForm"
    >
      立即注册
    </n-button>
  </div>
</template>
