import type { PaginationMeta } from './pagination'

export interface PaginatedApiResponse<T> {
  status: boolean
  message: string
  data: T[]
  meta: PaginationMeta
}
