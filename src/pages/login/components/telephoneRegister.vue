<script setup lang="ts">
import { toRaw } from 'vue'
import { NButton, NForm, NFormItem, NInput, NSpin, useMessage } from 'naive-ui'
import { deepClone } from '~/utils/utils.ts'
import { sendSmsCode, telephoneRegister, verifySmsCode } from '~/api/user'
import SmsInput from '~/components/SmsInput/index.vue'

defineProps(['formLoading'])

const emit = defineEmits(['submitForm'])

const message = useMessage()

const formRef = ref(null)

const formValue = ref({
  phone: '',
  code: '',
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
  phone: [
    {
      required: true,
      validator(rule: FormItemRule, value: string) {
        if (!value)
          return new Error('需要填写手机号')
        else if (!/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(value))
          return new Error('手机号格式错误')

        return true
      },
      trigger: ['blur'],
    },
  ],
  code: [{
    required: true,
    message: '请输入验证码',
  }],
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

const handleValidateForm = async(e) => {
  e.preventDefault()

  formRef.value?.validate((errors) => {
    if (!errors) {
      const { phone, code } = formValue.value

      await verifySmsCode({
        phone,
        code,
      }).catch(() => {
        message.error('短信验证码错误')
      })

      emit.submitForm(formValue.value)
    }

    else { message.error('注册信息填写有误，请纠正') }
  })
}

const disabledSubmit = computed(() => {
  return Object.values(formValue.value).map(item => item.trim()).includes('')
})

watch(() => formValue.phone, (newValue, oldValue) => {
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
    <n-spin :show="formLoading">
      <n-form
        ref="formRef"
        :rules="rules"
        :label-width="80"
        :model="formValue"
        size="large"
      >
        <n-form-item label="手机号" path="phone">
          <n-input v-model:value="formValue.phone" type="number" placeholder="输入手机号">
            <template #prefix>
              <div text-base text-gray-400 i-mdi:cellphone-android />
            </template>
          </n-input>
        </n-form-item>
        <n-form-item label="短信验证码" path="code">
          <sms-input :telephone="formValue.phone" />
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
