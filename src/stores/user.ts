import { acceptHMRUpdate, defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { getUrlParams } from '~/utils/utils'
const BaaS = window.BaaS

export const useUserStore = defineStore({
  id: 'user',

  state: () => ({
    demoUser: false,
    userInfo: {
      id: null,
      _email_verified: false,
    },
  }),

  actions: {
    setDemoUser() {
      // this.demoUser = getUrlParams('user') === 'demo'
    },

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
