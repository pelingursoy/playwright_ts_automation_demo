import { test, expect } from '@playwright/test'; // Importing the test and expect functions from Playwright testing library

test('User can login successfully', async ({ page }) => { // Defining a test case for user login functionality

    // Open login page
    await page.goto('https://www.saucedemo.com/'); // Navigating to the login page of the application

    // Enter username
    await page.locator('[data-test="username"]').fill('standard_user'); // Filling in the username field with a valid username

    // Enter password
    await page.locator('[data-test="password"]').fill('secret_sauce'); //   Filling in the password field with a valid password

    // Click login
    await page.locator('[data-test="login-button"]').click(); // Clicking the login button to submit the login form

    // Verify successful login
    await expect(page).toHaveURL(/inventory/); // Asserting that the URL has changed to the inventory page, indicating a successful login

});