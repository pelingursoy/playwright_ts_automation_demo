import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartRows: Locator;
  readonly cartTotal: Locator;
  readonly placeOrderButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartRows = page.locator('#tbodyid tr');
    this.cartTotal = page.locator('#totalp');
    this.placeOrderButton = page.locator('button:has-text("Place Order")');
  }

  async goto(): Promise<void> {
    await this.page.goto('https://demoblaze.com/cart.html');
  }

  async getCartTotal(): Promise<string | null> {
    await this.cartRows.first().waitFor();
    return await this.cartTotal.textContent();
  }

  async getCartItemCount(): Promise<number> {
    return await this.cartRows.count();
  }

  async waitForCartItem(): Promise<void> {
    await this.cartRows.first().waitFor({ state: 'visible' });
  }

  async deleteCartItem(productName: string): Promise<void> {
    const count = await this.cartRows.count();
    for (let i = 0; i < count; i++) {
      const row = this.cartRows.nth(i);
      const cellText = await row.textContent();
      if (cellText && cellText.includes(productName)) {
        await row.getByRole('link', { name: 'Delete' }).click();
        await row.waitFor({ state: 'detached' });
        break;
      }
    }
  }

  async clickPlaceOrder(): Promise<void> {
    await this.placeOrderButton.click();
  }
}