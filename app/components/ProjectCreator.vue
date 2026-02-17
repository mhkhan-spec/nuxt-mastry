<script setup lang="ts">
import type { Project } from '~~/shared/types/project'

const emit = defineEmits(['success'])

const projectName = ref('')
const projectDescription = ref('')
const isSubmitting = ref(false)

const { data: cachedProjects } = useNuxtData<Project[]>('all-projects')

async function createProject() {
    if (!projectName.value.trim()) return

    isSubmitting.value = true
    const name = projectName.value
    const description = projectDescription.value

    // 1. Capture current state for rollback
    const previousProjects = [...(cachedProjects.value || [])]

    // 2. Optimistic Update
    const tempId = Math.floor(Math.random() * -10000) // Negative ID for optimistic items
    const optimisticProject: any = {
        id: tempId,
        name,
        description,
        status: 'active',
        isOptimistic: true,
        tasks: []
    }

    cachedProjects.value = [optimisticProject, ...previousProjects]

    // Clear form
    projectName.value = ''
    projectDescription.value = ''

    try {
        // 3. Background Network Call
        await $fetch('/api/projects', {
            method: 'POST',
            body: { name, description }
        })

        // 4. Final Sync
        emit('success')
    } catch (e) {
        // 5. ROLLBACK on error
        cachedProjects.value = previousProjects
        alert('Failed to create project. Rolling back...')
    } finally {
        isSubmitting.value = false
    }
}
</script>

<template>
    <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mb-8">
        <h3 class="text-lg font-bold text-gray-800 mb-4">Start New Project</h3>
        <div class="grid gap-4 md:grid-cols-[1fr_2fr_auto] items-end">
            <div>
                <label class="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Project
                    Name</label>
                <input v-model="projectName" placeholder="e.g. Acme Dashboard"
                    class="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
                    @keyup.enter="createProject" />
            </div>
            <div>
                <label
                    class="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Description</label>
                <input v-model="projectDescription" placeholder="Briefly describe the objective..."
                    class="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
                    @keyup.enter="createProject" />
            </div>
            <button @click="createProject" :disabled="isSubmitting || !projectName.trim()"
                class="px-8 py-2 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transition-all shadow-lg shadow-blue-500/20">
                {{ isSubmitting ? 'Creating...' : 'Create Project' }}
            </button>
        </div>
    </div>
</template>
