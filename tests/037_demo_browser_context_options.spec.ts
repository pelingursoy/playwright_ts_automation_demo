//Browser Context Level Settings

import { test } from '@playwright/test';

test("Browser context options/settings demo", async ({ browser }) => {

    const context = await browser.newContext(
        //Drak theme
        {
            colorScheme: 'dark',

            // Browser Permissions
            permissions: [
                'notifications',
                'geolocation',
                'microphone'
            ],

            // Language
            locale: 'en-IN',

            // Time Zone
            timezoneId: 'Asia/Kolkata',

            // Viewport Size
            viewport: {
                width: 1280,
                height: 720
            },

            // Fake GPS Location
            geolocation: {
                latitude: 17.3843,
                longitude: 78.4583
            },


            // Ignore HTTPS certificate errors
            ignoreHTTPSErrors: true

        }
    )

    const page = await context.newPage();
    await page.goto('https://www.google.com/');
    //await page.goto("https://expired.badssl.com/");

    await page.waitForTimeout(5000)

})



//Page Level Settings
test("page options demo", async ({ page }) => {

    //await page.setViewportSize({width:1920, height : 1080})

    //minimizing the pase
    //Playwright does not directly supported
    await page.setViewportSize({ width: 1, height: 1 })

    // Navigate
    await page.goto('https://www.google.com/');
    await page.waitForTimeout(5000);

})