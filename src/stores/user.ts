import { acceptHMRUpdate, defineStore } from 'pinia'
const BaaS = (window as any).BaaS

export const useUserStore = defineStore({
  id: 'user',

  state: () => ({
    demoUser: true,
    userInfo: {
      id: null,
      _email_verified: false,
    },
    loginPanel: 'login',
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
