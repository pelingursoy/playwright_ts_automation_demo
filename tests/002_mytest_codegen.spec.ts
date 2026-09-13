import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demowebshop.tricentis.com/'); // Navigate to the Tricentis Demo Web Shop homepage
  await expect(page.getByRole('link', { name: 'Tricentis Demo Web Shop' })).toBeVisible();
  await expect(page.locator('body')).toContainText('Welcome to our store');
});