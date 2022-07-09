<script setup lang="ts">
<<<<<<< HEAD
import { NButton, NForm, NFormItem, NInput, NSpin } from 'naive-ui';
import { deepClone } from '~/utils/utils.ts';
defineProps(['formLoading']);
const formRef = ref(null);
const formValue = ref({
  email: '',
});
const emit = defineEmits(['submitForm', 'changeState']);
const rules = ref({
  email: [
    {
      required: true,
      validator(rule, value: string) {
        if (!value) return new Error('需要邮箱');
        else if (!/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(value))
          return new Error('邮箱地址格式错误');
        return true;
      },
      trigger: ['input', 'blur'],
    },
  ],
});
const disabledSubmit = computed(() => {
  const _form = formValue.value;
  return _form.email === '';
});
const handleValidateForm = (e) => {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      emit('submitForm', {
        type: 'forget',
        form: deepClone(formValue.value),
      });
    } else {
      message.error('注册信息填写有误，请纠正');
    }
  });
};
onMounted(() => {
  formValue.value.email = localStorage.user_email;
});
=======
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
  'https://i0.hdslb.com/bfs/article/watermark/eaaf026ff58fa90680293514b36dcd1dc1d73cc0.jpg@942w_1334h_progressive.webp',
  'https://i0.hdslb.com/bfs/article/watermark/6bf02bd0812e6f6a47113ddba48184ad283ed81b.jpg@942w_1334h_progressive.webp',
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

onMounted(async() => {
  await nextTick()

  setTimeout(() => {
    interval = setInterval(() => {
      imgList.concat(imgList.value)
    }, 59000)
  }, 1000)
})
>>>>>>> newmain
</script>

<template>
  <div
    class="top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
    bg-white
    rounded-5
    px-5
    w-xl
    h-xl
    absolute
    z-20
    overflow-hidden
  >
    <div my-5 text-main font-bold text-2xl flex items-center>
      <div
        i-mdi-arrow-left-bold-circle
        inline-block
        text-primary
        mr-3
        cursor-pointer
        @click="
          emit('changeState', {
            state: 'login',
          })
        "
      />
      忘记密码
    </div>

    <n-spin :show="formLoading">
      <n-form ref="formRef" :rules="rules" :label-width="80" :model="formValue" size="large">
        <n-form-item label="邮箱" path="email">
          <n-input v-model:value="formValue.email" placeholder="输入注册邮箱" />
        </n-form-item>
      </n-form>
    </n-spin>

    <n-button w-full mt-4 type="primary" :disabled="disabledSubmit" @click="handleValidateForm">
      提交
    </n-button>

    <div text-vice absolute bottom-0 py-3>@ 2022 滚动的曲谱</div>
  </div>
</template>
<<<<<<< HEAD
=======

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
>>>>>>> newmain
