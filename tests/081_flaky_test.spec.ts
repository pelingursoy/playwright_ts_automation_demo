import { test, expect } from '@playwright/test';


/*

test('flaky test', async ({ page }) => {

    await page.goto('https://www.demoblaze.com/index.html');
    await page.getByRole('link', { name: 'Log in' }).click();
    await page.locator('#loginusername').fill('pavanol');
    await page.locator('#loginpassword').fill('test@123');
    await page.getByRole('button', { name: 'Log in' }).click();
    await page.waitForTimeout(10000);
    await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible();
    await expect(page.locator('#nameofuser')).toContainText('Welcome pavanol');

});
*/


//Specify retries programatically
// ---------
test.describe.configure({retries: 3});

test.describe('Unstable Feature Group', () => {
    test.only('flaky test', async ({ page }) => {

        await page.goto('https://www.demoblaze.com/index.html');
        await page.getByRole('link', { name: 'Log in' }).click();
        await page.locator('#loginusername').fill('pavanol');
        await page.locator('#loginpassword').fill('test@123');
        await page.getByRole('button', { name: 'Log in' }).click();
        await page.waitForTimeout(10000);
        await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible();
        await expect(page.locator('#nameofuser')).toContainText('Welcome pavanol');

    });
});




