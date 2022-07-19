<script lang="ts">
import { telephoneLogin, telephoneRegister } from '~/api/user'
import { useUserStore } from '~/stores/user'

const useStore = useUserStore()

const handleGetTelForm = () => {
  await telephoneRegister({ phone: form.telephone, password: form.password })

  localStorage.user_account = form.telephone

  await telephoneLogin({ phone: form.telephone, password: form.password })

  notification.success({
    content: '手机号注册成功，已自动登录',
  })

  // useStore.loginPanel = 'login'
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
        @click="useStore.loginPanel = 'login'"
      />
      注册账号
    </div>

    <n-tabs type="line" animated>
      <n-tab-pane name="telephone" tab="手机注册">
        <telephone-register @submitForm="handleGetTelForm" />
      </n-tab-pane>
      <n-tab-pane name="email" tab="验证码注册">
        <email-register />
      </n-tab-pane>
    </n-tabs>

    <div text-vice absolute bottom-0 py-3>
      @ 2022 滚动的曲谱
    </div>
  </div>
</template>
