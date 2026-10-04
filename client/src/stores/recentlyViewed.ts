import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'

const STORAGE_KEY = 'recently-viewed-product-ids'
const MAX_RECENT_PRODUCTS = 5

export const useRecentlyViewedStore = defineStore('recentlyViewed', () => {
  const productIds = useStorage<string[]>(STORAGE_KEY, [])

  function recordView(productId: string) {
    productIds.value = [productId, ...productIds.value.filter(id => id !== productId)]
      .slice(0, MAX_RECENT_PRODUCTS)
  }

  function clearRecentlyViewed() {
    productIds.value = []
  }

  return { productIds, recordView, clearRecentlyViewed }
})
