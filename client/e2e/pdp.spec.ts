import { test, expect } from '@playwright/test'

test('navigates to the PDP when a search result is clicked', async ({ page }) => {
  await page.route('**/search', route => route.fulfill({
    json: { products: [{ id: 'tea-1', name: 'Earl Grey Tea' }] },
  }))
  await page.route('**/track-product-view', route => route.fulfill({ json: {} }))

  await page.goto('/')
  await page.locator('#product-search').fill('earl')
  await page.getByText('Earl Grey Tea', { exact: true }).click()

  await expect(page).toHaveURL(/\/product\/tea-1$/)
  await expect(page.getByText('Product ID: tea-1')).toBeVisible()
})
