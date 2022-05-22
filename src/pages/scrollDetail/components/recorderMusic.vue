<script setup>
const AudioContext = window.AudioContext || window.webkitAudioContext
const globalState = ref(0)
const audioContext = ref(null)
const gumStream = ref(null)
const input = ref(null)
const rec = ref(null)
const recordTime = ref(0)
const showModal = ref(false)

const createDownloadLink = (blob) => {
  const recordContainer = document.getElementById('record-container')
  const url = URL.createObjectURL(blob)
  const au = document.createElement('audio')
  const li = document.createElement('li')
  const br = document.createElement('br')
  const link = document.createElement('a')

  // name of .wav file to use during upload and download (without extendion)
  const filename = new Date().toISOString()

  // add controls to the <audio> element
  au.controls = true
  au.src = url

  // save to disk link
  link.href = url
  link.download = `${filename}.wav` // download forces the browser to donwload the file using the  filename
  link.innerHTML = '获取录音文件'
  link.className = 'download-button'

  recordContainer.innerHTML = ''

  // add the new audio element to li
  recordContainer.appendChild(au)

  // add the filename to the li
  recordContainer.appendChild(document.createTextNode(`${filename}.wav `))

  recordContainer.appendChild(br)

  // add the save to disk link to li
  recordContainer.appendChild(link)
}

const handleStartRecording = () => {
  const constraints = { audio: true, video: false }

  navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
    console.warn('getUserMedia() success, stream created, initializing Recorder.js ...')

    audioContext.value = new AudioContext()
    gumStream.value = stream
    input.value = audioContext.value.createMediaStreamSource(stream)

    rec.value = new Recorder(input.value, { numChannels: 1 })
    rec.value.record()

    recordTime.value = +new Date()

    console.warn('Recording started')
  })
}

const downloadRecordFile = () => {
  // tell the recorder to stop the recording
  rec.value.stop()

  // stop microphone access
  gumStream.value.getAudioTracks()[0].stop()

  // create the wav blob and pass it on to createDownloadLink
  rec.value.exportWAV(createDownloadLink)
}

const handleEndRecording = () => {
  showModal.value = true

  setTimeout(() => {
    downloadRecordFile()
  }, 100)
}

const handleToggleRecorder = (state) => {
  if (state === 0)
    handleStartRecording()

  if (state === 1)
    handleEndRecording()

  globalState.value = globalState.value === 0 ? 1 : 0
}

onBeforeUnmount(() => {
  if (rec.value)
    rec.value.stop()

  if (gumStream.value)
    gumStream.value.getAudioTracks()[0].stop()
})
</script>

<template>
  <div>
    <n-tooltip :show-arrow="false" placement="left">
      <template #trigger>
        <div :class="`${globalState === 1 ? 'fadeinout-ani' : ''}`">
          <n-button
            strong
            circle
            :type="globalState === 0 ? 'primary' : 'error'"
            size="medium"
            @click="handleToggleRecorder(globalState)"
          >
            <template #icon>
              <div v-show="globalState === 0" i-mdi:microphone text-base />
              <div v-show="globalState === 1" i-mdi:radiobox-marked text-base />
            </template>
          </n-button>
        </div>
      </template>
      {{ globalState === 0 ? '录音' : '结束录音' }}
    </n-tooltip>

    <n-modal
      v-model:show="showModal"
      preset="card"
      style="width: 400px;"
      title="录制完成！"
      size="huge"
      :bordered="false"
      :segmented="segmented"
    >
      <div id="record-container">
        <div text-center py-2 text-primary>
          生成录音文件中...
        </div>
      </div>
    </n-modal>
  </div>
</template>

<style>
.fadeinout-ani {
  animation: fadeinout 2s infinite;
}

@keyframes fadeinout {
  0%{
    opacity: 1;
  }
  50%{
    opacity: .7;
  }
  100%{
    opacity: 1;
  }
}

.download-button{
      text-align: center;
    background: #5138ED;
    color: #ffffff;
    padding: 0.5rem 0;
    border-radius: 0.3rem;
    margin: 0.5rem auto;
    text-decoration: none;
    width: 320px;
    display: inline-block;
}
</style>
