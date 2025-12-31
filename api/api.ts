import axios from 'axios'
import type { User } from '@/type/type'

const baseUrl = 'https://13282.wu.elitepro.ltd'

// 創建 axios 實例
const apiClient = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 請求攔截器
apiClient.interceptors.request.use(
  (config) => {
    // 可在此添加 token 等認證信息
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 回應攔截器
apiClient.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    console.error('API 錯誤:', error)
    return Promise.reject(error)
  }
)

/**
 * 獲取用戶清單
 */
export const getUserList = () => {
  return apiClient.get<User[]>('/api/user')
}

/**
 * 新增人員
 */
export const createUser = (data: User) => {
  return apiClient.post<User>('/api/user', data)
}

/**
 * 更新人員信息
 */
export const updateUser = (data: User) => {
  return apiClient.put<User>(`/api/user`, data)
}

/**
 * 刪除人員
 */
export const deleteUser = (id: number) => {
  return apiClient.delete('/api/user', { data: { id } })
}
