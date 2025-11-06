<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

defineProps<{
  collapsed?: boolean
}>()

const teams = ref([
  {
    label: 'Snap Storage',
    avatar: {
      src: 'https://api.dicebear.com/7.x/shapes/svg?seed=SnapStorage',
      alt: 'Snap Storage logo'
    }
  },
  {
    label: 'Snap Storage Ops',
    avatar: {
      src: 'https://api.dicebear.com/7.x/shapes/svg?seed=SnapStorageOps',
      alt: 'Snap Storage Ops'
    }
  },
  {
    label: 'Snap Storage QA',
    avatar: {
      src: 'https://api.dicebear.com/7.x/shapes/svg?seed=SnapStorageQA',
      alt: 'Snap Storage QA'
    }
  }
])
const selectedTeam = ref(teams.value[0])

const items = computed<DropdownMenuItem[][]>(() => {
  return [
    teams.value.map(team => ({
      ...team,
      onSelect() {
        selectedTeam.value = team
      }
    })),
    [
      {
        label: 'Create team',
        icon: 'i-lucide-circle-plus'
      },
      {
        label: 'Manage teams',
        icon: 'i-lucide-cog'
      }
    ]
  ]
})
</script>

<template>
  <UButton
    v-bind="{
      ...selectedTeam,
      label: collapsed ? undefined : selectedTeam?.label,
      trailingIcon: collapsed ? undefined : 'i-lucide-chevrons-up-down'
    }"
    color="neutral"
    variant="ghost"
    block
    :square="collapsed"
    class="data-[state=open]:bg-elevated"
    :class="[!collapsed && 'py-2']"
    :ui="{
      trailingIcon: 'text-dimmed'
    }"
  />
</template>
