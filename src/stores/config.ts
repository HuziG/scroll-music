import { acceptHMRUpdate, defineStore } from 'pinia'
import { addValue, getValue } from '~/api/base'
import { TABLE_NAME } from '~/config'

export const useConfigStore = defineStore({
  id: 'config',

  state: () => ({
    userConfig: {
      _id: null,
      index_bg_img: '',
      main_color: '',
    },
  }),

  actions: {
    async requestUserConfig() {
      if (this.userConfig._id)
        return false

      const { objects } = await getValue(TABLE_NAME.userConfig, 'user_id', JSON.parse(localStorage.ifx_baas_uid).value)

      if (objects.length === 0)
        addValue(TABLE_NAME.userConfig)
      else
        this.userConfig = objects[0]
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useConfigStore, import.meta.hot))
