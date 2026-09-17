import { test, expect } from "@playwright/test";

test("Nested frames", async({page})=>{

await page.goto('https://sdetqa.vercel.app/autoplay');

// page.frameLocator('iframe').nth(0) - deprecated
//page.frameLocator('iframe').first() - deprecated
const outerFrame= page.locator('iframe').first().contentFrame()

//outerfrmae-->innerframe-->input element
const inputBox=outerFrame.frameLocator('iframe').locator("#innerInput")
await inputBox.fill("Welcome")
await expect(inputBox).toHaveValue("Welcome")

})

  test('External iframe loads the expected URL', async ({ page }) => {
    await page.goto('https://sdetqa.vercel.app/autoplay');
    
    // Get the second iframe on the page (index 1)
    let pwiframe=page.locator('iframe').nth(1) 

    // Verify that the iframe has the expected src attribute
    await expect(pwiframe).toHaveAttribute('src', 'https://playwright.dev/'); 

    // Get the content frame of the iframe
    let innerFrame = pwiframe.contentFrame();

    //Verify that the Playwright logo is visible inside the iframe
    await expect(innerFrame.getByAltText('Playwright logo').first()).toBeVisible();
  });