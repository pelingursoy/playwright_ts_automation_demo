/*

2 Approaches to capture screenshots in Playwright:

  1. Programmatically 
  2. Globally via Playwright Config File  

*/

import { test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://playwright.dev/');
});

//1. Screenshot of only the visible viewport (Default)

test('Viewport Screenshot', async ({ page }) => {
  await page.screenshot({path: 'screenshots/01-viewport.png'});
});


//2. Full Page Screenshot
test('Full Page Screenshot', async ({ page }) => {

  await page.screenshot({ path: 'screenshots/02-fullpage.png',fullPage: true});

});


//3. JPEG Screenshot with Quality
//Quality works only with JPEG.

test('JPEG Screenshot', async ({ page }) => {

  await page.screenshot({
    path: 'screenshots/03-quality.jpg',
    type: 'jpeg',
    quality: 70
  });

});


//4. Capture Specific Area (Clip)
// x,y,width,height
test('Clip Screenshot', async ({ page }) => {

  await page.screenshot({
    path: 'screenshots/04-clip.png',
    clip: {
      x: 100,
      y: 100,
      width: 700,
      height: 400
    }
  });

});

//5. Screenshot of Specific Element

test('Element Screenshot', async ({ page }) => {

  const logo = page.locator('.navbar__brand');  //logo

  await logo.screenshot({
    path: 'screenshots/05-logo.png'
  });

});

//6. Screenshot after Scrolling

test('Screenshot after Scroll', async ({ page }) => {

  await page.evaluate(() => window.scrollBy(0, 600));

  await page.screenshot({
    path: 'screenshots/06-scroll.png'
  });

});

//7. Mask Sensitive Elements

test('Screenshot with Mask', async ({ page }) => {

  const searchBox = page.locator('.DocSearch-Button');

  await page.screenshot({
    path: 'screenshots/07-mask.png',
    mask: [searchBox]
  });

});

//8. Hide Caret
//Useful while capturing forms.

test('Hide Caret', async ({ page }) => {

  await page.keyboard.press('/');

  await page.screenshot({
    path: 'screenshots/08-hide-caret.png',
    caret: 'hide'
  });

});


//9. Omit Background
//Works with PNG only.
//Transparent Background.


test('Transparent Background', async ({ page }) => {

  await page.screenshot({
    path: 'screenshots/09-transparent.png',
    omitBackground: true
  });

});


//10. Disable Animations

test('Disable Animations', async ({ page }) => {
  await page.screenshot({
    path: 'screenshots/10-no-animation.png',
    animations: 'disabled'
  });

});

//11. Full Page + Mask + Disabled Animation
//Multiple Options Together

test('Multiple Screenshot Options', async ({ page }) => {

  const searchBox = page.locator('.DocSearch-Button');

  await page.screenshot({
    path: 'screenshots/13-combined.png',
    fullPage: true,
    animations: 'disabled',
    mask: [searchBox]
  });

});

//12. Save screen shots with time stamps (Dynamic) - Preserves old screenshots

test('Dynamic Name', async ({ page }, testInfo) => {

   const timestamp = Date.now();

   //Method 1: //Adding Current Milliseconds
    //let fileName=`screenshots/homepage_${timestamp}.png`
   // await page.screenshot({path: fileName});

  //Method 2: Include Test Name + Timestamp
   let fileName=`screenshots/${testInfo.title}_${timestamp}.png`
    await page.screenshot({path: fileName});
  });

//13. Capture Screenshot into Buffer

// (No file created)

test('Screenshot Buffer', async ({ page }) => {

  const imageBuffer = await page.screenshot();
  console.log(`Buffer Size = ${imageBuffer.length} bytes`);
});

//14. Attach screenshot to the html report
test('Attach Screenshot to Report', async ({ page }, testInfo) => {

  // Capture screenshot as Buffer , No file is created
  const screenshot = await page.screenshot();

  // Attach to HTML report
  await testInfo.attach('Homepage Screenshot', {
    body: screenshot,
    contentType: 'image/png'
  });

});

//15. Save Screenshot First, Then Attach to html report


test('Attach Saved Screenshot', async ({ page }, testInfo) => {

  const fileName = `screenshots/home_${Date.now()}.png`;

  await page.screenshot({ path: fileName });

  await testInfo.attach('Homepage Screenshot', {
    path: fileName,
    contentType: 'image/png'
  });

});