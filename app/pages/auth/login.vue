<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

definePageMeta({
  layout: 'auth'
})

useSeoMeta({
  title: 'Login',
  description: 'Login to your account to continue'
})

const fields = [
  {
    name: 'userId',
    type: 'text' as const,
    placeholder: 'ユーザーIDを入力',
    required: true,
    size: 'xl',
    ui: {
      base: '!rounded-full'
    }
  },
  {
    name: 'password',
    type: 'password' as const,
    placeholder: 'パスワードを入力',
    required: true,
    size: 'xl',
    ui: {
      base: '!rounded-full'
    }
  },
  {
    name: 'remember',
    label: 'ログイン状態を保持する',
    type: 'checkbox' as const,
    size: 'md'
  }
]

const schema = z.object({
  userId: z
    .string({
      error: 'ユーザーIDは必須です'
    })
    .min(5, '無効なユーザーIDです'),
  password: z
    .string({
      error: 'パスワードは必須です'
    })
    .min(8, 'パスワードは8文字以上である必要があります')
})

type Schema = z.output<typeof schema>

const error = ref<string | null>(null)

function onSubmit(payload: FormSubmitEvent<Schema>) {
  // mock check user is pnladmin and password is admin1234
  if (
    payload.data.userId !== 'pnladmin'
    || payload.data.password !== 'admin1234'
  ) {
    error.value = 'Invalid credentials'
    return
  }
  navigateTo('/')
}
</script>

<template>
  <UAuthForm
    :fields="fields"
    :schema="schema"
    title="おかえりなさい"
    icon="i-lucide-lock"
    :submit="{
      class: 'hidden'
    }"
    :ui="{
      input: '!rounded-full'
    }"
    @submit="onSubmit"
  >
    <template #password-hint>
      <ULink
        to="/"
        class="text-primary font-medium"
        tabindex="-1"
      >Forgot password?</ULink>
    </template>
    <template #validation>
      <UAlert
        v-if="error"
        color="error"
        variant="subtle"
        title="認証エラー"
        icon="i-lucide-info"
      >
        <template #description>
          ユーザーIDまたはパスワードが正しくありません。<br>
          <div class="text-xs">
            ※30分以内に5回間違えた場合 再入力が30分間出来ません。
          </div>
        </template>
      </UAlert>
    </template>
    <template #footer>
      <ULink to="/" class="text-primary font-medium">お問合せはこちら</ULink>
    </template>
  </UAuthForm>
</template>
