<script setup>
import { useSound } from '@vueuse/sound'
import popDown from '~/assets/sound/pop-down.mp3'
import popUpOff from '~/assets/sound/pop-up-off.mp3'

const downSound = useSound(popDown, { volume: 0.25 })
const upOffSound = useSound(popUpOff, { volume: 0.25 })

const switchValue = ref(false)

const perMinuteTimeTag = ref([1])
const activeTimeTag = ref(0)

const perMinuteTime = ref(60)
const timeSignature = ref('1/4')
const timeSignatureObj = ref({
  time: 1,
  beat: 4,
})
const timeSignatureOptions = ref([
  { value: '1/4', label: '1/4' },
  { value: '2/4', label: '2/4' },
  { value: '3/4', label: '3/4' },
  { value: '4/4', label: '4/4' },
  { value: '5/4', label: '5/4' },
  { value: '7/4', label: '7/4' },
  { value: '5/8', label: '5/8' },
  { value: '6/8', label: '6/8' },
  { value: '7/8', label: '7/8' },
  { value: '9/8', label: '9/8' },
  { value: '12/8', label: '12/8' },
])

const canel = () => {
  try {
    localStorage.metronome_config = {
      timeSignature: timeSignature.value,
      perMinuteTime: perMinuteTime.value,
    }
  }
  catch (error) {
    console.error(error)
  }
  $emit('cancel')
}

const setMetronomeLocalConfig = () => {
  const config = localStorage.metronome_config
  if (config) {
    timeSignature.value = config.timeSignature
    perMinuteTime.value = config.perMinuteTime
  }
}

const handleKnocking = (on, interval = null, time = null) => {
  let knockTime = 0
  let knockInterval = null

  const knock = () => {
    if (knockTime === time - 1) {
      upOffSound.play()
      knockTime = 0
    }
    else {
      downSound.play()
      knockTime += 1
    }
  }

  if (on) {
    knockInterval = setInterval(() => {
      knock()
    }, interval)
  }
  else {
    clearInterval(knockInterval)
  }
}

// 节拍数
// watch(time, (newValue) => {

// })

// 拍号
watch(timeSignature, (newValue) => {
  const _value = newValue.split('/')
  timeSignatureObj.value.time = _value[0]
  timeSignatureObj.value.beat = _value[1]
  perMinuteTimeTag.value = new Array(Number(_value[0])).fill(1)
})

// 节拍开关
watch(switchValue, (newValue) => {
  const interval = 60 / (perMinuteTime.value / (4 / timeSignatureObj.value.beat)) * 1000
  console.log(newValue, interval, timeSignatureObj.value.time)
  // handleKnocking(newValue, interval, timeSignatureObj.value.time)
})

onMounted(() => {
  setMetronomeLocalConfig()
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
      <n-button quaternary circle @click="cancel">
        <template #icon>
          <div i-mdi-close text-base />
        </template>
      </n-button>
    </template>

    <div>
      <div flex items-center justify-center mb-5>
        <div
          i-ic:round-remove-circle-outline text-2xl cursor-pointer hover:text-primary
          @click="perMinuteTime -= 1"
        />
        <div text-4xl mx-10 flex flex-col justify-center items-center>
          <div font-bold>
            {{ perMinuteTime }}
          </div>
          <div text-sm>
            每分钟节拍数
          </div>
        </div>
        <div
          i-ic:sharp-add-circle-outline text-2xl cursor-pointer hover:text-primary
          @click="perMinuteTime += 1"
        />
      </div>

      <n-slider v-model:value="perMinuteTime" :min="30" :max="240" :step="1" :tooltip="false" />

      <div flex items-center justify-center mt-5 @click="switchValue = !switchValue">
        <div v-if="!switchValue" i-mdi:play text-3xl cursor-pointer />
        <div v-else i-mdi:pause text-3xl cursor-pointer />
      </div>

      <div mt-5 flex items-center justify-center class="-ml-3">
        <div
          v-for="(item, index) in perMinuteTimeTag"
          :key="index"
          w-3 h-3 bg-gray-200 rounded-full ml-3
          :class="`${index === 0 ? 'w-4 h-4' : ''}`"
        />
      </div>

      <div mt-8 flex flex-col items-center justify-center>
        <n-popselect v-model:value="timeSignature" :options="timeSignatureOptions" trigger="click">
          <div px-6 mb-2 border-2 rounded-full inline-block cursor-pointer>
            {{ timeSignature }}
          </div>
        </n-popselect>
        <div text-xs>
          拍号
        </div>
      </div>
    </div>
  </n-card>
</template>

<style lang="scss" scoped>

</style>
