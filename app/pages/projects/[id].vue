<script setup lang="ts">
import type { Task } from '~~/shared/types/task'

definePageMeta({
  middleware: 'auth'
})

const route = useRoute()
const projectId = route.params.id as string

// Fetch tasks with an explicit key 'project-tasks-[id]'
const { data: tasks, refresh } = await useFetch<Task[]>(`/api/projects/${projectId}/tasks`, {
  key: `project-tasks-${projectId}`
})
</script>

<template>
  <div class="max-w-2xl mx-auto p-8">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold">Project Tasks</h1>
      <NuxtLink to="/" class="text-sm text-blue-600 hover:underline">
        ← Back to Dashboard
      </NuxtLink>
    </div>

    <div class="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <p class="text-sm text-blue-800">
        Project ID: <span class="font-mono font-bold">{{ projectId }}</span>
      </p>
    </div>

    <TaskCreator :project-id="projectId" @success="refresh" />

    <ul class="mt-8 space-y-3">
      <li v-for="task in tasks" :key="task.id"
        class="p-4 border rounded-xl bg-white shadow-sm flex items-center justify-between group hover:border-blue-300 transition-colors">
        <span class="text-gray-700 font-medium">{{ task.title }}</span>
        <span v-if="task.isOptimistic"
          class="text-xs font-semibold px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full animate-pulse">
          Saving...
        </span>
      </li>
      <li v-if="!tasks?.length" class="text-center py-12 text-gray-400 italic border-2 border-dashed rounded-xl">
        No tasks yet. Create one above!
      </li>
    </ul>
  </div>
</template>