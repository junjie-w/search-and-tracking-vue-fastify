import { describe, it, expect } from 'vitest'
import { createPinia } from 'pinia'
import { mount } from '@vue/test-utils'
import HomeComponent from '../HomeComponent.vue'

describe('HomeComponent', () => {
  it('renders properly', () => {
    const wrapper = mount(HomeComponent, {
      global: { plugins: [createPinia()] },
    })
    expect(wrapper.text()).toContain('Search Products')
  })
})
