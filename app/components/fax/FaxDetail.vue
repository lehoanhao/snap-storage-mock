<script setup lang="ts">
import { format } from 'date-fns'
import type { Fax } from '~/types'
import VuePdfEmbed from 'vue-pdf-embed'
import type { NavigationMenuItem } from '@nuxt/ui'
import 'vue-pdf-embed/dist/styles/annotationLayer.css'
import 'vue-pdf-embed/dist/styles/textLayer.css'

defineProps<{
  fax: Fax
}>()

const modelValue = defineModel<boolean>('showFull')
const emits = defineEmits(['close'])

const dropdownItems = [
  [
    {
      label: '未読にする',
      icon: 'i-lucide-check-circle'
    },
    {
      label: 'ダウンロード',
      icon: 'i-lucide-download'
    }
  ]
]

const toggleShowFull = () => {
  modelValue.value = !modelValue.value
}

const buttons = [
  {
    icon: 'i-mdi-hide-outline',
    label: '非表示に移動',
    color: 'neutral',
    variant: 'outline'
  },
  // ダウンロードボタンを追加
  {
    icon: 'i-lucide-download',
    label: 'ダウンロード',
    color: 'primary',
    variant: 'subtle'
  },
  // 印刷
  {
    icon: 'i-lucide-printer',
    label: '印刷',
    color: 'info',
    variant: 'subtle'
  }
]

const pdfSource = '/sample.pdf'
</script>

<template>
  <UDashboardPanel id="fax-detail">
    <UDashboardNavbar :title="fax.subject" :toggle="false">
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
        <UButton
          :icon="modelValue ? 'i-iconoir-collapse' : 'i-pixel-expand'"
          color="neutral"
          variant="ghost"
          @click="toggleShowFull"
        />
        <UDropdownMenu :items="dropdownItems">
          <UButton
            icon="i-lucide-ellipsis-vertical"
            color="neutral"
            variant="ghost"
          />
        </UDropdownMenu>
      </template>
    </UDashboardNavbar>
    <div class="border-b border-default px-3 py-2">
      <div class="flex flex-row gap-4 justify-end items-center">
        <UButton
          v-for="(button, index) in buttons"
          :key="index"
          :icon="button.icon"
          :color="button.color"
          :variant="button.variant"
          class="justify-center"
          :label="button.label"
        />
      </div>
    </div>
    <div class="flex flex-col gap-3 px-4 py-3 sm:px-6 sm:py-4 border-b border-default text-sm">
      <div class="flex flex-wrap items-center gap-x-3 gap-y-1">
        <span class="font-semibold text-highlighted">送信元</span>
        <span>{{ fax.sender.name }}</span>
        <span class="text-muted text-xs">({{ fax.sender.number }})</span>
        <span v-if="fax.sender.company" class="text-xs text-muted">{{ fax.sender.company }}</span>
        <span v-if="fax.sender.department" class="text-xs text-muted">{{ fax.sender.department }}</span>
      </div>
      <div class="flex flex-wrap items-center gap-3 text-xs text-muted">
        <span>{{ format(new Date(fax.receivedAt), 'yyyy年MM月dd日 HH:mm') }}</span>
        <span>ページ数: {{ fax.pages }}</span>
      </div>
    </div>

    <div class="flex-1 p-4 sm:p-6 overflow-y-auto">
      <p class="whitespace-pre-wrap text-sm" v-html="fax.content" />
      <div class="border border-default mt-4">
        <VuePdfEmbed
          :key="modelValue + 'pdf'"
          text-layer
          :source="pdfSource"
          :scale="0.8"
          annotation-layer
        />
      </div>
    </div>
  </UDashboardPanel>
</template>
