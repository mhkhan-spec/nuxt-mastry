<script setup lang="ts">
// useRoute is auto-imported. No need for: import { useRoute } from 'vue-router'
const route = useRoute()
const projectId = route.params.id
</script>

<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold">Project Details</h1>
    <p class="mt-4 p-4 bg-blue-50 border border-blue-200 rounded">
      Current Project ID: <span class="font-mono text-blue-700">{{ projectId }}</span>
    </p>
    <NuxtLink to="/" class="mt-4 inline-block text-sm text-gray-500">
      ← Back to Dashboard
    </NuxtLink>
  </div>
</template>