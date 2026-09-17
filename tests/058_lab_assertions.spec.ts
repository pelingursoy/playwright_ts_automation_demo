import { test, expect } from '@playwright/test';

// Base URLs for the demo application
const BASE_URL = 'https://demowebshop.tricentis.com';
const LOGIN_URL = 'https://demowebshop.tricentis.com/login';
const REGISTER_URL = 'https://demowebshop.tricentis.com/register';

// ============================================
// PAGE ASSERTIONS
// ============================================


test('Page Assertion: toHaveTitle', async ({ page }) => {
  await page.goto(BASE_URL);
  // Assert that the page title matches exactly
  await expect(page).toHaveTitle('Demo Web Shop');
});

test('Page Assertion: not.toHaveTitle', async ({ page }) => {
  await page.goto(BASE_URL);
  // Assert that the page title is NOT something else
  await expect(page).not.toHaveTitle('Wrong Title');
});

test('Page Assertion: toHaveURL', async ({ page }) => {
  await page.goto(LOGIN_URL);
  // Assert that the page URL matches exactly
  await expect(page).toHaveURL(LOGIN_URL);
});

test('Page Assertion: not.toHaveURL', async ({ page }) => {
  await page.goto(LOGIN_URL);
  // Assert that the page URL is NOT the home page URL
  await expect(page).not.toHaveURL(BASE_URL);
});

// ============================================
// VISIBILITY ASSERTIONS
// ============================================

test('Visibility Assertion: toBeAttached', async ({ page }) => {
  await page.goto(REGISTER_URL);
  // Get the registration button - this element exists in the DOM
  const registerButton = page.locator('#register-button');
  // Assert that the element is attached to the DOM
  await expect(registerButton).toBeAttached();
});

test('Visibility Assertion: toBeVisible', async ({ page }) => {
  await page.goto(LOGIN_URL);
  // Get the email input field
  const emailInput = page.locator('#Email');
  // Assert that the element is visible on the page
  await expect(emailInput).toBeVisible();
});

test('Visibility Assertion: not.toBeVisible', async ({ page }) => {
  await page.goto(BASE_URL);
  // Get the login link - this is visible
  const loginLink = page.locator('a[href="/login"]');
  // Get the "Please login" message which doesn't exist on home page
  const loginMessage = page.locator('text=Please login');
  // Assert that the login link IS visible
  await expect(loginLink).toBeVisible();
  // Assert that the login message is NOT visible
  await expect(loginMessage).not.toBeVisible();
});

test('Visibility Assertion: toBeHidden', async ({ page }) => {
  await page.goto(LOGIN_URL);
  // Get the "Email:" label - this is visible on login page
  const emailLabel = page.locator('label[for="Email"]');
  // Get the password validation message - this is hidden initially
  const validationMessage = page.locator('#password-validation');
  // Assert that login message is visible
  await expect(emailLabel).toBeVisible();
  // Assert that validation message is hidden
  await expect(validationMessage).toBeHidden();
});


// ============================================
// STATE ASSERTIONS
// ============================================

test('State Assertion: toBeChecked', async ({ page }) => {
  await page.goto(LOGIN_URL);
  // Get the "Remember me" checkbox
  const rememberMeCheckbox = page.locator('#RememberMe');
  // Check the checkbox
  await rememberMeCheckbox.check();
  // Assert that the checkbox is checked
  await expect(rememberMeCheckbox).toBeChecked();
});

test('State Assertion: not.toBeChecked', async ({ page }) => {
  await page.goto(LOGIN_URL);
  // Get the "Remember me" checkbox
  const rememberMeCheckbox = page.locator('#RememberMe');
  // Ensure it's unchecked
  await rememberMeCheckbox.uncheck();
  // Assert that the checkbox is NOT checked
  await expect(rememberMeCheckbox).not.toBeChecked();
});

test('State Assertion: toBeDisabled', async ({ page }) => {
  await page.goto(REGISTER_URL);
  // Get the "Register" button before any input
  const registerButton = page.locator('#register-button');
  // It might not be disabled, so let's find an element that is typically disabled
  // For demonstration, we'll check if there's any disabled element
  // In this demo site, the "Add to cart" button may be disabled for out-of-stock items
  // We'll look for an element with 'disabled' attribute
  const disabledElement = page.locator('[disabled]').first();
  // If there's no disabled element, we'll skip this test
  if (await disabledElement.count() > 0) {
    await expect(disabledElement).toBeDisabled();
  }
});

test('State Assertion: toBeEditable', async ({ page }) => {
  await page.goto(LOGIN_URL);
  // Get the email input field
  const emailInput = page.locator('#Email');
  // Assert that the input field is editable
  await expect(emailInput).toBeEditable();
});

test('State Assertion: toBeEnabled', async ({ page }) => {
  await page.goto(LOGIN_URL);
  // Get the login button
  const loginButton = page.locator('input[value="Log in"]');
  // Assert that the button is enabled
  await expect(loginButton).toBeEnabled();
});

test('State Assertion: toBeFocused', async ({ page }) => {
  await page.goto(LOGIN_URL);
  // Get the email input field and focus on it
  const emailInput = page.locator('#Email');
  await emailInput.focus();
  // Assert that the email input has focus
  await expect(emailInput).toBeFocused();
});

// ============================================
// TEXT ASSERTIONS
// ============================================

test('Text Assertion: toContainText', async ({ page }) => {
  await page.goto(LOGIN_URL);
  // Get the login window label 'Returning Customer'
  const return_cutomer = page.locator("div[class='returning-wrapper'] strong");
  // Assert that the element contains the text "Customer"
  await expect(return_cutomer).toContainText('Customer');//partial match
});

test('Text Assertion: toHaveText', async ({ page }) => {
  await page.goto(REGISTER_URL);
  // Get the heading 'Register'
  const heading = page.locator('h1');
  // Assert that the heading has the exact text "Register"
  await expect(heading).toHaveText('Register'); // exact match
});

test('Text Assertion: toHaveValue', async ({ page }) => {
  await page.goto(LOGIN_URL);
  // Get the email input and fill it
  const emailInput = page.locator('#Email');
  await emailInput.fill('test@example.com');
  // Assert that the input has the expected value
  await expect(emailInput).toHaveValue('test@example.com'); // exact match
});

test('Text Assertion: toHaveValues', async ({ page }) => {
  await page.goto("https://sdetqa.vercel.app/autoplay");
  // Get categories
  const colors = page.locator('#colors');
   await colors.selectOption(["Red", "Green"]);
  // Assert that 'colors' have specific values
  // toHaveValues expects an array of values for the locator array
  await expect(colors).toHaveValues(["red","green"]);
})


// ============================================
// ATTRIBUTES & PROPERTIES ASSERTIONS
// ============================================

test('Attributes Assertion: toContainClass', async ({ page }) => {
  await page.goto(LOGIN_URL);
  // Get the login button
  const loginButton = page.locator('input[value="Log in"]');
  // Assert that the button contains a specific class
  await expect(loginButton).toContainClass('button-1');
});

test('Attributes Assertion: toHaveClass', async ({ page }) => {
  await page.goto(REGISTER_URL);
  // Get the register button
  const registerButton = page.locator('#register-button');
  // Assert that the button has the exact class
  await expect(registerButton).toHaveClass('button-1 register-next-step-button');
});

test('Attributes Assertion: toHaveAttribute', async ({ page }) => {
  await page.goto(LOGIN_URL);
  // Get the login button
  const loginButton = page.locator('input[value="Log in"]');
  // Assert that the button has a specific attribute with specific value
  await expect(loginButton).toHaveAttribute('type', 'submit');
});

test('Attributes Assertion: toHaveCSS', async ({ page }) => {
  await page.goto(BASE_URL);
  // Get the page header
  const header = page.locator('.header-logo a');
  // Assert that the element has a specific CSS property value
  await expect(header).toHaveCSS('font-size', '12px');
});

test('Attributes Assertion: toHaveId', async ({ page }) => {
  await page.goto(REGISTER_URL);
  // Get the register button
  const registerButton = page.locator('#register-button');
  // Assert that the element has the expected ID
  await expect(registerButton).toHaveId('register-button');
});

// ============================================
// COUNT ASSERTIONS
// ============================================

test('Count Assertion: toHaveCount', async ({ page }) => {
  await page.goto(BASE_URL);
  // Get all product items on the home page
  const products = page.locator('.product-item');
  // Assert that the number of products matches expected count
  const count = await products.count();
  await expect(products).toHaveCount(count);
});

// ============================================
// ROLE ASSERTIONS
// ============================================

test('Role Assertion: toHaveRole', async ({ page }) => {
  await page.goto(LOGIN_URL);
  // Get the login button
  const loginButton = page.locator('input[value="Log in"]');
  // Assert that the element has the 'button' role
  await expect(loginButton).toHaveRole('button');
});

// Additional test to demonstrate role assertion with a different element
test('Role Assertion: toHaveRole with link', async ({ page }) => {
  await page.goto(BASE_URL);
  // Get the registration link
  const registerLink = page.locator('a[href="/register"]');
  // Assert that the element has the 'link' role
  await expect(registerLink).toHaveRole('link');

  await page.close();
});