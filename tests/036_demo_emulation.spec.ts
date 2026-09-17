import { test, devices } from '@playwright/test';

// Create our own Emulator
test("Emulator test on iPhone15", async({browser})=>{

    //  Simulate maximize the page: set large viewport size
    const context=await browser.newContext( {...devices['iPhone 15']} )

    const page=await context.newPage()
    await page.goto('https://www.google.com/');
    await page.waitForTimeout(10000);

})


// We are using Emulator setup from playwright.config.ts file.
/*
{
      name: 'Mobile Safari',
      use: { ...devices['iPhone 15'] },
    }
*/
test("Emulator test on iPhone15 from config file", async({page})=>{

    await page.goto('https://www.google.com/');
    await page.waitForTimeout(10000);

})