import { acceptHMRUpdate, defineStore } from 'pinia'

export const useSheetDetailStore = defineStore({
  id: 'sheetDetail',
  
  state: () => ({
    _id: '',
    name: '',
    speed: 0,
    imgs: ['']
  }),

  actions: {
    dispatchSheet(value: {
      name: string, _id: string, imgs: string[], speed: number
    }) {
      this._id = value._id
      this.name = value.name
      this.imgs = value.imgs
      this.speed = value.speed

      sessionStorage.sheet_detail = JSON.stringify(value)
    },

    dispatchSpeed(speed: number) {
      this.speed = speed
      
      sessionStorage.sheet_detail = JSON.stringify({
        _id: this._id,
        name: this.name,
        imgs: this.imgs,
        speed: this.speed
      })
    },

    clearData() {
      this._id = ''
      this.name = ''
      this.speed = 0
      this.imgs = ['']
    }
  }
})
  
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSheetDetailStore, import.meta.hot))
}
