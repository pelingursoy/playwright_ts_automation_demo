import { test, expect } from '@playwright/test';

test('BlazeDemo Flight Booking Flow - Select Lowest Price Flight', async ({ page }) => {
  // 1. Navigate to BlazeDemo homepage
  await page.goto('https://blazedemo.com/');
 
  // 2. Select departure city: Boston
  await page.locator('select[name="fromPort"]').selectOption('Boston');

  // 3. Select destination city: London
  await page.locator('select[name="toPort"]').selectOption('London');

  // 4. Click on "Find Flights"
  await page.locator('input[type="submit"]').click();

  // 5. Count number of rows (flights) in the table
  const rows = page.locator('table.table tbody tr');
  const rowCount = await rows.count();
  console.log('Number of flight rows: ',rowCount);
  expect(rowCount).toBeGreaterThan(0); // Assert: at least one flight exists

  // 6. Capture all prices into an array
  const prices = [];
  for (let i = 0; i < rowCount; i++) {
    const price = await rows.nth(i).locator('td').nth(5).innerText(); // 6th column (index 5)
    prices.push(price);
  }

  // 7. Log and sort the prices
  console.log('Flight Prices:', prices);
  const sortedPrices = [...prices].sort(); // String sort
  const lowestPrice = sortedPrices[0];
  console.log('Lowest Price:', lowestPrice);
 

  // 8. Find row with lowest price and click "Choose This Flight"
  for (let i = 0; i < rowCount; i++) {
    const price = await rows.nth(i).locator('td').nth(5).innerText();
    if (price === lowestPrice) {
      await rows.nth(i).locator('td input[type="submit"]').click();
      break;
    }
  }

  // 9. Fill passenger details on the purchase page
  await page.locator('#inputName').fill('John');
  await page.locator('#address').fill('1403 American Beauty Ln');
  await page.locator('#city').fill('Columbus');
  await page.locator('#state').fill('OH');
  await page.locator('#zipCode').fill('43240');
  await page.locator("#cardType").selectOption("American Express")
  await page.locator('#creditCardNumber').fill('6789067345231267');
  await page.locator('#creditCardMonth').fill('10');  
  await page.locator('#creditCardYear').fill('2024'); 
  await page.locator('#nameOnCard').fill('John Canedy');

  // Click on Purchase Flight
  await page.locator('input[value="Purchase Flight"]').click();

  // 10. Validate success message
  const confirmationText = await page.locator('h1').textContent();
  console.log('Confirmation Message:', confirmationText);
  expect(confirmationText).toContain('Thank you for your purchase');

  await page.waitForTimeout(3000);

  await page.close()
});
