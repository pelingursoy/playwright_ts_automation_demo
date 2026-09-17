import { Page, Locator } from '@playwright/test';

export class ProductDetailsPage {
  readonly page: Page;
  readonly productTitle: Locator;
  readonly productPrice: Locator;
  readonly addToCartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productTitle = page.locator('h2');
    this.productPrice = page.locator('h3').first();
    this.addToCartButton = page.locator('a:has-text("Add to cart")');
  }

  async getProductTitle(): Promise<string | null> {
    return await this.productTitle.textContent();
  }

  async getProductPrice(): Promise<string | null> {
    return await this.productPrice.textContent();
  }

  async clickAddToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  captureNextAlert(): Promise<string> {
    return new Promise(resolve => {
      this.page.once('dialog', async dialog => {
        const message = dialog.message();
        await dialog.accept();
        resolve(message);
      });
    });
  }
}