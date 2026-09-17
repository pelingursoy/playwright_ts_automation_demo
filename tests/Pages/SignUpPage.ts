import { Page, Locator } from '@playwright/test';

export class SignUpPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly signUpButton: Locator;

  constructor(page: Page) {
    this.page = page;
    const signUpDialog = page.getByRole('dialog', { name: 'Sign up' });
    this.usernameInput = signUpDialog.getByRole('textbox', { name: 'Username:' });
    this.passwordInput = signUpDialog.getByRole('textbox', { name: 'Password:' });
    this.signUpButton = signUpDialog.getByRole('button', { name: 'Sign up' });
  }

  async enterUsername(username: string): Promise<void> {
    await this.usernameInput.fill(username);
  }

  async enterPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async clickSignUpButton(): Promise<void> {
    await this.signUpButton.click();
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
