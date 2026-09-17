
import { test, expect, Page } from '@playwright/test';

import { LoginPage } from './pages/LoginPage';
import { HomePage } from './pages/HomePage';
import { CartPage } from './pages/CartPage';
import { SignUpPage } from './pages/SignUpPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { CheckoutPage } from './pages/CheckoutPage';

test.describe('DemoBlaze Application Tests', () => {
  let homePage: HomePage;
  let signUpPage: SignUpPage;
  let loginPage: LoginPage;
  let productDetailsPage: ProductDetailsPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    signUpPage = new SignUpPage(page);
    loginPage = new LoginPage(page);
    productDetailsPage = new ProductDetailsPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    await homePage.goto();
  });

    test.afterEach(async ({ page }) => {
    await page.close()
  });


  test('TC-01 Successful Sign Up', async ({ page }) => {
    // Click Sign up link
    await homePage.clickSignUp();

    // Generate unique username
    const username = `user_${Date.now()}`;
    const password = 'TestPassword123';

    // Enter credentials
    await signUpPage.enterUsername(username);
    await signUpPage.enterPassword(password);

    const alertMessage = signUpPage.captureNextAlert();

    // Click Sign up button
    await signUpPage.clickSignUpButton();
    expect(await alertMessage).toBe('Sign up successful.');
  });

  test('TC-02 Duplicate Sign Up', async ({ page }) => {
    // Use an existing username
    const existingUsername = 'testuser';
    const password = 'TestPassword123';

    // Click Sign up link
    await homePage.clickSignUp();

    // Enter credentials
    await signUpPage.enterUsername(existingUsername);
    await signUpPage.enterPassword(password);

    const alertMessage = signUpPage.captureNextAlert();

    // Click Sign up button
    await signUpPage.clickSignUpButton();
    expect(await alertMessage).toContain('This user already exist');
  });

  test('TC-03 Successful Login', async ({ page }) => {
    const username = `login_user_${Date.now()}`;
    const password = 'TestPassword123';

    // Create valid credentials for this test.
    await homePage.clickSignUp();
    await signUpPage.enterUsername(username);
    await signUpPage.enterPassword(password);
    const signUpAlertMessage = signUpPage.captureNextAlert();
    await signUpPage.clickSignUpButton();
    expect(await signUpAlertMessage).toBe('Sign up successful.');

    // Log in with the credentials created above.
    await homePage.clickLogin();
    await loginPage.enterUsername(username);
    await loginPage.enterPassword(password);
    await loginPage.clickLoginButton();

    // Verify welcome message appears
    const welcomeMessage = await homePage.getWelcomeMessage();
    expect(welcomeMessage).toContain('Welcome');
    expect(welcomeMessage).toContain(username);
  });

  test('TC-04 Invalid Login', async ({ page }) => {
    // Click Log in link
    await homePage.clickLogin();

    // Enter invalid credentials
    const username = 'invaliduser123456';
    const password = 'wrongpassword';

    // Enter credentials
    await loginPage.enterUsername(username);
    await loginPage.enterPassword(password);

    // Handle alert dialog
    const alertMessage = loginPage.captureNextAlert();

    // Click Log in button
    await loginPage.clickLoginButton();
    expect(await alertMessage).toMatch(/Wrong password|User does not exist\./);
  });

  test('TC-05 Category Filtering', async ({ page }) => {
    // Filter by Phones category
    await homePage.filterByCategory('Phones');

    // Verify Phones are displayed
    let isPhoneVisible = await homePage.isProductVisible('Samsung galaxy s6');
    expect(isPhoneVisible).toBeTruthy();

    // Filter by Laptops category
    await homePage.filterByCategory('Laptops');

    // Verify Laptops are displayed
    await homePage.waitForProduct('Sony vaio i5');
    isPhoneVisible = await homePage.isProductVisible('Sony vaio i5');
    expect(isPhoneVisible).toBeTruthy();

    // Filter by Monitors category
    await homePage.filterByCategory('Monitors');

    // Verify Monitors are displayed
    await homePage.waitForProduct('ASUS Full HD');
    isPhoneVisible = await homePage.isProductVisible('ASUS Full HD');
    expect(isPhoneVisible).toBeTruthy();
  });

  test('TC-06 Product Details', async ({ page }) => {
    // Click on product
    await homePage.clickProductByName('Samsung galaxy s6');

    // Verify product details
    const title = await productDetailsPage.getProductTitle();
    expect(title).toContain('Samsung galaxy s6');

    const price = await productDetailsPage.getProductPrice();
    expect(price).toContain('360');
  });

  test('TC-07 Add Item to Cart', async ({ page }) => {
    // Click on product
    await homePage.clickProductByName('Samsung galaxy s6');

    // Click Add to cart
    const alertMessage = productDetailsPage.captureNextAlert();

    await productDetailsPage.clickAddToCart();
    expect(await alertMessage).toBe('Product added');
  });

  test('TC-08 Cart Total Verification', async ({ page }) => {
    // Add a product to cart
    await homePage.clickProductByName('Samsung galaxy s6');

    const addToCartAlert = productDetailsPage.captureNextAlert();

    await productDetailsPage.clickAddToCart();
    await addToCartAlert;

    // Navigate to cart
    await homePage.clickCart();

    // Verify cart contains the product and total is correct
    const total = await cartPage.getCartTotal();
    expect(total).toContain('360');

    const itemCount = await cartPage.getCartItemCount();
    expect(itemCount).toBeGreaterThan(0);
  });

  test('TC-09 Remove Item from Cart', async ({ page }) => {
    // Add a product to cart
    await homePage.clickProductByName('Samsung galaxy s6');

    const addToCartAlert = productDetailsPage.captureNextAlert();

    await productDetailsPage.clickAddToCart();
    await addToCartAlert;

    // Navigate to cart
    await homePage.clickCart();

    // Get initial item count
    await cartPage.waitForCartItem();
    const initialCount = await cartPage.getCartItemCount();

    // Delete item from cart
    await cartPage.deleteCartItem('Samsung galaxy s6');

    // Verify item is removed
    const finalCount = await cartPage.getCartItemCount();
    expect(finalCount).toBeLessThan(initialCount);
  });

  test('TC-10 Complete Purchase', async ({ page }) => {
    // Add a product to cart
    await homePage.clickProductByName('Samsung galaxy s6');

    const alertMessage = productDetailsPage.captureNextAlert();

    await productDetailsPage.clickAddToCart();
    await alertMessage;

    // Navigate to cart
    await homePage.clickCart();

    // Click Place Order
    await cartPage.clickPlaceOrder();

    // Fill checkout form
    await checkoutPage.fillName('John Doe');
    await checkoutPage.fillCountry('USA');
    await checkoutPage.fillCity('New York');
    await checkoutPage.fillCreditCard('4111111111111111');
    await checkoutPage.fillMonth('12');
    await checkoutPage.fillYear('2025');

    // Click Purchase
    await checkoutPage.clickPurchase();
    await expect(checkoutPage.purchaseConfirmation).toBeVisible();
    await expect(checkoutPage.purchaseConfirmation).toContainText('Thank you for your purchase!');
    await checkoutPage.closePurchaseConfirmation();
  });

  test('TC-11 Missing Required Fields in Purchase', async ({ page }) => {
    // Add a product to cart
    await homePage.clickProductByName('Samsung galaxy s6');

    const addToCartAlert = productDetailsPage.captureNextAlert();

    await productDetailsPage.clickAddToCart();
    await addToCartAlert;

    // Navigate to cart
    await homePage.clickCart();

    // Click Place Order
    await cartPage.clickPlaceOrder();

    // Fill only some fields, leaving Name and Credit Card blank
    // Leave Name blank
    // Leave Credit Card blank
    await checkoutPage.fillCountry('USA');
    await checkoutPage.fillCity('New York');
    await checkoutPage.fillMonth('12');
    await checkoutPage.fillYear('2025');

    // Handle alert for missing fields
    const alertMessage = checkoutPage.captureNextAlert();

    // Click Purchase
    await checkoutPage.clickPurchase();
    expect(await alertMessage).toBe('Please fill out Name and Creditcard.');
  });
});
