import { test, expect } from '@playwright/test';

test('Date Range Picker ', async ({ page }) => {
  // Navigate to the site
  await page.goto('https://sdetqa.vercel.app/autoplay.html');
  
  const startDate = page.locator('#start-date');
  const endDate = page.locator('#end-date');

  // Fill in the start and end date using CSS selectors ( date format:  dd-mm-yyyy)

  //The error Malformed value when using locator.fill("20-10-2025") occurs because the <input type="date"> expects a date in the format YYYY-MM-DD — not DD-MM-YYYY.
  /*await page.locator('#start-date').fill('20-10-2025'); //DD-MM-YYYY
  await page.locator('#end-date').fill('05-09-2026'); //DD-MM-YYYY
   */

  await startDate.fill('2026-07-05'); //YYYY-MM-DD
  await endDate.fill('2026-07-10'); //YYYY-MM-DD

  // Click on Submit button
  await page.locator('button').filter({ hasText: 'Submit' }).nth(1).click();

  // Assertion: Check if submission resulted in any visible success message or confirmation
  const successMessage = page.locator('#result');
  await expect(successMessage).toBeVisible();

  console.log("string:",await startDate.inputValue());
  console.log("ending:",await endDate.inputValue());

  await expect(startDate).toHaveValue('2026-07-05');//YYYY-MM-DD
   await expect(endDate).toHaveValue('2026-07-10');//YYYY-MM-DD
  
});
