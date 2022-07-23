<script lang="ts" setup>
import { emailLogin, telephoneLogin } from '~/api/user'
import { useUserStore } from '~/stores/user'

const useStore = useUserStore()
const buttonLoading = ref(false)
const formValue = ref({
  account: '',
  password: '',
})

const handleSubmit = async() => {
  buttonLoading.value = true

  const { account, password } = formValue.value

  localStorage.user_account = account

  if (!formValue.includes('@')) {
    await telephoneLogin({ phone: account, password }).catch((error) => {
      message.error(JSON.stringify(error))
    })

    buttonLoading.value = false

    setTimeout(() => {
      router.replace('/')
    }, 500)
  }
  else {
    const { _account_verified: verified } = await emailLogin({ email: account, password }).catch((error) => {
      message.error(JSON.stringify(error))
    })

    if (verified) {
      useStore.demoUser = false
      message.success('登录成功！')
    }
    else {
      message.error('邮箱未验证，登录失败！')
    }

    buttonLoading.value = false

    setTimeout(() => {
      router.replace('/')
    }, 500)
  }
}

const disabledSubmit = computed(() => {
  return Object.values(formValue.value).map(item => item.trim()).includes('')
})

onMounted(() => {
  formValue.value.account = localStorage.user_account
})
</script>

<template>
  <div>
    <n-form
      ref="formRef"
      :label-width="80"
      :model="formValue"
      size="large"
    >
      <n-form-item label="邮箱/手机号" path="account">
        <n-input v-model:value="formValue.account" placeholder="请输入邮箱/手机号">
          <template #prefix>
            <div text-base mr-2 text-gray-400 i-mdi:email />
          </template>
        </n-input>
      </n-form-item>
      <n-form-item label="密码" path="password">
        <n-input
          v-model:value="formValue.password"
          type="password"
          show-password-on="mousedown"
          placeholder="请输入密码"
          @keydown.enter="handleSubmit"
        >
          <template #prefix>
            <div text-base mr-2 text-gray-400 i-mdi:key />
          </template>
        </n-input>
      </n-form-item>
    </n-form>

    <n-button
      w-full mt-4
      type="primary"
      :loading="buttonLoading"
      :disabled="disabledSubmit"
      @click="handleValidateForm"
    >
      登录
    </n-button>
  </div>
</template>

<style scoped>

</style>
