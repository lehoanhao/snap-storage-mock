<script setup lang="ts">
import { format, isToday } from 'date-fns'
import type { Fax } from '~/types'

const props = defineProps<{
  faxes: Fax[]
}>()

const faxRefs = ref<Element[]>([])

const selectedFax = defineModel<Fax | null>()

watch(selectedFax, () => {
  if (!selectedFax.value) {
    return
  }

  const target = faxRefs.value[selectedFax.value.id]

  if (target) {
    target.scrollIntoView({ block: 'nearest' })
  }
})

defineShortcuts({
  arrowdown: () => {
    const index = props.faxes.findIndex(fax => fax.id === selectedFax.value?.id)

    if (index === -1) {
      selectedFax.value = props.faxes[0]
    } else if (index < props.faxes.length - 1) {
      selectedFax.value = props.faxes[index + 1]
    }
  },
  arrowup: () => {
    const index = props.faxes.findIndex(fax => fax.id === selectedFax.value?.id)

    if (index === -1) {
      selectedFax.value = props.faxes[props.faxes.length - 1]
    } else if (index > 0) {
      selectedFax.value = props.faxes[index - 1]
    }
  }
})
</script>

<template>
  <div class="overflow-y-auto divide-y divide-default">
    <div
      v-for="(fax, index) in faxes"
      :key="index"
      :ref="el => { faxRefs[fax.id] = el as Element }"
    >
      <div
        class="p-4 sm:px-6 text-sm cursor-pointer border-l-2 transition-colors"
        :class="[
          fax.unread ? 'text-highlighted' : 'text-toned',
          selectedFax && selectedFax.id === fax.id
            ? 'border-primary bg-primary/10'
            : 'border-(--ui-bg) hover:border-primary hover:bg-primary/5'
        ]"
        @click="selectedFax = fax"
      >
        <div class="flex items-center justify-between flex-row truncate overflow-hidden" :class="[fax.unread && 'font-semibold']">
          <div class="flex flex-col sm:flex-row sm:items-center sm:gap-3">
            <span>{{ fax.sender.name }}</span>
            <span class="text-xs text-muted sm:border-s sm:ps-3">
              {{ fax.sender.number }}
            </span>

            <UChip v-if="fax.unread" color="error" class="sm:ms-2" />
          </div>

          <span class="text-xs">
            {{
              isToday(new Date(fax.receivedAt))
                ? format(new Date(fax.receivedAt), 'HH:mm')
                : format(new Date(fax.receivedAt), 'yyyy年MM月dd日')
            }}
          </span>
        </div>
        <p class="truncate" :class="[fax.unread && 'font-semibold']">
          {{ fax.subject }}（{{ fax.pages }}枚）
        </p>
        <p class="text-dimmed line-clamp-1">
          {{ fax.summary }}
        </p>
      </div>
    </div>
  </div>
</template>
