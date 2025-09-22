<script setup lang="ts">
const html = ref('')
const loading = ref(false)
const selectedEmail = ref('')
const emailTemplates = ref([])
const loadingTemplates = ref(true)

// Fetch available email templates on component mount
onMounted(async () => {
  try {
    const templates = await $fetch('/api/emails/list')
    if (Array.isArray(templates)) {
      emailTemplates.value = templates
      // Select the first template by default
      if (templates.length > 0) {
        selectedEmail.value = templates[0].name
      }
    }
  } catch (error) {
    console.error('Error fetching email templates:', error)
  } finally {
    loadingTemplates.value = false
  }
})

const renderEmail = async () => {
  if (!selectedEmail.value) return

  loading.value = true
  try {
    const response = await $fetch('/api/emails/render', {
      query: {
        name: selectedEmail.value
      }
    })
    html.value = response
    console.log('Email rendered successfully:', response)
  }
  catch (error) {
    console.error('Error rendering email:', error)
    html.value = `<p style="color: red;">Error rendering email: ${error.statusMessage || error.message}</p>`
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b border-slate-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
          </div>
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Email Template Playground</h1>
            <p class="text-gray-600 text-sm">Preview and test your Vue email components</p>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Template Selection Card -->
      <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
        <div class="flex items-center mb-4">
          <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
            <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </div>
          <h2 class="text-xl font-semibold text-gray-900">Select Email Template</h2>
        </div>

        <div v-if="loadingTemplates" class="flex items-center space-x-3 py-4">
          <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
          <span class="text-gray-600">Loading email templates...</span>
        </div>

        <div v-else-if="emailTemplates.length > 0" class="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
          <div class="flex-1 min-w-0">
            <label for="email-select" class="block text-sm font-medium text-gray-700 mb-2">
              Choose a template to render
            </label>
            <select
              id="email-select"
              v-model="selectedEmail"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 shadow-sm transition-colors"
            >
              <option value="" class="text-gray-500">Select an email template</option>
              <option
                v-for="template in emailTemplates"
                :key="template.name"
                :value="template.name"
                class="text-gray-900"
              >
                {{ template.displayName }}
              </option>
            </select>
          </div>

          <button
            @click="renderEmail"
            :disabled="!selectedEmail || loading"
            class="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg shadow-sm hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2"
          >
            <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
            </svg>
            <span>{{ loading ? 'Rendering...' : 'Render Email' }}</span>
          </button>
        </div>

        <div v-else class="flex items-center space-x-3 py-4 px-4 bg-amber-50 border border-amber-200 rounded-lg">
          <svg class="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
          </svg>
          <span class="text-amber-700">No email templates found in the emails directory.</span>
        </div>
      </div>

      <!-- Results Section -->
      <div v-if="html" class="space-y-6">
        <!-- Success Banner -->
        <div class="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
          <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span class="text-green-800 font-medium">Email rendered successfully!</span>
        </div>

        <!-- Preview and Source Code -->
        <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <!-- Visual Preview -->
          <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div class="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div class="flex items-center space-x-3">
                <div class="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                  </svg>
                </div>
                <h3 class="text-lg font-medium text-gray-900">Visual Preview</h3>
              </div>
            </div>
            <div class="p-6">
              <div
                v-html="html"
                class="bg-white border border-gray-200 rounded-lg p-6 min-h-64 shadow-inner"
              ></div>
            </div>
          </div>

          <!-- HTML Source -->
          <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div class="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <div class="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                    </svg>
                  </div>
                  <h3 class="text-lg font-medium text-gray-900">HTML Source</h3>
                </div>
                <button
                  @click="navigator.clipboard.writeText(html)"
                  class="text-sm text-gray-500 hover:text-gray-700 flex items-center space-x-1 transition-colors"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                  </svg>
                  <span>Copy</span>
                </button>
              </div>
            </div>
            <div class="p-6">
              <textarea
                :value="html"
                readonly
                class="w-full h-96 bg-gray-900 text-gray-100 rounded-lg p-4 text-sm leading-relaxed font-mono shadow-inner border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none overflow-y-auto"
                placeholder="Rendered HTML will appear here..."
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="mt-16 bg-white border-t border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <p class="text-center text-gray-500 text-sm">
          Built with
          <span class="text-blue-600 font-medium">Nuxt Email Module</span>
          • Powered by Vue.js & Tailwind CSS
        </p>
      </div>
    </footer>
  </div>
</template>
