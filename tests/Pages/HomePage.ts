import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly signUpLink: Locator;
  readonly loginLink: Locator;
  readonly cartLink: Locator;
  readonly productCards: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signUpLink = page.locator('a#signin2');
    this.loginLink = page.locator('a#login2');
    this.cartLink = page.locator('a[href="cart.html"]');
    this.productCards = page.locator('#tbodyid .card');
  }

  async goto(): Promise<void> {
    await this.page.goto('https://demoblaze.com');
  }

  async clickSignUp(): Promise<void> {
    await this.signUpLink.click();
  }

  async clickLogin(): Promise<void> {
    await this.loginLink.click();
  }

  async clickCart(): Promise<void> {
    await this.cartLink.click();
  }

  async filterByCategory(category: 'Phones' | 'Laptops' | 'Monitors'): Promise<void> {
    await this.page.locator(`a:has-text("${category}")`).click();
    await this.productCards.first().waitFor();
  }

  async clickProductByName(productName: string): Promise<void> {
    await this.page.locator(`a.hrefch:has-text("${productName}")`).click();
  }

  async getWelcomeMessage(): Promise<string | null> {
    const welcomeElement = this.page.locator('#nameofuser');
    await welcomeElement.waitFor({ state: 'visible' });
    return await welcomeElement.textContent();
  }

  async isProductVisible(productName: string): Promise<boolean> {
    const product = this.page.locator(`a.hrefch:has-text("${productName}")`);
    return await product.isVisible();
  }

  async waitForProduct(productName: string): Promise<void> {
    await this.page.locator(`a.hrefch:has-text("${productName}")`).waitFor({ state: 'visible' });
  }

}