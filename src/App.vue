<script setup lang="ts">
import type { GlobalThemeOverrides } from 'naive-ui';
import {
  NConfigProvider,
  NDialogProvider,
  NMessageProvider,
  NNotificationProvider,
<<<<<<< HEAD
} from 'naive-ui';
import { useUserStore } from '~/stores/user';
import { logoConsole } from '~/utils/utils';

logoConsole();
useUserStore().setDemoUser();
=======
} from 'naive-ui'
import { logoConsole } from '~/utils/utils'

logoConsole()
>>>>>>> newmain

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#5138ED',
    primaryColorHover: '#6C59DE',
  },
};

// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg

// useHead({
//   title: '滚动的曲谱',
//   meta: [
//     { name: 'description', content: 'Opinionated Vite Starter Template' },
//   ],
// })
</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-notification-provider>
      <n-message-provider>
        <n-dialog-provider>
          <RouterView />
        </n-dialog-provider>
      </n-message-provider>
    </n-notification-provider>
  </n-config-provider>
</template>
