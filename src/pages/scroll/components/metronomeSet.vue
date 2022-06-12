<script setup>
import MetronomeModal from './metronomeModal.vue'

const showModal = ref(false)
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
          @click="showModal = !showModal"
        >
          <template #icon>
            <div class="i-mdi:metronome" />
          </template>
        </n-button>
      </template>
      节拍器
    </n-tooltip>

    <MetronomeModal
      v-show="showModal"
      @cancel="showModal = !showModal"
    />
  </div>
</template>

<style lang="scss" scoped>

</style>
