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

const prefetchProject = (id: string): void => {
    console.log(`Prefetching tasks for project ${id}...`)
    // This loads the data into the 'project-tasks-[id]' key in the background
    // We use lazy: true to not block the current execution
    useFetch(`/api/projects/${id}/tasks`, {
        key: `project-tasks-${id}`,
        lazy: true
    })
}
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

        <ProjectCreator @success="refresh" />

        <div v-if="error" class="text-red-500">
            Error loading projects: {{ error.message }}
        </div>

        <div v-else class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div v-for="project in projects" :key="project.id"
                class="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div class="flex justify-between items-start mb-4">
                    <h2 class="font-bold text-xl text-gray-800 group-hover:text-blue-600 transition-colors">{{
                        project.name }}</h2>
                    <span
                        :class="project.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'"
                        class="px-2.5 py-1 rounded-full text-[10px] uppercase font-black tracking-wider">
                        {{ project.status }}
                    </span>
                </div>
                <p class="text-gray-500 text-sm mb-6 line-clamp-2 leading-relaxed">{{ project.description }}</p>

                <div class="flex items-center justify-between">
                    <NuxtLink :to="`/projects/${project.id}`"
                        class="text-sm font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 group/link"
                        @mouseenter="() => prefetchProject(project.id.toString())">
                        View Tasks
                        <span class="group-hover/link:translate-x-1 transition-transform">→</span>
                    </NuxtLink>
                    <span class="text-[10px] text-gray-400 font-medium italic">Prefetch enabled</span>
                </div>
            </div>
        </div>
    </div>
</template>