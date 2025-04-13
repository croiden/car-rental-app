import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
   await page.goto('/')
})

test.describe('Car Rental App', () => {
   test('should render the page with navbar, left panel and map view', async ({ page }) => {
      await expect(page.getByText('Car Rental App')).toBeVisible
      await expect(page.getByRole('button', { name: 'Toggle color mode' })).toBeVisible
      await expect(page.getByRole('tab', { name: 'Available Cars (20)' })).toBeVisible
      await expect(page.getByRole('tab', { name: 'Rented Cars (0)' })).toBeVisible
      await expect(page.getByRole('textbox', { name: 'Search by car model, vendor,' })).toBeVisible
      await expect(page.getByRole('cell', { name: 'Model', exact: true })).toBeVisible
      await expect(page.getByRole('cell', { name: 'Vendor' })).toBeVisible
      await expect(page.getByRole('cell', { name: 'Rent', exact: true })).toBeVisible
      await expect(page.getByRole('cell', { name: 'Model 3', exact: true })).toBeVisible
      await expect(page.getByRole('cell', { name: 'Tesla', exact: true }).first()).toBeVisible
      await expect(page.getByRole('button', { name: 'Rent Model 3 from Tesla' })).toBeVisible
      await expect(page.getByRole('button', { name: 'Zoom in' })).toBeVisible
      await expect(page.getByRole('button', { name: 'Zoom out' })).toBeVisible
      await expect(page.locator('img:nth-child(15)')).toBeVisible
      await expect(page.getByText('Leaflet | © OpenStreetMap')).toBeVisible
   })

   test('the car renting flow', async ({ page }) => {
      await expect(page.getByRole('tab', { name: 'Available Cars (20)' })).toBeVisible()
      await expect(page.getByRole('textbox', { name: 'Search by car model, vendor,' })).toBeVisible()
      await expect(page.getByRole('cell', { name: 'Rent Polo from Volkswagen' }).nth(1)).toBeVisible()
      await page.getByRole('cell', { name: 'Rent Polo from Volkswagen' }).nth(1).click()

      await expect(page.getByRole('heading', { name: 'Rent: Polo' })).toBeVisible()
      await expect(page.getByLabel('Rent: Polo').getByText('Polo', { exact: true })).toBeVisible()
      await expect(page.getByText('Booked By*')).toBeVisible()
      await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible()
      await page.getByRole('button', { name: 'Cancel' }).click()

      await expect(page.getByRole('textbox', { name: 'Search by car model, vendor,' })).toBeVisible()
      await page.getByRole('textbox', { name: 'Search by car model, vendor,' }).fill('Range')
      // add delay of 1 seconds
      await page.waitForTimeout(1000)

      await expect(page.getByRole('cell', { name: 'Range Rover Sport', exact: true })).toBeVisible()
      await expect(page.getByRole('cell', { name: 'Land Rover', exact: true })).toBeVisible()
      await expect(page.getByRole('cell', { name: 'Rent Range Rover Sport from' })).toBeVisible()
      await page.getByRole('cell', { name: 'Rent Range Rover Sport from' }).click()

      await expect(page.getByRole('heading', { name: 'Rent: Range Rover Sport' })).toBeVisible()
      await expect(
         page.getByLabel('Rent: Range Rover Sport').getByText('Range Rover Sport', { exact: true }),
      ).toBeVisible()
      await expect(page.getByText('Land Rover (SUV)')).toBeVisible()
      await expect(page.getByText('Abu Dhabi, UAE')).toBeVisible()
      await expect(page.getByText('Location: 24.5,')).toBeVisible()
      await expect(page.getByText('Booked By*')).toBeVisible()
      await page.getByRole('textbox', { name: 'Booked By' }).fill('Lawrence Lobo')
      await expect(
         page.getByText('Range Rover SportLand Rover (SUV)Abu Dhabi, UAELocation: 24.5, 54.4Booked By*'),
      ).toBeVisible()
      await expect(page.getByRole('button', { name: 'Rent' })).toBeVisible()
      await page.getByRole('button', { name: 'Rent' }).click()

      await expect(page.getByRole('heading', { name: 'No cars found' })).toBeVisible()
      await expect(page.getByText('Please check your search term')).toBeVisible()
      await expect(page.getByRole('button', { name: 'Close' })).toBeVisible()
      await page.getByRole('button', { name: 'Close' }).click()

      await expect(page.getByRole('tab', { name: 'Rented Cars (1)' })).toBeVisible()
      await page.getByRole('tab', { name: 'Rented Cars (1)' }).click()

      await expect(page.getByRole('cell', { name: 'Range Rover Sport', exact: true })).toBeVisible()
      await expect(page.getByRole('cell', { name: 'LL Lawrence Lobo' })).toBeVisible()
      await expect(page.getByRole('cell', { name: 'Return Range Rover Sport' })).toBeVisible()
   })

   test('the returning car flow', async ({ page }) => {
      await expect(page.getByRole('tab', { name: 'Rented Cars (0)' })).toBeVisible()
      await expect(page.getByRole('tab', { name: 'Available Cars (20)' })).toBeVisible()
      await expect(page.getByRole('button', { name: 'Rent Touareg from Volkswagen' })).toBeVisible()
      await page.getByRole('button', { name: 'Rent Touareg from Volkswagen' }).click()

      await expect(page.getByRole('heading', { name: 'Rent: Touareg' })).toBeVisible()
      await expect(page.getByLabel('Rent: Touareg').getByText('Touareg', { exact: true })).toBeVisible()
      await expect(page.getByText('Booked By*')).toBeVisible()
      await expect(page.getByRole('button', { name: 'Rent' })).toBeVisible()
      await page.getByRole('button', { name: 'Rent' }).click()

      await expect(page.getByText('This field is required')).toBeVisible()
      await expect(page.getByRole('textbox', { name: 'Booked By' })).toBeVisible()
      await page.getByRole('textbox', { name: 'Booked By' }).fill('Lawrence Lobo')
      await page.getByRole('textbox', { name: 'Booked By' }).press('Enter')

      await expect(page.getByRole('tab', { name: 'Rented Cars (1)' })).toBeVisible()
      await page.getByRole('tab', { name: 'Rented Cars (1)' }).click()

      // wait for 0.5 seconds
      await page.waitForTimeout(500)

      await expect(page.getByRole('cell', { name: 'Model' })).toBeVisible()
      await expect(page.getByRole('cell', { name: 'Booked By', exact: true })).toBeVisible()
      await expect(page.getByRole('cell', { name: 'Booked At' })).toBeVisible()
      await expect(page.getByRole('cell', { name: 'Return', exact: true })).toBeVisible()
      await expect(page.getByRole('cell', { name: 'Touareg', exact: true })).toBeVisible()
      await expect(page.getByRole('cell', { name: 'LL Lawrence Lobo' })).toBeVisible()
      await expect(page.getByRole('cell', { name: 'Return Touareg booked by' })).toBeVisible()
      await page.getByRole('cell', { name: 'Return Touareg booked by' }).click()

      await expect(page.getByRole('heading', { name: 'Return: Touareg' })).toBeVisible()
      await expect(page.getByLabel('Return: Touareg').getByText('Touareg', { exact: true })).toBeVisible()
      await expect(page.getByText('Volkswagen (SUV)')).toBeVisible()
      await expect(page.getByText('Booked By: Lawrence Lobo')).toBeVisible()
      await expect(page.getByText('Click on the map to select a')).toBeVisible()
      await expect(page.getByRole('button', { name: 'Zoom in' })).toBeVisible()
      await expect(page.getByRole('button', { name: 'Zoom out' })).toBeVisible()

      await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible()
      await page.getByRole('button', { name: 'Cancel' }).click()

      await expect(page.getByRole('button', { name: 'Return Touareg booked by' })).toBeVisible()
      await page.getByRole('button', { name: 'Return Touareg booked by' }).click()

      await expect(page.getByRole('button', { name: 'Return' })).toBeVisible()
      await page.getByRole('button', { name: 'Return' }).click()

      await expect(page.getByText('Drop location is required')).toBeVisible()
      await page
         .locator('div')
         .filter({ hasText: /^\+− Leaflet \| © OpenStreetMap contributors$/ })
         .nth(3)
         .click()

      await expect(page.getByRole('button', { name: 'Return' })).toBeVisible()
      await page.getByRole('button', { name: 'Return' }).click()

      await expect(page.getByRole('heading', { name: 'No cars rented' })).toBeVisible()
      await expect(page.getByText('You can rent a car from the')).toBeVisible()
      await expect(page.getByRole('tab', { name: 'Available Cars (20)' })).toBeVisible()
   })

   test('the search within available cars', async ({ page }) => {
      await expect(page.getByRole('textbox', { name: 'Search by car model, vendor,' })).toBeVisible()
      await page.getByRole('textbox', { name: 'Search by car model, vendor,' }).fill('Polo')
      // add delay of 1 seconds
      await page.waitForTimeout(1000)

      await expect(page.getByRole('cell', { name: 'Polo', exact: true })).toHaveCount(2)
      await expect(page.getByRole('cell', { name: 'Volkswagen', exact: true })).toHaveCount(2)
      await expect(page.getByRole('cell', { name: 'Rent Polo from Volkswagen' })).toHaveCount(2)
   })
})
