import { acceptHMRUpdate, defineStore } from 'pinia'
import { useUserStore } from './user'
import { delSheet, editSheet, getSheets } from '~/api/sheetMusic'
import { delFiles } from '~/api/base'
import { mockSheetDepot } from '~/assets/mock/data'

const userStore = useUserStore()

export const useSheetMusicDepot = defineStore({
  id: 'sheetMusic',

  state: () => ({
    sheetMusicData: [] as any[],
    pager: {},
    filterTag: '',
  }),

  actions: {
    /**
     * 初始化曲谱列表
     */
    async handleInitSheet() {
      if (useUserStore().demoUser) {
        this.sheetMusicData = mockSheetDepot
      }
      else {
        const { objects, meta } = await getSheets()
        this.sheetMusicData = objects.map((item: any) => {
          item.show = true
          return item
        })
        this.pager = meta
      }
    },

    /**
     * 删除曲谱
     */
    async delSheetData(value: any) {
      if (userStore.demoUser)
        return false

      const delFilesArray: string[] = []

      value.imgs.forEach((item: any) => {
        if (item.fileId)
          delFilesArray.push(item.fileId)
      })

      if (delFilesArray.length > 0)
        delFiles(delFilesArray)

      return await delSheet({
        _id: value._id,
      })
    },

    /**
     * 设置曲谱标签
     * @param tag
     * @param index
     */
    async setSheetTag(tag: string, index: number) {
      if (userStore.demoUser)
        return false

      this.sheetMusicData[index].tag = tag

      await editSheet({
        _id: this.sheetMusicData[index]._id,
        tag,
      })
    },

    /**
     * 过滤筛选曲谱标签
     */
    filterSheetByTag() {
      localStorage.filter_tag = this.filterTag

      this.sheetMusicData.forEach((item) => {
        item.show = false
      })

      if (this.filterTag === '') {
        this.sheetMusicData.forEach((item) => {
          item.show = true
        })
      }
      else {
        this.sheetMusicData.forEach((item) => {
          if (item.tag === this.filterTag)
            item.show = true
        })
      }
    },

    /**
     * 编辑标签
     * @param index
     * @param data
     */
    editSheetMusicData(index: number, data: any) {
      this.sheetMusicData[index] = data
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useSheetMusicDepot, import.meta.hot))
