<script setup lang="ts">

const props = defineProps<{ projectId: string }>()
const emit = defineEmits(['success'])

const newTaskTitle = ref('')
const { data: cachedTasks } = useNuxtData<Task[]>(`project-tasks-${props.projectId}`)

async function addTask() {
    if (!newTaskTitle.value.trim()) return

    // 1. Capture the current state for rollback
    const previousTasks = [...(cachedTasks.value || [])]
    const title = newTaskTitle.value

    // 2. Optimistic Update: Push to cache immediately
    const tempId = Date.now()
    cachedTasks.value = [
        ...previousTasks,
        { id: tempId, title, isOptimistic: true }
    ]
    newTaskTitle.value = ''

    try {
        // 3. Background Network Call
        await $fetch(`/api/projects/${props.projectId}/tasks`, {
            method: 'POST',
            body: { title }
        })

        // 4. Final Sync: Tell the parent to refresh to get the real DB ID
        emit('success')
    } catch (e) {
        // 5. ROLLBACK on error
        cachedTasks.value = previousTasks
        alert('Failed to save task. Rolling back...')
    }
}
</script>

<template>
    <div class="flex gap-2">
        <input v-model="newTaskTitle" placeholder="Press Enter to add task..."
            class="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all shadow-sm"
            @keyup.enter="addTask" />
        <button @click="addTask"
            class="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 active:scale-95 transition-all shadow-md">
            Add Task
        </button>
    </div>
</template>
