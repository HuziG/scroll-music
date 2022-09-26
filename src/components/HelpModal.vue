<script setup lang="ts">
const showModal = ref(true)

const handleShow = () => {
  showModal.value = true
}

const handleClose = () => {
  localStorage.show_help_modal = 'hasShow'
  showModal.value = false
}

defineExpose({
  handleShow,
})

onMounted(() => {
  const _showHelpModal = localStorage.show_help_modal

  if (_showHelpModal === 'hasShow')
    showModal.value = false
})
</script>

<template>
  <div
    v-if="showModal"
    fixed bottom-20 right-2 bg-white rounded-xl p-3 shadow-md
    style="width:300px;"
  >
    <div pb-2 text-center bg-white>
      <span text-xl font-bold>帮助</span>

      <n-button quaternary circle absolute right-2 top-2 @click="handleClose">
        <template #icon>
          <div i-mdi-close text-base />
        </template>
      </n-button>
    </div>

    <div overflow-y-auto text-base pt-3 pr-5 leading-7 tracking-wide style="height:400px;">
      <div>这是一款支持个人曲谱上传，拥有完美演奏体验的，免费的，跨平台曲谱浏览器</div>

      <div mt-3>
        您可以直接使用体验版感受一下功能。您也可以直接去看
        <a href="https://www.bilibili.com/video/BV1tS4y1J7Mu/" target="_blank">使用视频</a>
      </div>

      <div mt-5 text-primary>
        可能有很多朋友会问，哪里有免费的曲谱可以获取来上传。这个其实有很多，在这里推荐几个给大家:
        <a href="http://sooopu.com/JitaPu/" style="color:#E94975;" target="_blank">搜谱网</a>,
        <a href="https://puduoduo123.com/jitapu" style="color:#E94975;" target="_blank">谱多多</a>,
        <a href="https://www.100jita.com/" style="color:#E94975;" target="_blank">100吉他网</a>
      </div>

      <div my-3 font-bold>
        它拥有很多亮点
      </div>

      <div text-md>
        <div mt-3>
          <span class="title">亮点一: 支持曲谱上传</span>
          开发此曲谱软件，缘由于当时很难在网上能找到支持上传个人曲谱的软件。
          找到了很多曲谱软件，很多都是必须通过其软件的内购消费才可以获取曲谱。当你手上有
          大量曲谱文件，却又不想再通过内购消费获取曲谱。那么此款软件一定适合你。
        </div>

        <div mt-3>
          <span class="title">亮点二: 曲谱滚动</span>
          首先是双规制曲谱滚动速度调节，一个轨道用来控制一次滚动的距离有多少。
          一个轨道用来控制每多少毫秒滚动一次。多次操作，使用体验后，发现双规制的滚动调节
          最能达到最合适的滚动速度要求。
        </div>

        <div mt-3>
          <span class="title">亮点三: 曲谱剪裁</span>
          专为个人曲谱上传而定制的功能。相信大家手里的曲谱文件，曲谱图片。都有
          大量的留白。大量的留白会极大地影响曲谱的整体滚动效果，大量的留白往往意味着在曲谱
          滚动过程中，你不得不要花费大量的时间，等待曲谱在留白区域内滚动直至结束。
        </div>

        <div mt-3>
          <span class="title">亮点四: 夜间模式</span>
          昏暗灯光下的，白色的曲谱往往相当刺眼，长期的练习后，会使得眼镜过于疲劳。
          开发夜间模式，正式为了改善这种情况。
        </div>

        <div mt-3>
          <span class="title">亮点五: 软件基于浏览器</span>
          无论是在安卓平板、ios平板、还是普通电脑中，都可以完美运行。很多很多
          优秀的曲谱浏览器都只在ios平台上发布，让安卓平板的小伙伴望而却步。基于浏览器运行，解
          决了很多拥有安卓平板的小伙伴，难以获取优秀曲谱软件的问题。
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.title{
  display: block;
  color: #5138ED;
  font-weight: 500;
}
</style>
