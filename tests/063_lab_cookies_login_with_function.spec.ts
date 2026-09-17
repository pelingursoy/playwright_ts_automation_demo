import { test, expect, Browser, Cookie } from '@playwright/test';

const appURL = 'https://sdetqa.vercel.app/login_app';

// Function which logs in and returns cookies
async function getCookiesFromApp(browser:Browser) {

    // Create browser context
    const context = await browser.newContext();
    const page = await context.newPage();

    // Open application
    await page.goto(appURL);

    // Login
    await page.getByRole('textbox', { name: 'Username' }).fill('admin');
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123');

    // Select Cookie option
    await page.getByLabel('🍪 Cookie').check();

    // Click Login
    await page.getByRole('button', { name: 'Login' }).click();

    // Verify login
    await expect(
        page.getByText('Dashboard Welcome', { exact: true })
    ).toBeVisible();

    // Get all cookies
    const cookies = await context.cookies();

    console.log('Cookies captured successfully.');

    // Close context
    await context.close();

    // Return cookies
    return cookies;
}

test('Login using Saved Cookies', async ({ browser }) => {

    // Get cookies from the application
    const savedCookies = await getCookiesFromApp(browser);// Passing browser to the function

    // Create a fresh browser context
    const context = await browser.newContext();

    // Restore cookies
    await context.addCookies(savedCookies);

    console.log('Cookies restored successfully.');

    // Open new page
    const page = await context.newPage();

    // Navigate to application
    await page.goto(appURL);

    // Verify user is logged in automatically
    await expect(
        page.getByText('Dashboard Welcome', { exact: true })
    ).toBeVisible();

    console.log('Login using cookies successful!');
});