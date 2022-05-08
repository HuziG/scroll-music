import { acceptHMRUpdate, defineStore } from 'pinia'
import { sheetDetailStore }  from '~/interface/base'

export const useSheetDetailStore = defineStore({
  id: 'sheetDetail',
  
  state: (): sheetDetailStore => ({
    sheetData: {}
  }),

  actions: {
    dispatchSheet(value: {
      name: string, _id: string, imgs: string[], speed: number, step: number
    }) {
      this.sheetData = value
      sessionStorage.sheet_detail = JSON.stringify(this.sheetData)
    },

    dispatchSpeed(step: number, speed: number) {
      this.sheetData['step'] = step
      this.sheetData['speed'] = speed
      sessionStorage.sheet_detail = JSON.stringify(this.sheetData)
    },

    clearData() {
      this.sheetData = {}
    }
  }
})
  
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSheetDetailStore, import.meta.hot))
}
