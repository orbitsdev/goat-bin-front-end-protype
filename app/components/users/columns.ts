// components/users/columns.ts
import type { ColumnDef } from '@tanstack/vue-table'
import type { User } from '@/types/user'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import {
  IconDotsVertical,
  IconArrowUp,
  IconArrowDown,
} from '@tabler/icons-vue'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export const columns: ColumnDef<User>[] = [
  {
    id: 'select',
    header: ({ table }) => h(Checkbox, {
      modelValue: table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate'),
      'onUpdate:modelValue': (value) => table.toggleAllPageRowsSelected(!!value),
      'aria-label': 'Select all',
    }),
    cell: ({ row }) => h(Checkbox, {
      modelValue: row.getIsSelected(),
      'onUpdate:modelValue': (value) => row.toggleSelected(!!value),
      'aria-label': 'Select row',
    }),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => h('div', { class: 'font-medium' }, String(row.getValue('name'))),
    enableHiding: false,
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => h('div', { class: 'text-muted-foreground' }, String(row.getValue('email'))),
  },
  {
    accessorKey: 'created_at',
    header: 'Created',
    cell: ({ row }) => {
      const date = new Date(row.getValue('created_at'))
      return h('div', {}, date.toLocaleDateString())
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const user = row.original
      return h(DropdownMenu, {}, {
        default: () => [
          h(DropdownMenuTrigger, { asChild: true }, {
            default: () => h(Button, {
              variant: 'ghost',
              class: 'h-8 w-8 p-0',
            }, {
              default: () => [
                h('span', { class: 'sr-only' }, 'Open menu'),
                h(IconDotsVertical, { class: 'h-4 w-4' }),
              ],
            }),
          }),
          h(DropdownMenuContent, { align: 'end' }, {
            default: () => [
              h(DropdownMenuItem, { 
                onClick: () => console.log('View', user.id) 
              }, () => 'View details'),
              h(DropdownMenuItem, { 
                onClick: () => console.log('Edit', user.id) 
              }, () => 'Edit'),
              h(DropdownMenuSeparator),
              h(DropdownMenuItem, { 
                class: 'text-destructive',
                onClick: () => console.log('Delete', user.id) 
              }, () => 'Delete'),
            ],
          }),
        ],
      })
    },
  },
]