<script setup lang="ts">
import type { Component } from "vue"
import { IconCirclePlusFilled, IconMail } from "@tabler/icons-vue"

import { Button } from '@/components/ui/button'
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

interface NavItem {
  title: string
  url: string
  icon?: Component
}

defineProps<{
  items: NavItem[]
}>()
</script>

<template>
  <SidebarGroup>
    <SidebarGroupContent class="flex flex-col gap-2">
      <!-- <SidebarMenu>
        <SidebarMenuItem class="flex items-center gap-2">
          <SidebarMenuButton
            tooltip="Quick Create"
            class="active-link"
          >
            <IconCirclePlusFilled />
            <span>Quick Create</span>
          </SidebarMenuButton>
          <Button
            size="icon"
            class="size-8 group-data-[collapsible=icon]:opacity-0"
            variant="outline"
          >
            <IconMail />
            <span class="sr-only">Inbox</span>
          </Button>
        </SidebarMenuItem>
      </SidebarMenu> -->
      <SidebarMenu>
        <SidebarMenuItem v-for="item in items" :key="item.title">
          <NuxtLink :to="item.url" v-slot="{ isActive, isExactActive }">
            <SidebarMenuButton :tooltip="item.title" :class="{ 'active-link': isActive }">
              <component :is="item.icon" v-if="item.icon" />
              <span>{{ item.title }}</span>
            </SidebarMenuButton>
          </NuxtLink>
        </SidebarMenuItem>
      </SidebarMenu>

    </SidebarGroupContent>
  </SidebarGroup>
</template>
