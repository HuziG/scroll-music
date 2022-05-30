import BaaS from 'minapp-sdk'
import { acceptHMRUpdate, defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'user',

  state: () => ({
    userInfo: {
      id: null,
      _email_verified: false,
    },
  }),

  actions: {
    async requestUserInfo() {
      if (!this.userInfo.id) {
        const data = await BaaS.auth.getCurrentUser()
        this.userInfo = data
      }
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
