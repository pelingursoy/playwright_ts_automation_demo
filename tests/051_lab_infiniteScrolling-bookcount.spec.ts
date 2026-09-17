import { test, expect } from '@playwright/test';

test('Count Total Books in the page', async ({ page }) => {

  test.slow(); // Triple the default timeout (30s -> 90s)

  await page.goto('https://www.booksbykilo.in/new-books?pricerange=201to500');

  let previousHeight = 0;

  while (true) {

    // Count all books currently loaded
    const booksCount = await page.locator('#productsDiv h3').count();

    console.log(`Books Loaded: ${booksCount}`);

    // Scroll to bottom
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });

    // Wait for lazy loading
    await page.waitForTimeout(2000);

    // Current page height
    const currentHeight = await page.evaluate(() => document.body.scrollHeight);

    console.log('==============================');
    console.log(`Previous Height: ${previousHeight}`);
    console.log(`Current Height : ${currentHeight}`);

    // No new content loaded
    if (currentHeight === previousHeight) {
      console.log('********* Reached End of Page ********');
      console.log(`Total Number of Books: ${booksCount}`);
      break;
    }

    previousHeight = currentHeight;
  }

});