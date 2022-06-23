import { acceptHMRUpdate, defineStore } from 'pinia'
import { useUserStore } from './user'
import { delSheet, editSheet, getSheets } from '~/api/sheetMusic'
import { delFiles } from '~/api/base'
import { mockSheetDepot } from '~/assets/mock/data'

export const useSheetMusicDepot = defineStore({
  id: 'sheetMusic',

  state: () => ({
    sheetMusicData: [] as any[],
    pager: {},
    filterTag: '',
  }),

  actions: {
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

    async delSheetData(value: any) {
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

    async setSheetTag(tag: string, index: number) {
      this.sheetMusicData[index].tag = tag

      await editSheet({
        _id: this.sheetMusicData[index]._id,
        tag,
      })
    },

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

    editSheetMusicData(index: number, data: any) {
      this.sheetMusicData[index] = data
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useSheetMusicDepot, import.meta.hot))
