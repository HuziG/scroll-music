<script lang="ts" setup>
import { useMessage } from 'naive-ui'
import { defineProps } from 'vue'
import { sendSmsCode } from '~/api/user'

const props = defineProps(['telephone'])

const message = useMessage()
const smsCodeData = ref({
  second: 60,
  mode: 'get',
})

/**
 * 发送验证码
 */
let smsCodeTimeInterval = null
const handleSendSmsCode = async() => {
  try {
    await sendSmsCode({
      telephone: props.telephone,
    })

    message.success('验证码发送成功')

    smsCodeData.value.mode = 'countDown'

    smsCodeTimeInterval = setInterval(() => {
      smsCodeData.value.second -= 1

      if (smsCodeData.value.second === 0) {
        smsCodeData.value.second = 60
        smsCodeData.value.mode = 'get'
        clearInterval(smsCodeTimeInterval)
      }
    }, 1000)
  }
  catch (e) {
    message.error(typeof e === 'object' ? JSON.stringify(e) : e)
  }
}
</script>

<template>
  <n-input placeholder="输入验证码">
    <template #prefix>
      <div text-base mr-2 text-gray-400 i-mdi:message-fast />
    </template>
    <template #suffix>
      <n-button
        type="primary" size="tiny"
        :disabled="telephone === '' || smsCodeData.second < 60"
        @click="handleSendSmsCode"
      >
        {{ smsCodeData.mode === 'get' ? '获取验证码' : smsCodeData.second + 's 重新获取' }}
      </n-button>
    </template>
  </n-input>
</template>

<style scoped>

</style>
