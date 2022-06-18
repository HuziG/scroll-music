<script setup lang="ts">
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
