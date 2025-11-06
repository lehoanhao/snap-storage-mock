<script setup lang="ts">
import { format } from 'date-fns'
import type { Mail } from '~/types'

defineProps<{
  mail: Mail
}>()

const emits = defineEmits(['close'])

const dropdownItems = [
  [
    {
      label: '未読にする',
      icon: 'i-lucide-check-circle'
    },
    {
      label: '重要マーク',
      icon: 'i-lucide-triangle-alert'
    }
  ]
]
</script>

<template>
  <UDashboardPanel id="inbox-2">
    <UDashboardNavbar :title="mail.subject" :toggle="false">
      <template #leading>
        <UButton
          icon="i-lucide-x"
          color="neutral"
          variant="ghost"
          class="-ms-1.5"
          @click="emits('close')"
        />
      </template>

      <template #right>
        <UDropdownMenu :items="dropdownItems">
          <UButton
            icon="i-lucide-ellipsis-vertical"
            color="neutral"
            variant="ghost"
          />
        </UDropdownMenu>
      </template>
    </UDashboardNavbar>

    <div
      class="flex flex-col items-center sm:flex-row justify-between gap-1 px-4 py-0.5 sm:px-6 border-b border-default"
    >
      <div class="flex items-center gap-2 sm:my-1.5">
        <UAvatar v-bind="mail.from.avatar" :alt="mail.from.name" size="md" />

        <div class="min-w-0 text-sm">
          <p class="font-semibold text-highlighted">
            {{ mail.from.name }}
          </p>
        </div>
      </div>

      <p class="max-sm:pl-16 text-muted text-sm sm:mt-2">
        {{ format(new Date(mail.date), "MM月dd日 HH:mm") }}
      </p>
    </div>

    <div class="flex-1 p-4 sm:p-6 overflow-y-auto">
      <p class="whitespace-pre-wrap text-sm" v-html="mail.body" />
    </div>
  </UDashboardPanel>
</template>
