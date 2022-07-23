<script setup>
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()
const router = useRouter()

const loginTo = () => {
  // window.location.href = '/login'

  router.replace('/login')
}
</script>

<template>
  <div v-if="userStore.demoUser" class="wrapper" fixed w-full left-0 bottom-0 text-white text-center box-border py-5>
    当前为试用模式，如使用正式版，请
    <span font-bold text-white hover:opacity-60 inline-block ml-3 cursor-pointer @click="loginTo">立即登录</span>
  </div>
</template>

<style scoped>
.wrapper {
  background: #642b73;  /* fallback for old browsers */ background: -webkit-linear-gradient(to right, rgb(100, 43, 115), rgb(198, 66, 110));  /* Chrome 10-25, Safari 5.1-6 */ background: linear-gradient(to right, rgb(100, 43, 115), rgb(198, 66, 110)); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
