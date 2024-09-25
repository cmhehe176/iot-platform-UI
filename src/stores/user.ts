import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const listUser: any = ref()
  const listAdmin: any = ref()

  const setListUser = (data: any) => {
    listUser.value = data
  }

  const setListAdmin = (data: any) => {
    listUser.value = data
  }

  return { listUser, setListUser, listAdmin, setListAdmin }
})
