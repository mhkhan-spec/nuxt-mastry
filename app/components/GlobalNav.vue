<script setup lang="ts">
const config = useRuntimeConfig();
console.log(config.public.apiBase) // Accessible everywhere
console.log(config.apiSecret)     // Undefined on client, exists on server
const { user, isLoggedIn, logout } = useUser()
</script>

<template>
  <nav class="flex justify-between items-center p-4 bg-white shadow-sm">
    <div class="flex gap-4">
      <NuxtLink to="/" class="font-bold text-blue-600">SaaS Pro</NuxtLink>
      <NuxtLink to="/projects">Projects</NuxtLink>
    </div>

    <div class="flex items-center gap-4">
      <template v-if="isLoggedIn">
        <span class="text-sm font-medium text-gray-700">Hi, {{ user?.name }}</span>
        <button @click="logout" class="px-3 py-1 text-sm text-red-600 hover:text-red-700 font-medium transition">
          Logout
        </button>
      </template>
      <NuxtLink v-else to="/login" class="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition">
        Login
      </NuxtLink>
    </div>
  </nav>
</template>