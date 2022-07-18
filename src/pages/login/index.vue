<script setup lang="ts">
import { useMessage, useNotification } from 'naive-ui'
import { useRouter } from 'vue-router'
import LoginPanel from './components/login.vue'
import ResigerPanel from './components/register.vue'
import ForgetPasswordPanel from './components/forgetPassword.vue'
import {
  confirmEmail,
  emailLogin,
  emailRegister,
  getPasswordByEmail,
  telephoneRegister,
} from '~/api/user.ts'
import LoginPageFooter from '~/components/LoginFooter/index.vue'
import { useUserStore } from '~/stores/user'

const router = useRouter()
const useStore = useUserStore()
const notification = useNotification()
const readImg = ref(0)
const scrollImageClass = ref('')
const panelState = ref(useStore.loginPanel) // login \ register \ forget
const message = useMessage()
const imgList = [
  'https://i0.hdslb.com/bfs/article/watermark/f2a06ed86fdcb5aa7521a803b104131933cd5091.jpg@942w_1334h_progressive.webp',
  'https://i0.hdslb.com/bfs/article/watermark/c1a2de860525792fc17ea296c4f7aeff33ed510a.jpg@942w_1334h_progressive.webp',
  'https://i0.hdslb.com/bfs/article/watermark/a6f030559777a7434e2d661f83d09cb6afdeab8f.jpg@942w_1334h_progressive.webp',
]

let interval = null

const imageOnload = () => {
  readImg.value += 1
}

watch(readImg, (value) => {
  if (value >= 3) {
    scrollImageClass.value = 'rowup'

    setTimeout(() => {
      interval = setInterval(() => {
        imgList.concat(imgList.value)
      }, 59000)
    }, 1000)
  }
})
</script>

<template>
  <div text-very-cool bg-brand-primary overflow-hidden h-screen>
    <div absolute z-20 px-10 my-5 text-white text-3xl>
      滚动的曲谱

      <div text-sm mt-5 font-normal>
        * 产品功能均免费
        <br><br>
        * 支持上传曲谱，自定义滚动速度
        <br><br>
        * 多样的速度调节，满足需求
      </div>
    </div>

    <div w-full h-full bg-black bg-opacity-80 absolute top-0 left-0 z-10 />

    <div :class="scrollImageClass">
      <img
        v-for="url in imgList"
        :key="url"
        :src="url"
        object-cover
        style="width: 100%;height: 100%;"
        alt="error"
        @load="imageOnload"
      >
    </div>

    <LoginPanel
      v-if="useStore.loginPanel === 'login'"
    />
    <RegisterPanel
      v-if="useStore.loginPanel === 'register'"
    />
    <ForgetPasswordPanel
      v-if="useStore.loginPanel === 'forget'"
    />

    <LoginPageFooter absolute z-20 bottom-5 right-2 />
  </div>
</template>

<style scoped>
@keyframes rowup {
  0% {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
  }
  100% {
      -webkit-transform: translate3d(0, -50%, 0);
      transform: translate3d(0, -50%, 0);
  }
}

.rowup{
  -webkit-animation: 60s rowup linear infinite normal;
  animation: 60s rowup linear infinite normal;
  position: relative;
}
</style>
