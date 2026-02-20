<script setup lang="ts">
const logs = ref<string[]>([])
const isStreaming = ref(false)

async function startWatchingLogs() {
    logs.value = []
    isStreaming.value = true

    // 1. Use standard fetch to get the stream body
    const response = await fetch('/api/system/logs')
    if (!response.body) return

    // 2. Attach a reader
    const reader = response.body.getReader()
    const decoder = new TextDecoder()

    while (true) {
        const { done, value } = await reader.read()
        if (done) break

        // 3. Decode and push the chunk to our reactive array
        const chunk = decoder.decode(value, { stream: true })
        logs.value.push(chunk)
    }

    isStreaming.value = false
}
</script>

<template>
    <UContainer class="py-10">
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-2xl font-bold">System Live Logs</h1>
            <UButton :loading="isStreaming" icon="i-heroicons-play" @click="startWatchingLogs">
                Start Stream
            </UButton>
        </div>

        <div class="bg-slate-900 text-green-400 font-mono p-6 rounded-lg h-96 overflow-y-auto shadow-inner">
            <div v-for="(log, index) in logs" :key="index" class="mb-1 border-l-2 border-green-800 pl-3">
                <span class="text-slate-500">>>></span> {{ log }}
            </div>
            <div v-if="isStreaming" class="animate-pulse">_</div>
            <div v-if="!isStreaming && logs.length > 0" class="text-blue-400 mt-4 text-xs">-- End of Stream --</div>
        </div>
    </UContainer>
</template>