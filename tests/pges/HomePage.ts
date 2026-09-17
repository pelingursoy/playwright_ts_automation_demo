import { Page, Locator } from '@playwright/test';

export class HomePage {
  private readonly page: Page;
  private readonly productLinks: Locator;
  private readonly addToCartButton: Locator;
  private readonly cartLink: Locator;
  private readonly categoryLinks: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productLinks = page.locator('div#tbodyid div.card h4.card-title a');
    this.addToCartButton = page.locator('a:has-text("Add to cart")');
    this.cartLink = page.locator('#cartur');
    this.categoryLinks = page.locator('.list-group a');
  }

  // Navigation methods
  async navigateToCart() {
    await this.cartLink.click();
  }

  // Product actions
  async addProductToCart(productName: string) {
    // Click on the product to view its details
    await this.selectProductByName(productName);
    
    // Handle the dialog that appears after adding to cart
    this.page.once('dialog', async dialog => {
      if (dialog.message().includes('added')) {
        await dialog.accept();
      }
    });

    // Click the "Add to cart" button
    await this.addToCartButton.click();
  }

  async selectProductByName(productName: string) {
    const productElements = await this.productLinks.all();
    
    for (const product of productElements) {
      const name = await product.textContent();
      if (name?.trim() === productName) {
        await product.click();
        return;
      }
    }
    
    throw new Error(`Product "${productName}" not found on the page`);
  }

  // Category filtering
  async selectCategory(categoryName: string) {
    const categories = await this.categoryLinks.all();
    
    for (const category of categories) {
      const name = await category.textContent();
      if (name?.trim().toLowerCase() === categoryName.toLowerCase()) {
        await category.click();
        await this.page.waitForLoadState('networkidle');
        return;
      }
    }
    
    throw new Error(`Category "${categoryName}" not found`);
  }

  // Verification methods
  async isProductVisible(productName: string) {
    const products = await this.productLinks.all();
    
    for (const product of products) {
      const name = await product.textContent();
      if (name?.trim() === productName) {
        return true;
      }
    }
    
    return false;
  }

  // Wait methods
  async waitForProductsToLoad() {
    await this.page.waitForSelector('div#tbodyid div.card', { state: 'visible' });
  }
}