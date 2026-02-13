<script setup lang="ts">
// In a real app, you might fetch user data here if not using useCookie sync
// const { user } = useUser()
</script>

<template>
  <div class="min-h-screen font-sans antialiased text-gray-900">
    <GlobalNav />
    <main>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </main>
  </div>
</template>

<style></style>