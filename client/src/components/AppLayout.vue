<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { getUserId } from '@/components/utils/getUserId.util'

onMounted(() => {
  getUserId()
})
</script>

<template>
  <div class="w-screen h-screen flex flex-col items-center">
    <div class="w-4/5 h-full flex flex-col py-4 text-slate-500">
      <header class="flex justify-end items-center">
        <nav class="hover:underline cursor-pointer hover:italic transition-all duration-200 ease-out">
          <RouterLink to="/">Home</RouterLink>
        </nav>
      </header>

      <main class="flex-1">
        <slot />
      </main>

      <footer class="flex justify-center items-center">
        <p>Demo · Product Search & View Tracking</p>
      </footer>
    </div>
  </div>
</template>
