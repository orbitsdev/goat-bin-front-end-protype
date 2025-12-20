<script setup lang="ts">
import type {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from '@tanstack/vue-table'
import { useDebounceFn } from '@vueuse/core'
import {
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconLayoutColumns,
  IconPlus,
  IconSearch,
} from '@tabler/icons-vue'
import {
  FlexRender,
  getCoreRowModel,
  getSortedRowModel,
  useVueTable,
} from '@tanstack/vue-table'

import { columns } from '@/components/users/columns'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

// ✅ STORE (single source of truth)
import { useUserStore } from '@/composables/stores/useUserStore'

const {
  users,
  pending,
  page,
  search,
  sort,
  order,
  perPage,
} = useUserStore()

// table state
const sorting = ref<SortingState>([])
const columnFilters = ref<ColumnFiltersState>([])
const columnVisibility = ref<VisibilityState>({})
const rowSelection = ref({})

// debounced search
const searchInput = ref(search.value)

const debouncedSearch = useDebounceFn(() => {
  search.value = searchInput.value
  page.value = 1
}, 500)

watch(searchInput, debouncedSearch)

// table instance
const table = useVueTable({
  get data() {
    return users.value?.data ?? []
  },
  columns,
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),

  manualSorting: true,
  manualPagination: true,

  pageCount: users.value?.meta.last_page ?? -1,

  onSortingChange: (updater) => {
    const newSorting =
      typeof updater === 'function'
        ? updater(sorting.value)
        : updater

    sorting.value = newSorting

    const [s] = newSorting
    if (!s) return

    sort.value = s.id
    order.value = s.desc ? 'desc' : 'asc'
  },

  onColumnFiltersChange: (updater) => {
    columnFilters.value =
      typeof updater === 'function'
        ? updater(columnFilters.value)
        : updater
  },

  onColumnVisibilityChange: (updater) => {
    columnVisibility.value =
      typeof updater === 'function'
        ? updater(columnVisibility.value)
        : updater
  },

  onRowSelectionChange: (updater) => {
    rowSelection.value =
      typeof updater === 'function'
        ? updater(rowSelection.value)
        : updater
  },

  state: {
    get sorting() {
      return sorting.value
    },
    get columnFilters() {
      return columnFilters.value
    },
    get columnVisibility() {
      return columnVisibility.value
    },
    get rowSelection() {
      return rowSelection.value
    },
    pagination: {
      pageIndex: (users.value?.meta.current_page ?? 1) - 1,
      pageSize: perPage.value,
    },
  },
})

// pagination helpers
const from = computed(() => {
  if (!users.value || users.value.meta.total === 0) return 0
  return (
    (users.value.meta.current_page - 1) *
      users.value.meta.per_page +
    1
  )
})

const to = computed(() => {
  if (!users.value) return 0
  return Math.min(
    users.value.meta.current_page * users.value.meta.per_page,
    users.value.meta.total
  )
})

function navigateToCreateUser() {
  navigateTo('/admin/users/create')
}
</script>

<template>
  <div class="w-full flex flex-col gap-6 mt-8">
    <!-- Header -->
    <div class="flex items-center justify-between px-4 lg:px-6">
      <div class="relative max-w-sm flex-1">
        <IconSearch
          class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
        />
        <Input
          v-model="searchInput"
          placeholder="Search users..."
          class="pl-9"
        />
      </div>

      <div class="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="outline" size="sm">
              <IconLayoutColumns />
              <span class="hidden lg:inline">Customize Columns</span>
              <IconChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" class="w-56">
            <DropdownMenuCheckboxItem
              v-for="column in table
                .getAllColumns()
                .filter(
                  (column) =>
                    typeof column.accessorFn !== 'undefined' &&
                    column.getCanHide()
                )"
              :key="column.id"
              class="capitalize"
              :model-value="column.getIsVisible()"
              @update:model-value="(v) => column.toggleVisibility(!!v)"
            >
              {{ column.id }}
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="outline" size="sm" @click="navigateToCreateUser">
          <IconPlus />
          <span class="hidden lg:inline">Add User</span>
        </Button>
      </div>
    </div>

    <!-- Table -->
    <div class="px-4 lg:px-6">
      <div class="rounded-lg border overflow-hidden">
        <Table>
          <TableHeader class="bg-muted">
            <TableRow
              v-for="headerGroup in table.getHeaderGroups()"
              :key="headerGroup.id"
            >
              <TableHead
                v-for="header in headerGroup.headers"
                :key="header.id"
              >
                <FlexRender
                  v-if="!header.isPlaceholder"
                  :render="header.column.columnDef.header"
                  :props="header.getContext()"
                />
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow v-if="pending">
              <TableCell :col-span="columns.length" class="h-24 text-center">
                Loading...
              </TableCell>
            </TableRow>

            <TableRow
              v-for="row in table.getRowModel().rows"
              :key="row.id"
            >
              <TableCell
                v-for="cell in row.getVisibleCells()"
                :key="cell.id"
              >
                <FlexRender
                  :render="cell.column.columnDef.cell"
                  :props="cell.getContext()"
                />
              </TableCell>
            </TableRow>

            <TableRow v-if="!pending && !table.getRowModel().rows.length">
              <TableCell :col-span="columns.length" class="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <!-- Pagination -->
      <div
        v-if="users"
        class="flex items-center justify-between mt-4"
      >
        <div class="text-sm text-muted-foreground">
          Showing {{ from }} to {{ to }} of {{ users.meta.total }}
        </div>

        <div class="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            :disabled="users.meta.current_page === 1"
            @click="page = 1"
          >
            <IconChevronsLeft />
          </Button>

          <Button
            variant="outline"
            size="icon"
            :disabled="users.meta.current_page === 1"
            @click="page--"
          >
            <IconChevronLeft />
          </Button>

          <Button
            variant="outline"
            size="icon"
            :disabled="users.meta.current_page === users.meta.last_page"
            @click="page++"
          >
            <IconChevronRight />
          </Button>

          <Button
            variant="outline"
            size="icon"
            :disabled="users.meta.current_page === users.meta.last_page"
            @click="page = users.meta.last_page"
          >
            <IconChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
