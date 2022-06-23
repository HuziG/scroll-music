import { useMessage } from 'naive-ui'

export default function({ usmd }: any) {
  const message = useMessage()
  const showTagModal = ref(false)
  const filterTag = usmd.filterTag

  /**
 * 过滤标签选择
 */
  const handleSelectTag = (tag: string) => {
    usmd.$patch({
      filterTag: tag,
    })
    usmd.filterSheetByTag()

    showTagModal.value = false
    message.success('筛选成功')
  }

  onMounted(async() => {
    usmd.$patch({
      filterTag: localStorage.filter_tag || '',
    })
  })

  return {
    showTagModal,
    filterTag,
    handleSelectTag,
  }
}
