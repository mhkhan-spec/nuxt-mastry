<script setup lang="ts">
definePageMeta({
  // This tells Nuxt to run app/middleware/auth.ts before entering this page
  middleware: 'auth'
})

// Nuxt infers the type of 'projects' from server/api/projects.get.ts!
// 'refresh' allows us to trigger a re-fetch manually
const { data: projects, status, error, refresh } = await useFetch('/api/projects', {
    // The 'key' ensures data is cached and shared across components
    key: 'all-projects',
    // Transform allows you to modify data before it hits the component
    transform: (data) => data.map(p => ({ ...p, fetchedAt: new Date() }))
})
</script>

<template>
    <div class="p-8">
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-3xl font-bold">Project Explorer</h1>
            <button @click="refresh()" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                :disabled="status === 'pending'">
                {{ status === 'pending' ? 'Refreshing...' : 'Refresh Data' }}
            </button>
        </div>

        <div v-if="error" class="text-red-500">
            Error loading projects: {{ error.message }}
        </div>

        <div v-else class="grid gap-4 md:grid-cols-3">
            <div v-for="project in projects" :key="project.id"
                class="p-4 border rounded-lg shadow-sm hover:shadow-md transition">
                <h2 class="font-semibold text-xl">{{ project.name }}</h2>
                <p class="text-gray-600 text-sm mb-2">{{ project.description }}</p>
                <span :class="project.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'"
                    class="px-2 py-1 rounded text-xs uppercase font-bold">
                    {{ project.status }}
                </span>
            </div>
        </div>
    </div>
</template>