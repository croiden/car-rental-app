import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
   await page.goto('/')
})

test.describe('Car Rental App Visual Comparison', () => {
   test('should render the page with navbar, left panel and map view', async ({ page }) => {
      // wait for leaflet map to load, add some delay
      await page.waitForTimeout(10000)

      await expect(page).toHaveScreenshot()
   })
})
