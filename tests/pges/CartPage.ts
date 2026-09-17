import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  private readonly page: Page;
  private readonly productRows: Locator;
  private readonly productNameCells: Locator;
  private readonly productPriceCells: Locator;
  private readonly placeOrderButton: Locator;
  private readonly totalPrice: Locator;
  private readonly deleteButtons: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productRows = page.locator('#tbodyid tr');
    this.productNameCells = page.locator('#tbodyid tr td:nth-child(2)');
    this.productPriceCells = page.locator('#tbodyid tr td:nth-child(3)');
    this.placeOrderButton = page.locator('button:has-text("Place Order")');
    this.totalPrice = page.locator('#totalp');
    this.deleteButtons = page.locator('#tbodyid tr td:last-child a');
  }


  async isProductInCart(productName: string) {
    const productNames = await this.productNameCells.all();

    for (const product of productNames) {
      const name = (await product.textContent())?.trim();
      if (name === productName) {
        return true;
      }
    }

    return false;
  }

  async getProductNames() {
    const productNames = await this.productNameCells.all();
    const names: string[] = [];

    for (const product of productNames) {
      const name = (await product.textContent())?.trim() || '';
      names.push(name);
    }

    return names;
  }

  async getProductPrices() {
    const priceElements = await this.productPriceCells.all();
    const prices: number[] = [];

    for (const price of priceElements) {
      const priceText = (await price.textContent())?.trim() || '0';
      prices.push(parseFloat(priceText));
    }

    return prices;
  }

  // Cart management methods
  async removeProductFromCart(productName: string) {
    const rows = await this.productRows.all();
    const matchingRows = [] as Array<{ row: Locator; deleteButton: Locator }>;

    for (const row of rows) {
      const nameCell = row.locator('td:nth-child(2)');
      const name = await nameCell.textContent();

      if (name?.trim() === productName) {
        matchingRows.push({
          row,
          deleteButton: row.locator('td:last-child a')
        });
      }
    }

    if (matchingRows.length === 0) {
      throw new Error(`Product "${productName}" not found in cart`);
    }

    for (const { deleteButton } of matchingRows) {
      await deleteButton.click({ force: true });
      await this.page.waitForTimeout(500);
    }
  }

  async clearCart() {
    const deleteButtons = await this.deleteButtons.all();

    for (const button of deleteButtons) {
      await button.click();
      await this.page.waitForTimeout(300);
    }
  }

  // Checkout methods
  async proceedToCheckout() {
    await this.placeOrderButton.click();
  }

 
  async getTotalCartValue() {
    const totalText = await this.totalPrice.textContent();
    return parseFloat(totalText?.trim() || '0');
  }

  // Count methods
  async getProductCount(productName: string): Promise<number> {
    const productNames = await this.getProductNames();
    return productNames.filter(name => name === productName).length;
  }

  // Wait methods
  async waitForCartToLoad() {
    await this.page.waitForSelector('#tbodyid tr', { state: 'visible' });
  }

  async waitForCartEmpty() {
    await this.page.waitForSelector('#tbodyid tr', { state: 'hidden' });
  }
}