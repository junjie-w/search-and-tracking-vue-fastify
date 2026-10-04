<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <header class="flex justify-end items-center p-4">
      <nav class="flex gap-4">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/">PDP</RouterLink>
      </nav>
    </header>

    <main class="flex-1">
      <slot />
    </main>

    <footer class="flex justify-center items-center p-4">
      <p>Demo · Product Search & View Tracking</p>
    </footer>
  </div>
</template>
