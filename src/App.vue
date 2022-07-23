<script setup lang="ts">
import type { GlobalThemeOverrides } from 'naive-ui'
import {
  NConfigProvider,
  NDialogProvider,
  NMessageProvider,
  NNotificationProvider,
} from 'naive-ui'
import { useUserStore } from '~/stores/user'
import { logoConsole } from '~/utils/utils'

logoConsole()

const userStore = useUserStore()
const router = useRouter()
const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#5138ED',
    primaryColorHover: '#6C59DE',
  },
}

const loginTo = () => {
  // window.location.href = '/login'

  router.replace('/login')
}

// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg

// useHead({
//   title: '滚动的曲谱',
//   meta: [
//     { name: 'description', content: 'Opinionated Vite Starter Template' },
//   ],
// })
</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-notification-provider>
      <n-message-provider>
        <n-dialog-provider>
          <RouterView />

          <div v-if="userStore.demoUser" fixed w-full left-0 bottom-0 text-white bg-primary text-center box-border py-5>
            当前为试用模式，如使用正式版，请
            <span font-bold text-white hover:opacity-60 inline-block ml-3 cursor-pointer @click="loginTo">立即登录</span>
          </div>
        </n-dialog-provider>
      </n-message-provider>
    </n-notification-provider>
  </n-config-provider>
</template>
