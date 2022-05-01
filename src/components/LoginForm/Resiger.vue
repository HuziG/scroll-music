<script setup lang="ts">
import { NButton, NForm, NFormItem, NInput } from 'naive-ui'

const formValue = ref({
  email: '',
  password: '',
  rePassword: '',
})

const disabledSubmit = computed(() => {
  const _form = formValue.value
  return _form.email === '' || _form.password === '' || _form.rePassword === ''
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
      注册账号
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
        type: 'register',
        form: formValue
      })"
    >
      提交
    </n-button>

    <div text-vice absolute bottom-0 py-3>@ 2022 滚动的曲谱</div>
  </div>
</template>
