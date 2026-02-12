<script setup lang="ts">
// No imports needed! NuxtLink is a built-in global component.
const links = [
    { name: 'Home', path: '/' },
    { name: 'Project 1', path: '/projects/1' },
    { name: 'Project 2', path: '/projects/2' }
]
</script>

<template>
    <nav class="flex gap-4 p-4 bg-gray-100 border-b">
        <NuxtLink v-for="link in links" :key="link.path" :to="link.path" class="text-blue-600 hover:underline"
            active-class="font-bold border-b-2 border-blue-600">
            {{ link.name }}
        </NuxtLink>
    </nav>
</template>