<script setup lang="ts">
import { useRouter } from 'vue-router';
import { userLogout } from '~/api/user';
import { useUserStore } from '~/stores/user';

const value = ref('');
const router = useRouter();
const emit = defineEmits(['showHelp']);
const iconList = ref([{ label: '关于作者', icon: 'i-mdi:book', value: 'about' }]);
const userStore = useUserStore();

const handleExit = async () => {
  await userLogout();
  window.location.reload();
};
</script>

<template>
  <div
    fixed
    top-0
    left-0
    box-border
    w-full
    z-30
    shadow-md
    bg-white
    border-box
    h-1xl
    py-3
    px-7
    flex
    items-center
    justify-between
  >
    <span text-xl font-bold border-b-2 border-primary> 滚动的曲谱 </span>

    <div flex>
      <n-tooltip placement="bottom">
        <template #trigger>
          <div
            i-mdi:progress-question
            flex
            items-center
            justify-center
            text-xl
            text-black
            mr-12
            cursor-pointer
            hover:opacity-60
            @click="emit('showHelp')"
          />
        </template>
        帮助
      </n-tooltip>

      <n-popover :overlap="overlap" placement="bottom-end" trigger="hover">
        <template #trigger>
          <div
            v-if="!userStore.demoUser"
            i-mdi-account
            flex
            items-center
            justify-center
            text-xl
            text-black
            mr-3
            cursor-pointer
            hover:opacity-60
          />
          <div v-else></div>
        </template>
        <div style="width: 300px">
          <div flex pt-2>
            <div
              v-for="item in iconList"
              :key="item.value"
              mr-5
              hover:text-primary
              cursor-pointer
              flex
              flex-col
              items-center
              justify-center
              @click="router.push('/about')"
            >
              <div bg-primary w-8 h-8 rounded-full flex items-center justify-center>
                <div :class="`${item.icon}`" text-md text-white />
              </div>
              <span text-xs mt-1 transition>{{ item.label }}</span>
            </div>
          </div>

          <n-button mt-3 type="error" style="width: 100%" @click="handleExit"> 退出账号 </n-button>
        </div>
      </n-popover>
    </div>
  </div>
</template>

<style scoped></style>
