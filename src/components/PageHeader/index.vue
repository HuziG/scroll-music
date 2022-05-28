<script setup lang="ts">
import { useRouter } from 'vue-router'
import { userLogout } from '~/api/user'

const value = ref('')
const router = useRouter()
const iconList = ref([
  { label: '关于作者', icon: 'i-mdi:book', value: 'about' },
])

const handleExit = async() => {
  await userLogout()
  router.replace('/login')
}
</script>

<template>
  <div>
    <div shadow-md bg-white h-1xl py-3 px-8 flex items-center justify-between>
      <span text-xl font-bold border-b-2 border-primary>
        滚动的曲谱
      </span>

      <n-popover :overlap="overlap" placement="bottom-end" trigger="click">
        <template #trigger>
          <n-button text size="large">
            <template #icon>
              <div i-mdi-account flex items-center justify-center text-xl text-black />
            </template>
          </n-button>
        </template>
        <div style="width: 300px;">
          <div flex>
            <div
              v-for="item in iconList"
              :key="item.value"
              mr-5 hover:text-primary cursor-pointer flex flex-col items-center justify-center
              @click="router.push('/about')"
            >
              <div bg-primary w-8 h-8 rounded-full flex items-center justify-center>
                <div :class="`${item.icon}`" text-md text-white />
              </div>
              <span text-xs mt-1 transition>{{ item.label }}</span>
            </div>
          </div>

          <n-button mt-3 type="error" style="width: 100%;" @click="handleExit">
            退出账号
          </n-button>
        </div>
      </n-popover>
    </div>
  </div>
</template>

<style scoped>

</style>
