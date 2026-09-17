/*

2 Approaches to capture videos in Playwright:

  1. Programmatically  via Browser Context
  2. Globally via Playwright Config File 
*/


import { test, chromium, expect } from '@playwright/test';


test('Record Video for Single Test', async ({},testInfo) => {

 const browser = await chromium.launch();

    const context = await browser.newContext({
        recordVideo: {
            dir: 'videos/',
            size: {
                width: 1280,
                height: 720
            }
        }
    });

    const page = await context.newPage();

    await page.goto('https://www.demoblaze.com/index.html');
    await page.getByRole('link', { name: 'Log in' }).click();

    await page.locator('#loginusername').fill('pavanol');
    await page.locator('#loginpassword').fill('test@123'); //password incorrect
    await page.getByRole('button', { name: 'Log in' }).click();

    await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible();
    await expect(page.locator('#nameofuser')).toContainText('Welcome pavanol');

    await context.close();  // video file will be saved

        //Attach the video to html report
    const videoPath = await page.video()?.path()   // Get the saved video path

    await testInfo.attach('Execution Video', {
        path: videoPath,
        contentType: 'video/webm'
    });

     await browser.close();
     
})
