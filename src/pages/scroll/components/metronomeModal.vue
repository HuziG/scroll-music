<script setup>
const switchValue = ref(false)
const timeTag = ref([1, 2, 3, 4, 5, 6])
const activeTimeTag = ref(0)
const time = ref(60)

watch(time, (newValue) => {

})

watch(switchValue, (newValue) => {
  console.log(switchValue.value)
})
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

    <div>
      <div flex items-center justify-center mb-5>
        <div
          i-ic:round-remove-circle-outline text-2xl cursor-pointer hover:text-primary
          @click="time -= 1"
        />
        <div text-4xl mx-10 flex flex-col justify-center items-center>
          <div font-bold>
            {{ time }}
          </div>
          <div text-sm>
            每分钟节拍数
          </div>
        </div>
        <div
          i-ic:sharp-add-circle-outline text-2xl cursor-pointer hover:text-primary
          @click="time += 1"
        />
      </div>

      <n-slider v-model:value="time" :min="30" :max="240" :step="1" :tooltip="false" />

      <div flex items-center justify-center mt-5 @click="switchValue = !switchValue">
        <div v-if="!switchValue" i-mdi:play text-3xl cursor-pointer />
        <div v-else i-mdi:pause text-3xl cursor-pointer />
      </div>

      <div mt-5 flex items-center justify-center class="-ml-3">
        <div
          v-for="(item, index) in timeTag"
          :key="item"
          w-3 h-3 bg-gray-200 rounded-full ml-3
          :class="`${index === 0 ? 'w-4 h-4' : ''}`"
        />
      </div>

      <div mt-8 flex flex-col items-center justify-center>
        <div px-6 mb-2 border-2 rounded-full inline-block>
          6/8
        </div>
        <div text-xs>
          拍号
        </div>
      </div>
    </div>
  </n-card>
</template>

<style lang="scss" scoped>

</style>
