import { test, expect } from '@playwright/test';

test('Drag and Drop demo from Guru99', async ({ page }) => {
  // Navigate to the page
  await page.goto('https://demo.guru99.com/test/drag_drop.html');

  // Locate source and target elements using CSS selectors
  const from1 = page.locator('#credit2 a');         // BANK
  const to1 = page.locator('#bank li');             // Debit Side

  const from2 = page.locator('#credit1 a');         // SALES
  const to2 = page.locator('#loan li');             // Credit Side

  const from3 = page.locator('#fourth a').first();  // 500 (1st)
  const to3 = page.locator('#amt7 li');             // Debit Amount

  const from4 = page.locator('#fourth a').nth(1);   // 500 (2nd)
  const to4 = page.locator('#amt8 li');             // Credit Amount

  // Perform drag and drop
  await from1.dragTo(to1);
  await from2.dragTo(to2);
  await from3.dragTo(to3);
  await from4.dragTo(to4);

  // Assert the "Perfect!" message is displayed
  const perfectText = page.locator('a:has-text("Perfect!")');
  await expect(perfectText).toBeVisible();

  await page.waitForTimeout(5000);
});
