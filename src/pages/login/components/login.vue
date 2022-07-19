<script setup lang="ts">
import TelephoneLogin from './telephoneLogin.vue'
import AccountLogin from './accountLogin.vue'
import { deepClone } from '~/utils/utils.ts'

const props = defineProps(['formLoading'])

const emit = defineEmits(['changeState'])

const formValue = ref({
  account: '',
  password: '',
})

const loginMode = ref('telephone')

/**
 * demo模式
 */
const enterDemo = () => {
  const href = window.location.href
  window.location.href = `https://${window.location.host}/#/?user=demo`
}

onMounted(() => {
  formValue.value.account = localStorage.user_account
})
</script>

<template>
  <div
    class="top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
    bg-white rounded-5 px-5 w-xl h-xl absolute z-20 overflow-hidden
  >
    <div flex items-center justify-between my-5>
      <div text-main font-bold text-2xl>
        登录账号
      </div>
      <n-button quaternary type="primary" @click="enterDemo">
        跳过登录，看看案例
      </n-button>
    </div>

    <telephone-login v-if="loginMode === 'telephone'" />
    <account-login v-if="loginMode === 'account'" />

    <div flex items-center justify-between my-4>
      <div text-gray-600>
        还没有账号?
        <n-button
          quaternary
          type="primary"
          @click="useStore.loginPanel = 'register'"
        >
          立即注册
        </n-button>
      </div>

      <n-button
        quaternary
        type="primary"
        @click="useStore.loginPanel = 'forget'"
      >
        忘记密码？
      </n-button>
    </div>

    <div my-3 flex items-center justify-around>
      <n-button primary strong @click="loginMode= 'telephone'">
        <template #icon>
          <div text-base i-mdi:cellphone-android />
        </template>
        手机号快速登录
      </n-button>

      <n-button primary strong @click="loginMode = 'account'">
        <template #icon>
          <div text-base i-mdi:email />
        </template>
        账号密码登录
      </n-button>
    </div>

    <div text-vice absolute bottom-0 py-3>
      @ 2022 滚动的曲谱
    </div>
  </div>
</template>
