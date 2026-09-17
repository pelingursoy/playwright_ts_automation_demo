/*
Each BrowserContext can have multiple pages. 
A Page refers to a 'single tab' or a 'popup window' within a browser context. 
It should be used to navigate to URLs and interact with the page content.

*/

import { test, expect } from '@playwright/test';

test("new tab handling", async ({ browser }) => {

   const context = await browser.newContext();

   const page = await context.newPage();

   await page.goto('https://sdetqa.vercel.app/autoplay');

   const [newTab] = await Promise.all(
      [
         context.waitForEvent('page'),
         page.locator('button', { hasText: 'New Tab' }).click()
      ]
   )

   console.log(await newTab.title())

   await expect(newTab).toHaveTitle(/Playwright/)
   await expect(newTab).toHaveURL(/playwright.dev/)

   await context.close()


})



test("new window handling", async ({ browser }) => {

   const context = await browser.newContext();

   const page = await context.newPage();

   await page.goto('https://sdetqa.vercel.app/autoplay');

   const [newTab] = await Promise.all(
      [
         context.waitForEvent('page'),
         page.locator('button', { hasText: 'New Window' }).click(),
      ]
   )

   await page.waitForTimeout(3000)

   //console.log("Number of pages in in context:", context.pages.length)

   await page.waitForTimeout(3000)

   console.log(await newTab.title())

   await expect(newTab).toHaveTitle(/Playwright/)
   await expect(newTab).toHaveURL(/playwright.dev/)

   await context.close()

})
