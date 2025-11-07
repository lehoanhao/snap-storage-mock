<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { breakpointsTailwind } from '@vueuse/core'
import type { Fax } from '~/types'

const tabItems = [
  {
    label: '全て',
    value: 'all'
  },
  {
    label: '未読',
    value: 'unread'
  }
]
const selectedTab = ref('all')

const { data: faxes } = await useFetch<Fax[]>('/api/faxes', {
  default: () => []
})

// Filter faxes based on the selected tab
const filteredFaxes = computed(() => {
  if (selectedTab.value === 'unread') {
    return faxes.value.filter(fax => !!fax.unread)
  }

  return faxes.value
})

const selectedFax = ref<Fax | null>()

const isFaxPanelOpen = computed({
  get() {
    return !!selectedFax.value
  },
  set(value: boolean) {
    if (!value) {
      selectedFax.value = null
    }
  }
})

// Reset selected fax if it's not in the filtered faxes
watch(filteredFaxes, () => {
  if (!filteredFaxes.value.find(fax => fax.id === selectedFax.value?.id)) {
    selectedFax.value = null
  }
})

const breakpoints = useBreakpoints(breakpointsTailwind)
const isMobile = breakpoints.smaller('lg')

const showFull = ref(false)
</script>

<template>
  <UDashboardPanel
    id="inbox-1"
    class="scrollbar-thin transition-all duration-300"
    :class="{
      '!w-56 min-w-0 flex-none': showFull && selectedFax
    }"
  >
    <UDashboardNavbar title="FAX受信一覧">
      <template #leading>
        <UDashboardSidebarCollapse />
      </template>
      <template #trailing>
        <UBadge v-if="!(showFull && selectedFax)" :label="filteredFaxes.length" variant="subtle" />
      </template>

      <template #right>
        <UTabs
          v-if="!(showFull && selectedFax)"
          v-model="selectedTab"
          :items="tabItems"
          :content="false"
          size="xs"
        />
      </template>
    </UDashboardNavbar>
    <FaxList
      v-model="selectedFax"
      :faxes="filteredFaxes"
      class="flex-1 w-full"
    />
  </UDashboardPanel>

  <FaxDetail
    v-if="selectedFax"
    v-model:show-full="showFull"
    :fax="selectedFax"
    @close="selectedFax = null"
  />

  <ClientOnly>
    <USlideover v-if="isMobile" v-model:open="isFaxPanelOpen">
      <template #content>
        <FaxDetail
          v-if="selectedFax"
          :fax="selectedFax"
          @close="selectedFax = null"
        />
      </template>
    </USlideover>
  </ClientOnly>
  <BaseRightSideBar />
</template>
