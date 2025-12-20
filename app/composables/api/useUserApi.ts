import type { PaginatedApiResponse } from '@/types/api'
import type { User } from '@/types/user'

export function useUserApi() {
  const fetchUsers = (params: {
    page?: number
    per_page?: number
    search?: string
    sort?: string
    order?: 'asc' | 'desc'
  }) => {
    return useSanctumFetch<PaginatedApiResponse<User>>('/api/users', {
      method: 'GET',
      query: params,
    })
  }

  const createUser = (payload: {
    name: string
    email: string
    password: string
    role: string
  }) => {
    return useSanctumFetch('/api/users', {
      method: 'POST',
      body: payload,
    })
  }

  return {
    fetchUsers,
    createUser,
  }
}
