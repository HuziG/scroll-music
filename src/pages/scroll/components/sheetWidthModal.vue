<script setup>
const emit = defineEmits(['cancel', 'saveWidth', 'widthUpdate'])
const props = defineProps(['width'])
const width = ref(props.width)
const handleUpdate = (value) => {
  emit('widthUpdate', value)
}
</script>

<template>
  <n-card
    title="曲谱宽度调节"
    bordered
    size="huge"
    :closable="true"
    role="dialog"
    aria-modal="false"
    style="width: 500px; position: fixed; right: 50px; bottom: 100px"
    @close="emit('cancel')"
  >
    <n-slider v-model:value="width" :min="50" :max="90" @update:value="handleUpdate" />

    <template #footer>
      <div text-right>
        <n-button type="primary" @click="emit('saveWidth')">
          保存
        </n-button>
      </div>
    </template>
  </n-card>
</template>

<style lang="scss" scoped>

</style>
