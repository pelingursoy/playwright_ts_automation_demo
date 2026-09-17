import { test, expect } from '@playwright/test';

import { LoginPage } from './pages/LoginPage';
import { HomePage } from './pages/HomePage';
import { CartPage } from './pages/CartPage';
import { SignUpPage } from './pages/SignUpPage';

test.describe.configure({ mode: 'serial' });

test.describe('Demoblaze Tests', () => {
  const baseUrl = 'https://www.demoblaze.com/index.html';
  const testProduct = 'Nexus 6';
  const testPassword = 'Test@1234';
  let signedUpUser: { username: string; password: string } | undefined;

  test.beforeEach(async ({ page }) => {
    await page.goto(baseUrl);
  });

  test.afterEach(async ({ page }) => {
    await page.close()
  });


  test('User can sign up with a new account', async ({ page }) => {
    const signUpPage = new SignUpPage(page);
    signedUpUser = {
      username: `pavan_${Date.now()}`,
      password: testPassword
    };

    const alertMessage = await signUpPage.signUp(signedUpUser.username, signedUpUser.password);
    expect(alertMessage).toContain('Sign up successful');
  });

  test('User can login, add a product to cart and verify it', async ({ page }) => {
    expect(signedUpUser).toBeDefined();

    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);

    await loginPage.navigateToLogin();
    await loginPage.login(signedUpUser!.username, signedUpUser!.password);

    await page.waitForTimeout(2000);
    await homePage.addProductToCart(testProduct);
    await page.waitForTimeout(1000);

    await homePage.navigateToCart();
    await page.waitForTimeout(1000);

    await cartPage.waitForCartToLoad();
    const isProductInCart = await cartPage.isProductInCart(testProduct);
    expect(isProductInCart).toBe(true);
  });

  //Assignment: Add a test case to remove a product from the cart and verify that it has been removed successfully.
  test('User can remove product from cart', async ({ page }) => {
    expect(signedUpUser).toBeDefined();

    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);

    await loginPage.navigateToLogin();
    await loginPage.login(signedUpUser!.username, signedUpUser!.password);
    await page.waitForTimeout(2000);

    await homePage.addProductToCart(testProduct);
    await page.waitForTimeout(1000);

    await homePage.navigateToCart();
    await cartPage.waitForCartToLoad();

    let isProductInCart = await cartPage.isProductInCart(testProduct);
    if(isProductInCart){
      await cartPage.removeProductFromCart(testProduct);
     await page.waitForTimeout(1000);
    }
    
    //verify that the product has been removed from the cart
    isProductInCart = await cartPage.isProductInCart(testProduct);
     expect(isProductInCart).not.toBe(true);

    await page.close()

  });
});