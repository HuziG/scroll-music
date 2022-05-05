import { acceptHMRUpdate, defineStore } from 'pinia'

export const useCreateSheetStore = defineStore({
  id: 'createSheetMusic',
  
  state: () => ({
    showCreateModal: false,
    showUploadModal: false,
    recordId: '',
    sheetName: '',
    sheetArray: []
  }),

  actions: {
    clearStore() {
      this.recordId = ''
      this.sheetName = ''
      this.sheetArray = []
    }
  }
})
  
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCreateSheetStore, import.meta.hot))
}
