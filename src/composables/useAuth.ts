import api from '@/common/api'
import { useAuthStore } from '@/stores/auth'
import { ElMessage } from 'element-plus'

export const useAuth = () => {
  const auth = useAuthStore()

  const Login = async (data: { username: string; password: string }) => {
    try {
      const response = await api.post('/auth/login', data)

      if (response.data.accessToken) {
        localStorage.setItem('accessToken', response.data.accessToken)
        await getProfile()
        ElMessage.success('Đăng nhập thành công!')
      }

      return response
    } catch {
      ElMessage.error('Mật khẩu hoặc tài khoản không chính xác !')
    }
  }

  const getProfile = async () => {
    try {
      const response = await api.get('/auth')

      if (response.data) {
        auth.setUser(response.data)

        return response.data
      }

      return response
    } catch (error: any) {
      ElMessage.error(error.code)
    }
  }

  const LogOut = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('auth')
  }

  return {
    Login,
    getProfile,
    LogOut
  }
}
