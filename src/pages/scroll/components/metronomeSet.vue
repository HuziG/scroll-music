<script setup>

</script>

<template>
  <div>
    <n-tooltip :show-arrow="false" placement="left">
      <template #trigger>
        <n-button
          strong
          circle
          type="primary"
          size="medium"
        >
          <template #icon>
            <div class="i-mdi:metronome" />
          </template>
        </n-button>
      </template>
      节拍器
    </n-tooltip>
  </div>
</template>

<style lang="scss" scoped>

</style>
