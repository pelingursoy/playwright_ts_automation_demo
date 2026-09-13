import { test, expect } from '@playwright/test';

const pageUrl = 'https://sdetqa.vercel.app/autoplay.html';

test.describe('Data Entry Form Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(pageUrl);
    await expect(page.getByText('AutoPlay')).toBeVisible();
  });

  test('1. Page load validation', async ({ page }) => {
    // 1. Open the URL and verify the page loaded
    await expect(page).toHaveURL(pageUrl);
    // 2. Verify the AutoPlay heading is visible
    await expect(page.getByText('AutoPlay')).toBeVisible();
  });

  test('2. Input fields validation', async ({ page }) => {
    const nameField = page.getByLabel('Full name');
    const emailField = page.getByLabel('Email');
    const phoneField = page.getByLabel('Phone');
    const addressField = page.getByLabel('Address');

    // Full name field should be visible and enabled
    await expect(nameField).toBeVisible();
    await expect(nameField).toBeEnabled();

    // Verify maxlength attribute
    await expect(nameField).toHaveAttribute('maxlength', '15');

    // Enter and verify full name value
    await nameField.fill('John Canedy');
    await expect(nameField).toHaveValue('John Canedy');

    // Email field should be visible and accept a value
    await expect(emailField).toBeVisible();
    await emailField.fill('tester@example.com');
    await expect(emailField).toHaveValue('tester@example.com');

    // Phone field should be visible and accept a value
    await expect(phoneField).toBeVisible();
    await phoneField.fill('+91 1234567898');
    await expect(phoneField).toHaveValue('+91 1234567898');

    // Address field should be visible and accept multi-line text
    await expect(addressField).toBeVisible();
    await addressField.fill('123 Xyz Lane\nDelhi, India');
    await expect(addressField).toHaveValue('123 Xyz Lane\nDelhi, India');
  });

  test('3. Radio button validation', async ({ page }) => {
    const maleRadio = page.getByLabel('Male', { exact: true });
    const femaleRadio = page.getByLabel('Female', { exact: true });

    // Locate both radio buttons
    await expect(maleRadio).toBeVisible();
    await expect(femaleRadio).toBeVisible();

    // Select Female and verify
    await femaleRadio.check();
    await expect(femaleRadio).toBeChecked();
    await expect(maleRadio).not.toBeChecked();
  });
  
});

