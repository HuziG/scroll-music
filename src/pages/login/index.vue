<script setup lang="ts">
import { useMessage, useNotification } from 'naive-ui'
import { useRouter } from 'vue-router'
import LoginPanel from './components/login.vue'
import ResigerPanel from './components/resiger.vue'
import ForgetPasswordPanel from './components/forgetPassword.vue'
import {
  confirmEmail,
  emailLogin,
  emailRegister,
  getPasswordByEmail,
} from '~/api/user.ts'
import LoginPageFooter from '~/components/LoginFooter/index.vue'

let imgIndex = false
const router = useRouter()
const FORM_STATE = {
  LOGIN: 'login',
  REGISTER: 'register',
  FORGET: 'forget',
}
const formLoading = ref(false)
const panelState = ref(FORM_STATE.LOGIN) // login \ register \ forget
const notification = useNotification()
const message = useMessage()
const imgList = [
  'https://tse1-mm.cn.bing.net/th/id/R-C.ff17f6bba0eb6277269425c2993ab43b?rik=wia1VgFpHvKelg&riu=http%3a%2f%2fwww.ccguitar.cn%2fpu%2f2017%2f2%2f20%2f92216_74616%2f1.gif&ehk=7cNDVcMhmvR3WfCfrEbKP%2fqLqq495236YQlwgPe7qxU%3d&risl=&pid=ImgRaw&r=0',
  'https://tse1-mm.cn.bing.net/th/id/R-C.eafdb41966a66e53ef04d09fa96bba35?rik=YIvINuvLwG9y7g&riu=http%3a%2f%2fimg.wanjita.com%2fueditor%2fphp%2fupload%2fimage%2f20200824%2f1598282933997765.jpg&ehk=QsHNUtOwrtH4rnzQnQI5uQcTkC3hQ1tL9CwIDWfyoms%3d&risl=&pid=ImgRaw&r=0',
]

let interval = null

const handleChangeState = ({ state }) => {
  panelState.value = state
}

const handleSubmitForm = async({ type, form }) => {
  formLoading.value = true
  try {
    switch (type) {
      case FORM_STATE.LOGIN:
        emailLogin({ email: form.email, password: form.password }).then(({ _email_verified }) => {
          if (_email_verified)
            message.success('登录成功！')
          else
            message.error('邮箱未验证，登录失败！')

          formLoading.value = false

          localStorage.user_email = form.email

          setTimeout(() => {
            router.replace('/')
          }, 500)
        })
        break
      case FORM_STATE.REGISTER:
        await emailRegister({ email: form.email, password: form.password })
        localStorage.user_email = form.email
        formLoading.value = false
        panelState.value = FORM_STATE.LOGIN
        await confirmEmail()
        notification.success({
          content: '注册成功',
          meta: '请登录注册邮箱，验证账号并使用',
        })
        break
      case FORM_STATE.FORGET:
        await getPasswordByEmail({ email: form.email })
        formLoading.value = false
        notification.info({
          content: '邮件已发送',
          meta: '请登录邮箱地址，找回密码',
        })

        break
    }
  }
  catch (error) {
    message.error(typeof error === 'object' ? JSON.stringify(error) : error)
    formLoading.value = false
  }
}

onMounted(() => {
  setTimeout(() => {
    interval = setInterval(() => {
      imgList.push(imgList[imgIndex ? 0 : 1])
      imgIndex = !imgIndex
    }, 59000)
  }, 1000)
})
</script>

<template>
  <div text-very-cool bg-brand-primary overflow-hidden h-screen>
    <div absolute z-20 px-10 my-5 text-white text-3xl>
      滚动的曲谱

      <div text-sm mt-5 font-normal>
        * 产品功能全部免费
        <br><br>
        * 支持上传曲谱，自定义滚动速度
        <br><br>
        * 多样的速度调节，满足需求
        <br><br>
        * 个人账号所持曲谱数量不限量
      </div>
    </div>

    <div w-full h-full bg-black bg-opacity-80 absolute top-0 left-0 z-10 />

    <div class="rowup">
      <img
        v-for="url in imgList"
        :key="url"
        :src="url"
        object-cover
        style="width: 100%;height: 100%;"
        alt="error"
      >
    </div>

    <LoginPanel
      v-if="panelState === FORM_STATE.LOGIN"
      :form-loading="formLoading"
      @change-state="handleChangeState"
      @submit-form="handleSubmitForm"
    />
    <ResigerPanel
      v-if="panelState === FORM_STATE.REGISTER"
      :form-loading="formLoading"
      @change-state="handleChangeState"
      @submit-form="handleSubmitForm"
    />
    <ForgetPasswordPanel
      v-if="panelState === FORM_STATE.FORGET"
      :form-loading="formLoading"
      @change-state="handleChangeState"
      @submit-form="handleSubmitForm"
    />

    <LoginPageFooter absolute z-20 bottom-5 />
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
