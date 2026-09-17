/*

3 Approaches to capture Trace file in Playwright:

1. Programatically (Start and stop tracing manually within a test.) 
2. Configure tracing in playwright.config.ts (used in most real projects).
3. using CLI command


*/


import { test, chromium, expect } from '@playwright/test';


test('Capture Trace Manually', async ({ }, testInfo) => {

    const browser = await chromium.launch();

    const context = await browser.newContext();

    // Start tracing
    await context.tracing.start({
        screenshots: true,
        snapshots: true,
        sources: true
    });

    const page = await context.newPage();

    await page.goto('https://www.demoblaze.com/index.html');
    await page.getByRole('link', { name: 'Log in' }).click();

    await page.locator('#loginusername').fill('pavanol');
    await page.locator('#loginpassword').fill('test@123'); //password incorrect
    await page.getByRole('button', { name: 'Log in' }).click();

    await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible();
    await expect(page.locator('#nameofuser')).toContainText('Welcome pavanol');


    const tracePath = `traces/trace-${Date.now()}.zip`;  // will use this path later to attach to report

    await context.tracing.stop({
        path: tracePath
    });

    await testInfo.attach('Playwright Trace', {
        path: tracePath,
        contentType: 'application/zip'
    });

    await browser.close();

});
