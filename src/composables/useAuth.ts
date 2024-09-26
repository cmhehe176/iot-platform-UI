import api from '@/common/api'
import { useAuthStore } from '@/stores/auth'
import { useProjectStore } from '@/stores/project'
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

  const Register = async (data: {
    name: string
    email: string
    telephone: string
    password: string
  }) => {
    try {
      const response = await api.post('/auth/register', data)

      if (response) ElMessage.success('Đăng ký thành công!')

      return response
    } catch {
      ElMessage.error('Email hoặc số điện thoại của bạn đã có người đăng ký  !')
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
    auth.$reset()
    useProjectStore().$reset()
    localStorage.removeItem('accessToken')
    localStorage.removeItem('auth')
  }

  return {
    Login,
    getProfile,
    LogOut,
    Register
  }
}
