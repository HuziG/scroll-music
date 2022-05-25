import { useMessage } from 'naive-ui'
import { editValue } from '~/api/base'

export default function() {
  const message = useMessage()
  const showBgImgModal = ref(false)
  const modalLoading = ref(false)
  const bgUrl = ref('https://infinitypro-img.infinitynewtab.com/wallpaper/anime/265.jpg?imageView2/2/w/3072/format/webp/interlace/1')
  const saveImg = ref('')

  watch(showBgImgModal, (newValue) => {
    if (newValue)
      saveImg.value = ''
  })

  const cancelBgImgSet = () => {
    showBgImgModal.value = false
  }

  const bgImgSave = async({ url, _id }: any) => {
    modalLoading.value = true

    await editValue('sheet_config', _id, {
      bg_img_url: url,
    })

    message.success('保存成功')

    showBgImgModal.value = false
    modalLoading.value = false
  }

  const bgImgSet = (url: string) => {
    bgUrl.value = url
  }

  return {
    cancelBgImgSet,
    bgImgSave,
    bgImgSet,
    showBgImgModal,
    bgUrl,
  }
}
