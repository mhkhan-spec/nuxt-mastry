<script setup lang="ts">
const { user, isLoggedIn, logout, setUser } = useUser()

// Mock login for Day 4 testing
const handleMockLogin = () => {
  setUser({
    id: '123',
    email: 'senior@nuxt.dev',
    name: 'Master Developer',
    role: 'admin'
  })
}
</script>

<template>
  <nav class="flex justify-between items-center p-4 bg-white shadow-sm">
    <div class="flex gap-4">
      <NuxtLink to="/" class="font-bold text-blue-600">SaaS Pro</NuxtLink>
      <NuxtLink to="/projects">Projects</NuxtLink>
    </div>

    <div class="flex items-center gap-4">
      <template v-if="isLoggedIn">
        <span class="text-sm text-gray-600">Welcome, {{ user?.name }}</span>
        <button @click="logout" class="text-xs text-red-500 underline">Logout</button>
      </template>
      <button v-else @click="handleMockLogin" class="px-3 py-1 bg-blue-600 text-white rounded text-sm">
        Mock Login
      </button>
    </div>
  </nav>
</template>