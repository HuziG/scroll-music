import { acceptHMRUpdate, defineStore } from 'pinia';
import { deepClone } from '~/utils/utils';

export const useCreateSheetStore = defineStore({
  id: 'createSheetMusic',

  state: () => ({
    showCreateModal: false,
    showUploadModal: false,
    sheetData: {
      _id: '',
      imgs: [],
      name: '',
    },
  }),

  actions: {
    setSheetData(value: any) {
      this.sheetData = deepClone({ ...this.sheetData, ...value });
    },

    clearStore() {
      this.sheetData = {
        _id: '',
        imgs: [],
        name: '',
      };
    },
  },
});

if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useCreateSheetStore, import.meta.hot));
