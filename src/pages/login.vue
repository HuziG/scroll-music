<script setup lang="ts">
import { NButton, NForm, NFormItem, NInput } from 'naive-ui'
import PageHeader from '~/components/PageHeader/index.vue'
import PageFooter from '~/components/PageFooter/index.vue'

let imgIndex = false

const formValue = ref({
  email: '',
  password: ''
})

const imgList = [
  "https://tse1-mm.cn.bing.net/th/id/R-C.ff17f6bba0eb6277269425c2993ab43b?rik=wia1VgFpHvKelg&riu=http%3a%2f%2fwww.ccguitar.cn%2fpu%2f2017%2f2%2f20%2f92216_74616%2f1.gif&ehk=7cNDVcMhmvR3WfCfrEbKP%2fqLqq495236YQlwgPe7qxU%3d&risl=&pid=ImgRaw&r=0",
  "https://tse1-mm.cn.bing.net/th/id/R-C.eafdb41966a66e53ef04d09fa96bba35?rik=YIvINuvLwG9y7g&riu=http%3a%2f%2fimg.wanjita.com%2fueditor%2fphp%2fupload%2fimage%2f20200824%2f1598282933997765.jpg&ehk=QsHNUtOwrtH4rnzQnQI5uQcTkC3hQ1tL9CwIDWfyoms%3d&risl=&pid=ImgRaw&r=0"
]

const interval = setInterval(() => {
  imgList.push(imgList[imgIndex ? 0 : 1])
  imgIndex = !imgIndex
}, 59000)
</script>

<template>
  <div text-very-cool bg-brand-primary overflow-hidden h-screen>
    <page-header absolute z-20/>

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

    <div 
      bg-white rounded-5 px-5 w-xl h-xl absolute right-10 z-20 overflow-hidden
      style="top: 15%;tranfrom: translateY(-50%)"
    >
      <div my-5 text-main font-bold text-2xl>登录账号</div>

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

      <div text-right>
        <n-button quaternary type="primary">
          忘记密码？
        </n-button>
      </div>

      <n-button 
        w-full mt-4 
        type="primary"
        :disabled="formValue.email === '' || formValue.password === ''"
      >
        确定
      </n-button>

      <div mt-3>
        还没有账号?
        <n-button quaternary type="primary">
          立即注册
        </n-button>
      </div>

      <div text-vice absolute bottom-0 py-2>@ 2022 滚动的曲谱</div>
    </div>

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
