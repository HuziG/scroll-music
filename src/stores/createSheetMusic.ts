import { acceptHMRUpdate, defineStore } from 'pinia'

export const useCreateSheetStore = defineStore({
  id: 'createSheetMusic',
  
  state: () => ({
    showCreateModal: false,
    showUploadModal: false,
    _id: '',
    name: '',
    imgs: []
  }),

  actions: {
    setSheetData({
      _id, name, imgs
    }: {
      _id: string, name: string, imgs: []
    }) {
      this._id = _id
      this.name = name
      this.imgs = imgs
    },

    clearStore() {
      this._id = ''
      this.name = ''
      this.imgs = []
    }
  }
})
  
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCreateSheetStore, import.meta.hot))
}
