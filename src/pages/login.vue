<script setup lang="ts">
import { NButton, NForm, NFormItem, NInput, useNotification, NSpin } from 'naive-ui'
import PageHeader from '~/components/PageHeader/index.vue'
import PageFooter from '~/components/PageFooter/index.vue'
import LoginPanel from '~/components/LoginForm/Login.vue'
import ResigerPanel from '~/components/LoginForm/Resiger.vue'
import ForgetPasswordPanel from '~/components/LoginForm/ForgetPassword.vue'
import { emailLogin } from '~/api/user.ts'

let imgIndex = false

const FORM_STATE = {
  LOGIN: 'login',
  REGISTER: 'register',
  FORGET: 'forget',
}
const panelState = ref(FORM_STATE.LOGIN) // login \ register \ forget
const notification = useNotification()
const imgList = [
  "https://tse1-mm.cn.bing.net/th/id/R-C.ff17f6bba0eb6277269425c2993ab43b?rik=wia1VgFpHvKelg&riu=http%3a%2f%2fwww.ccguitar.cn%2fpu%2f2017%2f2%2f20%2f92216_74616%2f1.gif&ehk=7cNDVcMhmvR3WfCfrEbKP%2fqLqq495236YQlwgPe7qxU%3d&risl=&pid=ImgRaw&r=0",
  "https://tse1-mm.cn.bing.net/th/id/R-C.eafdb41966a66e53ef04d09fa96bba35?rik=YIvINuvLwG9y7g&riu=http%3a%2f%2fimg.wanjita.com%2fueditor%2fphp%2fupload%2fimage%2f20200824%2f1598282933997765.jpg&ehk=QsHNUtOwrtH4rnzQnQI5uQcTkC3hQ1tL9CwIDWfyoms%3d&risl=&pid=ImgRaw&r=0"
]

const interval = setInterval(() => {
  imgList.push(imgList[imgIndex ? 0 : 1])
  imgIndex = !imgIndex
}, 59000)

const handleChangeState = ({ state }) => {
  panelState.value = state
}

const handleSubmitForm = async ({ type, form }) => {
  try {
    switch (type) {
    case FORM_STATE.LOGIN:
      
      break;
    case FORM_STATE.REGISTER:
        // await emailLogin({ email: form.email, password: form.password })
        // await confirmEmail()
        
        notification['info']({
          content: '注册成功',
          meta: '请登录注册邮箱，验证账号并使用'
        })
        
      break;
    case FORM_STATE.FORGET:
      
      break;
    }
  } catch (error) {

  }
}
</script>

<template>
  <div text-very-cool bg-brand-primary overflow-hidden h-screen>
    <page-header absolute z-20>
      <div text-sm mt-5 font-normal>
        * 产品功能全部免费 
        <br /><br />
        * 支持上传曲谱，自定义滚动速度
        <br /><br />
        * 多样的速度调节，满足需求
        <br /><br />
        * 个人账号所持曲谱数量不限量
      </div>
    </page-header>

    <div w-full h-full bg-black bg-opacity-80 absolute top-0 left-0 z-10 />

    <div class="rowup">
      <img
        v-for="url in imgList"
        :key="url"
        :src="url" 
        object-cover
        style="width: 100%;height: 100%;" 
        alt="error"
      />
    </div>

    <LoginPanel 
      v-if="panelState === FORM_STATE.LOGIN" 
      @changeState="handleChangeState" 
      @submitForm="handleSubmitForm" 
    />
    <ResigerPanel 
      v-if="panelState === FORM_STATE.REGISTER" 
      @changeState="handleChangeState"  
      @submitForm="handleSubmitForm" 
    />
    <ForgetPasswordPanel 
      v-if="panelState === FORM_STATE.FORGET" 
      @changeState="handleChangeState" 
      @submitForm="handleSubmitForm" 
    />

    <PageFooter absolute z-20 bottom-5/>
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
