<template>
  <div text-very-cool bg-brand-primary overflow-hidden h-screen>
    <div absolute z-20 px-10 my-5 text-white text-3xl>
      滚动的曲谱

      <div text-sm mt-5 font-normal>
        * 产品功能均免费
        <br /><br />
        * 支持上传曲谱，自定义滚动速度
        <br /><br />
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
        style="width: 100%; height: 100%"
        alt="error"
        @load="imageOnload"
      />
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

    <LoginPageFooter absolute z-20 bottom-5 right-2 />
  </div>
</template>

<script setup lang="ts">
import { useMessage, useNotification } from 'naive-ui';
import LoginPanel from './components/login.vue';
import ResigerPanel from './components/resiger.vue';
import ForgetPasswordPanel from './components/forgetPassword.vue';
import { confirmEmail, emailLogin, emailRegister, getPasswordByEmail } from '~/api/user';
import LoginPageFooter from '~/components/LoginFooter/index.vue';

const FORM_STATE = {
  LOGIN: 'login',
  REGISTER: 'register',
  FORGET: 'forget',
};
const readImg = ref(0);
const scrollImageClass = ref('');
const formLoading = ref(false);
const panelState = ref(FORM_STATE.LOGIN); // login \ register \ forget
const notification = useNotification();
const message = useMessage();
const imgList = ref([
  'https://i0.hdslb.com/bfs/article/watermark/f2a06ed86fdcb5aa7521a803b104131933cd5091.jpg@942w_1334h_progressive.webp',
  'https://i0.hdslb.com/bfs/article/watermark/c1a2de860525792fc17ea296c4f7aeff33ed510a.jpg@942w_1334h_progressive.webp',
  'https://i0.hdslb.com/bfs/article/watermark/a6f030559777a7434e2d661f83d09cb6afdeab8f.jpg@942w_1334h_progressive.webp',
]);

const { replace } = useRouter();

const handleChangeState = ({ state }) => {
  panelState.value = state;
};

const handleSubmitForm = async ({
  type,
  form,
}: {
  type: string;
  form: { email: string; password: string };
}) => {
  formLoading.value = true;
  try {
    switch (type) {
      case FORM_STATE.LOGIN:
        emailLogin({ email: form.email, password: form.password })
          .then(({ _email_verified }: { _email_verified: boolean }) => {
            if (_email_verified) {
              message.success('登录成功！');

              formLoading.value = false;

              localStorage.user_email = form.email;

              replace('/');
            } else {
              message.error('邮箱未验证，登录失败！');
              localStorage.clear();
              return;
            }
          })
          .catch((error: any) => {
            message.error(JSON.stringify(error));
          })
          .finally(() => {
            formLoading.value = false;
          });
        break;
      case FORM_STATE.REGISTER:
        await emailRegister({ email: form.email, password: form.password });
        localStorage.user_email = form.email;
        formLoading.value = false;
        panelState.value = FORM_STATE.LOGIN;
        await confirmEmail();
        notification.success({
          content: '注册成功',
          meta: '请登录注册邮箱，验证账号并使用',
        });
        break;
      case FORM_STATE.FORGET:
        await getPasswordByEmail({ email: form.email });
        formLoading.value = false;
        notification.info({
          content: '邮件已发送',
          meta: '请登录邮箱地址，找回密码',
        });

        break;
    }
  } catch (error) {
    message.error(typeof error === 'object' ? JSON.stringify(error) : error);
    formLoading.value = false;
  }
};

const imageOnload = () => {
  readImg.value += 1;
};

watch(readImg, (value) => {
  if (value >= 3) {
    scrollImageClass.value = 'rowup';

    setTimeout(() => {
      interval = setInterval(() => {
        imgList.value.concat(imgList.value);
      }, 59000);
    }, 1000);
  }
});
</script>

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

.rowup {
  -webkit-animation: 60s rowup linear infinite normal;
  animation: 60s rowup linear infinite normal;
  position: relative;
}
</style>
