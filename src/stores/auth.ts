import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { Roles } from '@/common/const'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const user: any = ref()

    const setUser = (data: any) => {
      user.value = data
    }

    const isAdmin = computed(() => user.value.profile.roleId === Roles.ADMIN)

    return { user, setUser, isAdmin }
  },
  {
    persist: true
  }
)
