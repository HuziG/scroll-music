<script setup lang="ts">
const emit = defineEmits(['select'])
const emoji = ref([
  'i-twemoji-keycap-1',
  'i-twemoji-keycap-2',
  'i-twemoji-keycap-3',
  'i-twemoji-keycap-4',
  'i-twemoji-keycap-5',
  'i-twemoji-keycap-6',
  'i-twemoji-keycap-7',
  'i-twemoji-keycap-8',
  'i-twemoji-keycap-9',
  'i-twemoji:check-mark-button',
  'i-twemoji:green-square',
  'i-twemoji:ok-button',
  'i-twemoji:eight-spoked-asterisk',
  'i-twemoji:o-button-blood-type',
  'i-twemoji:free-button',
  'i-twemoji:red-circle',
  'i-twemoji:japanese-acceptable-button',
  'i-twemoji:hollow-red-circle',
  'i-twemoji:grinning-face',
  'i-twemoji:crying-face',
])
</script>

<template>
  <n-card
    :style="{
      width: '300px'
    }"
    :bordered="false"
    size="huge"
    role="dialog"
    aria-modal="true"
  >
    <template #header-extra>
      <n-button quaternary circle @click="emit('cancel')">
        <template #icon>
          <div i-mdi-close text-base />
        </template>
      </n-button>
    </template>

    <div text-base text-grey-500 font-bold text-center pb-3>
      选择一个标签
    </div>

    <div id="tag-container" flex items-center flex-wrap>
      <div
        v-for="item in emoji"
        :key="item"
        class="tag"
        :class="`${item}`"
        @click="emit('select', item)"
      />
    </div>

    <div mt-3>
      <n-button style="width: 100%" @click="emit('select', '')">
        清空标签
      </n-button>
    </div>
  </n-card>
</template>

<style scoped>
.tag{
  font-size: 1.8rem;
  margin: .5rem;
  cursor: pointer;
  transition: all .2s;
}
.tag:hover{
  transform: scale(1.6);
}
</style>
