<script setup lang="ts">
useSeoMeta({
  title: 'SaaSPro - The Ultimate Project Manager',
  ogTitle: 'SaaSPro - The Ultimate Project Manager',
  description: 'Built with Nuxt 4 for senior developers who crave speed.',
  ogDescription: 'Manage your projects with a type-safe, layered architecture.',
  ogImage: 'https://saaspro.com/og-image.png',
  twitterCard: 'summary_large_image',
})

const { user, isLoggedIn, logout } = useUser()
</script>

<template>
    <div class="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div class="max-w-2xl w-full text-center space-y-8">
            <h1 class="text-5xl font-extrabold text-blue-600">Nuxt Mastery SaaS</h1>
            <p class="text-xl text-gray-600">Mastering Nuxt Conventions, Data Fetching, State, and Middleware (Day 1-5)</p>

            <div v-if="isLoggedIn" class="bg-white p-6 rounded-xl shadow-md space-y-4">
                <div class="flex items-center justify-center space-x-4">
                    <img v-if="user?.avatarUrl" :src="user.avatarUrl" :alt="user.name" class="w-12 h-12 rounded-full border-2 border-blue-500">
                    <div class="text-left">
                        <p class="font-bold text-lg">Welcome back, {{ user?.name }}!</p>
                        <p class="text-sm text-gray-500">{{ user?.email }}</p>
                    </div>
                </div>
                <div class="flex justify-center space-x-4 mt-6">
                    <!-- <NuxtLink to="/projects" class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                        Explore Projects
                    </NuxtLink>
                    <button @click="logout" class="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
                        Logout
                    </button> -->
                </div>
            </div>

            <div v-else class="space-y-6">
                <p class="text-gray-500 italic">You are currently browsing as a guest.</p>
                <NuxtLink to="/login" class="inline-block px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition transform hover:scale-105">
                    Get Started / Login
                </NuxtLink>
            </div>
        </div>
    </div>
</template>