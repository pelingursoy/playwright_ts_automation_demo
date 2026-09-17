import { test, expect } from '@playwright/test';

test('Hard Assertions Example', async ({ page }) => {

    await page.goto('https://demowebshop.tricentis.com/');

    //1
    await expect(page).toHaveTitle('Demo Web Shop2');

    //2
    await expect(page).toHaveURL('https://demowebshop.tricentis.com/');

    //3
    const logo = page.locator("img[alt='Tricentis Demo Web Shop']");
    await expect(logo).toBeVisible();

    await page.waitForTimeout(5000);
});

test('Soft Assertions Example', async ({ page }) => {

    await page.goto('https://demowebshop.tricentis.com/');

    //1
    await expect.soft(page).toHaveTitle('Demo Web Shop2'); //Marked as failed . other assertions wil continue

    //2
    await expect.soft(page).toHaveURL('https://demowebshop.tricentis.com/');

    //3
    const logo = page.locator("img[alt='Tricentis Demo Web Shop']");
    await expect.soft(logo).toBeVisible();

    await page.waitForTimeout(5000);
});