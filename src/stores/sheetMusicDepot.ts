import { acceptHMRUpdate, defineStore } from 'pinia'
import { getSheets, delSheet } from '~/api/sheetMusic'
import { delFiles } from '~/api/base'

export const useSheetMusicDepot = defineStore({
  id: 'sheetMusic',

  state: () => ({
    sheetMusicData: [],
    pager: {}
  }),

  actions: {
    async handleInitSheet() {
      const { objects, meta } = await getSheets()

      this.sheetMusicData = objects
      this.pager = meta
    },

    async delSheetData(value: any) {
      let delFilesArray: string[] = []

      value.imgs.forEach((item: any) => {
        if (item.fileId) delFilesArray.push(item.fileId)
      })

      if (delFilesArray.length > 0) {
        delFiles(delFilesArray)
      }

      return await delSheet({
        _id: value._id
      })
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSheetMusicDepot, import.meta.hot))
}
