export default function({
  scrollMode,
  handleStart,
  handleStop,
  handleRestart,
}: any) {
  const keyAction: any = {
    65: { icon: 'i-ic:sharp-not-started', label: '开始' },
    83: { icon: 'i-ic:round-stop-circle', label: '停止' },
    68: { icon: 'i-ic:baseline-restart-alt', label: '重置' },
  }
  const showActionData = ref(null)
  const tabIsFocus = ref(true)

  document.addEventListener('visibilitychange', () => {
    tabIsFocus.value = document.visibilityState === 'visible'
  })

  document.onkeydown = (e) => { // 对整个页面监听
    if (!tabIsFocus.value)
      return false

    const keyNum = window.event ? e.keyCode : e.which

    showActionData.value = keyAction[keyNum]

    setTimeout(() => {
      showActionData.value = null
    }, 1300)

    switch (keyNum) {
      case 65:
        if (scrollMode.value === 0)
          handleStart()
        break
      case 83:
        if (scrollMode.value === 1)
          handleStop()
        break
      case 68:
        handleRestart()
        break
    }
  }

  return {
    showActionData,
  }
}
