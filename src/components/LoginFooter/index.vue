<script setup lang="ts">
const openGithub = () => {
  window.open('https://github.com/HuziG')
}
</script>

<template>
  <div px-10 text-white font-bold text-md text-right flex items-center>
    作者：zxz
    <span inline-block mx-5>/</span>
    Email：1067408814@qq.com
    <span inline-block mx-5>/</span>
    <div i-mdi:github text-xl inline-block cursor-pointer transition-all hover:opacity-60 @click="openGithub" />
  </div>
</template>
