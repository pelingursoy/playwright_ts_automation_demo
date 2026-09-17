import { test, expect } from '@playwright/test';

test('Find A Book in the page', async ({ page }) => {
  await page.goto('https://www.booksbykilo.in/new-books?pricerange=201to500');

  test.slow(); // Set timeout for a single test Easy way to triple the default timeout i.e. 30 secs(30000  ms)
  //test.setTimeout(80000); // 8 secs //Set timeout for a single test

  let bookFound = false;
  let previousHeight = 0;

  while (true) {

    // Get all book titles currently loaded on the page
    const titles = await page.locator('#productsDiv h3').allTextContents();

    // Check if the target book is in the list
    if (titles.includes('Team Habits')) {
      console.log('Book Found!');
      bookFound = true;
      expect(bookFound).toBeTruthy();
      break;
    }

    // Scroll to the bottom
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });

    // Wait for new content to load
    await page.waitForTimeout(2000);

    // Get current scroll height
    const currentHeight = await page.evaluate(() => {
      return document.body.scrollHeight;
    });

    console.log("==============================")
    console.log(`Previous height: ${previousHeight}`);
    console.log(`Current height: ${currentHeight}`);

    // Check if end of page is reached
    if (currentHeight === previousHeight) {
      break;
    }

    previousHeight = currentHeight;
  }

  console.log('*********  Reached end of page  ********');

  if (!bookFound) {
    console.log('Book Not Found!');
  }


});