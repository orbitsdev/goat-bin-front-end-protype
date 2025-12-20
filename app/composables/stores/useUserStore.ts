import { useUserApi } from '@/composables/api/useUserApi'
import type { User } from '@/types/user'
import type { PaginatedApiResponse } from '@/types/api'

export function useUserStore() {
  const api = useUserApi()

  // state
  const users = ref<PaginatedApiResponse<User> | null>(null)
  const pending = ref(false)

  const page = ref(1)
  const perPage = ref(20)
  const search = ref('')
  const sort = ref('name')
  const order = ref<'asc' | 'desc'>('asc')

  const fetchUsers = async () => {
    pending.value = true

    const { data } = await api.fetchUsers({
      page: page.value,
      per_page: perPage.value,
      search: search.value,
      sort: sort.value,
      order: order.value,
    })

    if (data.value) {
      users.value = data.value
    }

    pending.value = false
  }

  watch([page, perPage, search, sort, order], fetchUsers, {
    immediate: true,
  })

  return {
    users,
    pending,
    page,
    perPage,
    search,
    sort,
    order,
    fetchUsers,
  }
}
