import { acceptHMRUpdate, defineStore } from 'pinia'

export const useCreateSheetStore = defineStore({
  id: 'createSheet',
  state: () => ({
    showUploadModal: false,
    sheetArray: []
  }),
})
  
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCreateSheetStore, import.meta.hot))
}
