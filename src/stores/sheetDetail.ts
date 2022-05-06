import { acceptHMRUpdate, defineStore } from 'pinia'

export const useSheetDetailStore = defineStore({
  id: 'sheetDetail',
  
  state: () => ({
    _id: '',
    name: '',
    imgs: ['']
  }),

  actions: {
    dispatchSheet(value: {
      name: string, _id: string, imgs: string[]
    }) {
      this._id = value._id
      this.name = value.name
      this.imgs = value.imgs

      sessionStorage.sheet_detail = JSON.stringify(value)
    },

    clearData() {
      this._id = ''
      this.name = ''
      this.imgs = ['']

      // sessionStorage.sheet_detail = ''
    }
  }
})
  
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSheetDetailStore, import.meta.hot))
}
