import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const user: any = ref()

    const setUser = (data: any) => {
      user.value = data
    }

    return { user, setUser }
  },
  {
    persist: true
  }
)
