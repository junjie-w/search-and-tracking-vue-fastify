import { test, expect } from '@playwright/test'

// See here how to get started:
// https://playwright.dev/docs/intro
test('visits the app root url', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('footer')).toHaveText('Demo · Product Search & View Tracking')
})

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

test('shows a product in recently viewed after returning home', async ({ page }) => {
  await page.route('**/search', route => route.fulfill({
    json: { products: [{ id: 'tea-1', name: 'Earl Grey Tea' }] },
  }))
  await page.route('**/track-product-view', route => route.fulfill({ json: {} }))

  await page.goto('/')
  await page.locator('#product-search').fill('earl')
  await expect(page.getByRole('heading', { name: 'Recently viewed' })).toHaveCount(0)
  await page.getByText('Earl Grey Tea', { exact: true }).click()
  await expect(page).toHaveURL(/\/product\/tea-1$/)
  await page.getByRole('link', { name: '← Back to Home' }).click()

  await expect(page.getByRole('heading', { name: 'Recently viewed' })).toBeVisible()
  const recentlyViewedProduct = page.getByRole('link', { name: 'tea-1' })
  await expect(recentlyViewedProduct).toHaveAttribute('href', '/product/tea-1')
  await recentlyViewedProduct.click()
  await expect(page).toHaveURL(/\/product\/tea-1$/)
})
