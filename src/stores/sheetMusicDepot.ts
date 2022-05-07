import { acceptHMRUpdate, defineStore } from 'pinia'
import { getSheets } from '~/api/sheetMusic'

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
    }
  }
})
  
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSheetMusicDepot, import.meta.hot))
}
