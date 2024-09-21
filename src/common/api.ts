import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API,
  timeout: 3000
})

api.interceptors.request.use((request) => {
  const accessToken = localStorage.getItem('accessToken')

  if (accessToken) {
    request.headers.Authorization = `Bearer ${accessToken}`
  }

  return request
})

api.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        localStorage.clear()
        window.location.href = '/login'
      }
      return Promise.reject(error.response.data)
    }
    return Promise.reject(error)
  }
)

export default api
