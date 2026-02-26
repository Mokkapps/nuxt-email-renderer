<script setup lang="ts">
import { consola } from 'consola'
import BaseButton from './BaseButton.vue'

interface Props {
  html: string
  subject?: string | null
}
const props = defineProps<Props>()

const isLoading = ref(false)
const showDialog = ref(false)
const email = ref('')

const sendTestEmail = async () => {
  isLoading.value = true

  try {
    if (!email.value) {
      return
    }

    const response = await fetch('https://react.email/api/send/test', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: email.value,
        subject: props.subject || 'Test Email from Nuxt Email Renderer',
        html: props.html,
      }),
    })

    if (response.status === 429) {
      const { error } = await response.json()
      consola.error(`Error sending test email: ${error}`)

      showDialog.value = false

      devtoolsUiShowNotification({
        message: 'Too many requests',
        icon: 'i-carbon-warning',
        classes: 'text-red',
      })
    }

    if (response.status === 200) {
      showDialog.value = false

      devtoolsUiShowNotification({
        message: 'Email sent successfully',
        icon: 'i-carbon-checkmark',
        classes: 'text-green',
      })
    }
  }
  catch (error) {
    consola.error('Error sending test email:', error)

    showDialog.value = false

    devtoolsUiShowNotification({
      message: 'Something went wrong. Please try again.',
      icon: 'i-carbon-warning',
      classes: 'text-red',
    })
  }
  finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <BaseButton
      :is-loading="isLoading"
      icon="carbon:email"
      @click="showDialog = true"
    >
      Send
    </BaseButton>
  </div>
  <NDialog
    v-model="showDialog"
    class="min-w-100 flex flex-col gap-4 p4"
  >
    <h1 text-xl>
      Send Test Email
    </h1>
    <NTextInput
      v-model="email"
      placeholder="you@email.com"
      type="email"
    />
    <div>
      <BaseButton
        :is-loading="isLoading"
        icon="carbon:send"
        @click="sendTestEmail"
      >
        Send
      </BaseButton>
    </div>
  </NDialog>
</template>
