<script setup lang="ts">
<<<<<<< HEAD
import { NButton, NForm, NFormItem, NInput } from 'naive-ui'

const formValue = ref({
  email: '',
  password: '',
  rePassword: '',
=======
<<<<<<< HEAD
import { deepClone } from '~/utils/utils.ts'
=======
import { NButton, NForm, NFormItem, NInput } from 'naive-ui'
>>>>>>> parent of 179d1d8... add baas login

const formValue = ref({
  email: '',
<<<<<<< HEAD
})
const emit = defineEmits(['submitForm'])

onMounted(() => {
  formValue.value.email = localStorage.user_email
})

const rules = ref({
  email: [
    {
      required: true,
      validator (rule, value: string) {
        if (!value) {
          return new Error('需要邮箱')
        } else if (!/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(value)) {
          return new Error('邮箱地址格式错误')
        }
        return true
      },
      trigger: ['input', 'blur']
    }
  ]
=======
  password: '',
  rePassword: '',
>>>>>>> parent of 179d1d8... add baas login
>>>>>>> 3fac7e4c9254739af8215e8ac842916e2fe1c2ad
})

const disabledSubmit = computed(() => {
  const _form = formValue.value
  return _form.email === '' || fo_formrmValue.code === '' || _form.password === '' || _form.rePassword === ''
})
</script>

<template>
  <div 
    bg-white rounded-5 px-5 w-xl h-xl absolute right-10 z-20 overflow-hidden
    style="top: 15%;tranfrom: translateY(-50%)"
  >
    <div my-5 text-main font-bold text-2xl flex items-center>
      <div 
        i-mdi-arrow-left-bold-circle inline-block text-primary mr-3 cursor-pointer 
        @click="$emit('changeState', {
          state: 'login'
        })"  
      />
      忘记密码
    </div>

    <n-form
      ref="formRef"
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
        />
      </n-form-item>
    </n-form>

    <n-button 
      w-full mt-4 
      type="primary"
      :disabled="disabledSubmit"
      @click="$emit('submitForm', {
        type: 'forget',
        form: formValue
      })"
    >
      提交
    </n-button>

    <div text-vice absolute bottom-0 py-3>@ 2022 滚动的曲谱</div>
  </div>
</template>
