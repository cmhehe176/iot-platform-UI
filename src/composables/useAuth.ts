import api from '@/common/api'
import { ElMessage } from 'element-plus'

export const useAuth = () => {
  const Login = async (data: { username: string; password: string }) => {
    try {
      const response = await api.post('/auth/login', data)

      if (response.data.accessToken) {
        localStorage.setItem('accessToken', response.data.accessToken)
        ElMessage.success('Đăng nhập thành công!')
      }

      return response
    } catch {
      ElMessage.error('Mật khẩu hoặc tài khoản không chính xác !')
    }
  }

  return {
    Login
  }
}
