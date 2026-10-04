import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import { useRecentlyViewedStore } from '../recentlyViewed'

describe('recently viewed store', () => {
  beforeEach(() => {
    localStorage.clear()
    setActivePinia(createPinia())
  })

  it('puts the latest view first, removes duplicates, and keeps at most five products', () => {
    const store = useRecentlyViewedStore()

    for (const productId of ['tea-1', 'tea-2', 'tea-3', 'tea-4', 'tea-5', 'tea-6']) {
      store.recordView(productId)
    }
    store.recordView('tea-3')

    expect(store.productIds).toEqual(['tea-3', 'tea-6', 'tea-5', 'tea-4', 'tea-2'])
  })

  it('clears the recently viewed products', () => {
    const store = useRecentlyViewedStore()
    store.recordView('tea-1')

    store.clearRecentlyViewed()

    expect(store.productIds).toEqual([])
  })
})
