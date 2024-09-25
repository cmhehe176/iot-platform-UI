import api from '@/common/api'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'
import { Roles } from '@/common/const'

export const useUser = () => {
  const userStore = useUserStore()

  const getListUser = async (roleId: number) => {
    try {
      const response = await api.get(`/user/role/${roleId}`)

      if (response) {
        switch (roleId) {
          case Roles.SUPER_ADMIN:
          case Roles.ADMIN:
            return userStore.setListAdmin(response.data.items)
          case Roles.USER:
            return userStore.setListUser(response.data.items)

          default:
            break
        }

        return response
      }
    } catch {
      ElMessage.error('Get List User Failed !')
    }
  }

  return {
    getListUser
  }
}
