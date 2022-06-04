<script setup>

</script>

<template>
  <n-card
    title="节拍器"
    bordered
    size="huge"
    :closable="false"
    role="dialog"
    aria-modal="true"
    style="width: 400px; position: fixed; left: 80px; bottom: 50px"
  >
    <template #header-extra>
      <n-button quaternary circle @click="$emit('cancel')">
        <template #icon>
          <div i-mdi-close text-base />
        </template>
      </n-button>
    </template>
    <div />
  </n-card>
</template>

<style lang="scss" scoped>

</style>
