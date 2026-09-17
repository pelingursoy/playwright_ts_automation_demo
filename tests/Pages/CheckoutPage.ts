import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly countryInput: Locator;
  readonly cityInput: Locator;
  readonly creditCardInput: Locator;
  readonly monthInput: Locator;
  readonly yearInput: Locator;
  readonly purchaseButton: Locator;
  readonly purchaseConfirmation: Locator;
  readonly purchaseConfirmationOkButton: Locator;

  constructor(page: Page) {
    this.page = page;
    const orderDialog = page.getByRole('dialog', { name: 'Place order' });
    this.nameInput = orderDialog.getByRole('textbox', { name: /Name/ });
    this.countryInput = orderDialog.getByRole('textbox', { name: 'Country:' });
    this.cityInput = orderDialog.getByRole('textbox', { name: 'City:' });
    this.creditCardInput = orderDialog.getByRole('textbox', { name: 'Credit card:' });
    this.monthInput = orderDialog.getByRole('textbox', { name: 'Month:' });
    this.yearInput = orderDialog.getByRole('textbox', { name: 'Year:' });
    this.purchaseButton = orderDialog.getByRole('button', { name: 'Purchase' });
    this.purchaseConfirmation = page.getByRole('heading', { name: 'Thank you for your purchase!' });
    this.purchaseConfirmationOkButton = page.getByRole('button', { name: 'OK' });
  }

  async fillName(name: string): Promise<void> {
    await this.nameInput.fill(name);
  }

  async fillCountry(country: string): Promise<void> {
    await this.countryInput.fill(country);
  }

  async fillCity(city: string): Promise<void> {
    await this.cityInput.fill(city);
  }

  async fillCreditCard(creditCard: string): Promise<void> {
    await this.creditCardInput.fill(creditCard);
  }

  async fillMonth(month: string): Promise<void> {
    await this.monthInput.fill(month);
  }

  async fillYear(year: string): Promise<void> {
    await this.yearInput.fill(year);
  }

  async clickPurchase(): Promise<void> {
    await this.purchaseButton.click();
  }

  async closePurchaseConfirmation(): Promise<void> {
    await this.purchaseConfirmationOkButton.click();
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
