<script setup lang="ts">
import { useRouter } from 'vue-router'
import { userLogout } from '~/api/user'

const value = ref('')
const router = useRouter()

const handleExit = async() => {
  await userLogout()
  router.replace('/login')
}
</script>

<template>
  <div>
    <div border-b-1 border-b-gray h-1xl py-3 px-8 flex items-center justify-between>
      <span text-2xl>滚动的曲谱</span>

      <div>
        <n-popselect v-model:value="value" :options="[]" trigger="click">
          <n-button strong secondary circle type="primary">
            <template #icon>
              <div i-mdi-account flex items-center justify-center text-base />
            </template>
          </n-button>
          <template #empty>
            <div>
              <div text-base>
                <span w-20 text-right inline-block>邮箱：</span> 1067408814@qq.com
              </div>
              <div text-base mt-2>
                <span w-20 inline-block>注册时间：</span>2022-05-04
              </div>
            </div>
          </template>
          <template #action>
            <n-button type="error" style="width: 100%;" @click="handleExit">
              退出账号
            </n-button>
          </template>
        </n-popselect>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
