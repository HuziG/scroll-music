<script setup lang="ts">
import { toRaw } from 'vue'
import { NButton, NForm, NFormItem, NInput, NSpin, useMessage } from 'naive-ui'
import { deepClone } from '~/utils/utils.ts'

defineProps(['formLoading'])
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
          return new Error('需要邮箱')
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

const disabledSubmit = computed(() => {
  const _form = formValue.value
  return _form.email === '' || _form.password === '' || _form.rePassword === ''
})

const handleValidateForm = (e) => {
  e.preventDefault()
  formRef.value?.validate((errors) => {
    if (!errors) {
      emit('submitForm', {
        type: 'register',
        form: deepClone(formValue.value),
      })
    }
    else {
      message.error('注册信息填写有误，请纠正')
    }
  })
}
</script>

<template>
  <div
    class="top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
    bg-white rounded-5 px-5 w-xl h-xl absolute z-20 overflow-hidden
  >
    <div my-5 text-main font-bold text-2xl flex items-center>
      <div
        i-mdi-arrow-left-bold-circle inline-block text-primary mr-3 cursor-pointer
        @click="$emit('changeState', {
          state: 'login'
        })"
      />
      注册账号
    </div>

    <n-spin :show="formLoading">
      <n-form
        ref="formRef"
        :rules="rules"
        :label-width="80"
        :model="formValue"
        size="large"
      >
        <n-form-item label="邮箱" path="email">
          <n-input v-model:value="formValue.email" placeholder="输入邮箱" />
        </n-form-item>
        <n-form-item label="密码" path="password">
          <n-input
            v-model:value="formValue.password"
            type="password"
            show-password-on="mousedown"
            placeholder="输入密码"
          />
        </n-form-item>
        <n-form-item label="再次确认密码" path="rePassword">
          <n-input
            v-model:value="formValue.rePassword"
            type="password"
            show-password-on="mousedown"
            placeholder="输入确认密码"
            @keydown.enter="handleValidateForm"
          />
        </n-form-item>
      </n-form>
    </n-spin>

    <n-button
      w-full mt-4
      type="primary"
      :disabled="disabledSubmit"
      @click="handleValidateForm"
    >
      提交
    </n-button>

    <div text-vice absolute bottom-0 py-3>
      @ 2022 滚动的曲谱
    </div>
  </div>
</template>
