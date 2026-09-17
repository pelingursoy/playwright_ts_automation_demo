/*
Most of the time, Playwright will automatically scroll for you before doing any actions. 
Therefore, you do not need to scroll explicitly (Excluding Infinite Scrolling page).

ways to scrolling the page:

1. Scroll by Pixel Values
    Moves the window by a specified number of pixels relative to its current position.

2. Scroll to a Specific Element
    Brings a target element directly into the browser viewport

3. Scroll to bottom of the document
    Moves the view directly to the top or the very bottom of the document
	
4. Scroll Continuously (Infinite Scroll)
*/



import { test, expect } from '@playwright/test';

const url = 'https://www.worldometers.info/geography/flags-of-the-world/';

test('Automatic Scrolling', async ({ page }) => {

    // Navigate to the page
    await page.goto(url);

    // Playwright automatically scrolls the element into view before performing the assertion
    const usFlag = page.getByAltText('Flag of United States');

    // Verify the U.S. flag is visible
    await expect(usFlag).toBeVisible(); // U.S Flag

});



test('Scroll by Pixel Values', async ({ page }) => {

    // Navigate to the page
    await page.goto(url);

    //await page.evaluate( ()=>window.scrollBy(0,2000) )  //Scroll by Pixel Values
    await page.evaluate( ()=>window.scrollTo(0,2000) ) 

    // // Get the current vertical scroll position
    const scrollPosition=await page.evaluate( ()=> window.scrollY)
    console.log("Pixels scrolled:",scrollPosition)
    expect(scrollPosition).toBe(2000);

});



test('Scroll to a Specific Element', async ({ page }) => {

    // Navigate to the page
    await page.goto(url);

    // Locate the India flag
    const indiaFlag = page.getByAltText('Flag of India');

  // Scroll until the India flag becomes visible
    await indiaFlag.scrollIntoViewIfNeeded()

      await expect(indiaFlag).toBeVisible();

});


test('Scroll to bottom of the document', async ({ page }) => {

    // Navigate to the page
    await page.goto(url);

  // Scroll to the bottom of the page
   await page.evaluate( ()=>window.scrollTo(0,document.body.scrollHeight) ) 

   // await page.keyboard.press('End');  // Alternative

    // Verify the footer is visible
    await expect(page.locator('.text-zinc-200')).toBeVisible();

});


test('Scroll to bottom then top', async ({ page }) => {

    // Navigate to the page
    await page.goto(url);

  // Scroll to the bottom of the page
   await page.evaluate( ()=>window.scrollTo(0,document.body.scrollHeight) ) 

   await page.waitForTimeout(3000)

   // Scroll back to the top of the page
    //await page.evaluate( ()=>window.scrollTo(0,0) ) //Scroll to the Absolute Top

     await page.evaluate( ()=>window.scrollTo(0,-document.body.scrollHeight) )

});
