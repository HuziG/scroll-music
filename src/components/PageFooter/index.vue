<script setup lang="ts">
const openGithub = () => {
  window.open('https://github.com/HuziG')
}
</script>

<template>
  <div font-bold text-md box-border py-3 text-xs px-10 flex items-center justify-between style="background: #eee;">
    <div>
      作者：zxz &nbsp;&nbsp; * &nbsp;&nbsp;
      联系邮箱：<a href="mailto:1067408814@qq.com" target="_blank">1067408814@qq.com</a>&nbsp;&nbsp;  * &nbsp;&nbsp;
      交流Q群：671644918
    </div>

    <n-button strong secondary circle type="primary" size="mini" @click="openGithub">
      <template #icon>
        <div i-mdi:github text-base />
      </template>
    </n-button>
  </div>
</template>
