// composables/useUsers.ts
import type { User } from '@/types/user'
import type { LaravelPaginator } from '@/types/pagination'

export function useUsers() {
  const page = ref(1)
  const search = ref('')
  const sort = ref('name')
  const order = ref<'asc' | 'desc'>('asc')

  const { data, pending, error, refresh } =
    useSanctumFetch<LaravelPaginator<User>>('/api/users', {
      query: {
        page,
        search,
        sort,
        order,
      },
    })

  return {
    page,
    search,
    sort,
    order,
    data,
    pending,
    error,
    refresh,
  }
}
