import { useMessage } from 'naive-ui'
import { editValue } from '~/api/base'
import { useConfigStore } from '~/stores/config'

export default function() {
  const configStore = useConfigStore()
  const message = useMessage()
  const showBgImgModal = ref(false)
  const bgImgSaveLoading = ref(false)
  const saveImg = ref('')
  const resetImg = ref('')

  watch(showBgImgModal, (newValue) => {
    if (newValue) {
      saveImg.value = ''
      resetImg.value = configStore.userConfig.index_bg_img
    }
  })

  const cancelBgImgSet = () => {
    showBgImgModal.value = false
    configStore.userConfig.index_bg_img = resetImg.value
  }

  const bgImgSet = (url: string) => {
    configStore.userConfig.index_bg_img = url
  }

  const bgImgSave = async() => {
    bgImgSaveLoading.value = true

    if (!configStore.userConfig._id) {
      message.warning('无法保存')
      return false
    }

    await editValue('user_config', configStore.userConfig._id, {
      index_bg_img: configStore.userConfig.index_bg_img,
      main_color: configStore.userConfig.main_color,
    })

    message.success('保存成功')

    bgImgSaveLoading.value = false
    showBgImgModal.value = false
  }

  return {
    cancelBgImgSet,
    bgImgSave,
    bgImgSet,
    showBgImgModal,
    bgImgSaveLoading,
    configStore,
  }
}
