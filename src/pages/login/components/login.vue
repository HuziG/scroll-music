<script setup lang="ts">
import { deepClone } from '~/utils/utils.ts'

defineProps(['formLoading'])
const emit = defineEmits(['submitForm', 'changeState'])
const formValue = ref({
  email: '',
  password: '',
})

onMounted(() => {
  formValue.value.email = localStorage.user_email
})
</script>

<template>
  <div
    class="top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
    bg-white rounded-5 px-5 w-xl h-xl absolute z-20 overflow-hidden
  >
    <div my-5 text-main font-bold text-2xl>
      登录账号
    </div>

    <n-spin :show="formLoading">
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
      </n-form>
    </n-spin>

    <div text-right>
      <n-button
        quaternary
        type="primary"
        @click="$emit('changeState', {
          state: 'forget'
        })"
      >
        忘记密码？
      </n-button>
    </div>

    <n-button
      w-full mt-4
      type="primary"
      :disabled="formValue.email === '' || formValue.password === ''"
      @click="
        emit('submitForm', {
          type: 'login',
          form: deepClone(formValue)
        })
      "
    >
      确定
    </n-button>

    <div mt-3 text-gray-600>
      还没有账号?
      <n-button
        quaternary
        type="primary"
        @click="$emit('changeState', {
          state: 'register'
        })"
      >
        立即注册
      </n-button>
    </div>

    <div text-vice absolute bottom-0 py-3>
      @ 2022 滚动的曲谱
    </div>
  </div>
</template>
