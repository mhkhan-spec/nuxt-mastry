<script setup lang="ts">
const { user, logout } = useUser()
</script>

<template>
  <div class="flex h-screen bg-gray-50">
    <aside class="w-64 bg-slate-900 text-white flex flex-col">
      <div class="p-6 text-xl font-bold border-b border-slate-800">
        SaaSPro Admin
      </div>
      <nav class="flex-1 p-4 space-y-2">
        <NuxtLink to="/projects" class="block p-2 hover:bg-slate-800 rounded">Dashboard</NuxtLink>
        <NuxtLink to="/projects/settings" class="block p-2 hover:bg-slate-800 rounded">Settings</NuxtLink>
      </nav>
      <div class="p-4 border-t border-slate-800">
        <p class="text-xs text-gray-400 mb-2">Logged in as: {{ user?.name }}</p>
        <button class="text-red-400 hover:text-red-300 transition-colors text-xs font-medium px-2 py-1 rounded hover:bg-slate-800 border border-slate-700" @click="logout">Logout</button>
      </div>
    </aside>

    <div class="flex-1 flex flex-col overflow-hidden">
      <header class="h-16 bg-white border-b flex items-center px-8">
        <h2 class="text-lg font-medium">Workspace</h2>
      </header>
      <main class="flex-1 overflow-y-auto p-8">
        <slot /> 
      </main>
    </div>
  </div>
</template>