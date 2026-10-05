<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useRecentlyViewedStore } from '@/stores/recentlyViewed'

const recentlyViewedStore = useRecentlyViewedStore()
</script>

<template>
  <section v-if="recentlyViewedStore.productIds.length" class="flex flex-col gap-3 border-t border-slate-200 pt-5">
    <div class="flex items-center justify-between">
      <h2 class="text-sm font-semibold">Recently viewed</h2>
      <button
        type="button"
        class="text-sm text-slate-500 underline underline-offset-2 hover:text-slate-800"
        @click="recentlyViewedStore.clearRecentlyViewed"
      >
        Clear
      </button>
    </div>
    <ul class="flex flex-col gap-2">
      <li v-for="productId in recentlyViewedStore.productIds" :key="productId">
        <RouterLink
          :to="{ name: 'product-detail', params: { id: productId } }"
          class="block w-full cursor-pointer rounded-xl bg-slate-100/80 p-4 text-sm font-medium text-slate-700/80 transition-all duration-300 ease-in-out hover:bg-slate-50/80 hover:ring-2 hover:ring-slate-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500"
        >
          {{ productId }}
        </RouterLink>
      </li>
    </ul>
  </section>
</template>