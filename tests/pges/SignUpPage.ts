import { Page, Locator } from '@playwright/test';

export class SignUpPage {

    // Define properties
    private readonly page: Page;
    private readonly signUpLink: Locator;
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly signUpButton: Locator;

    // Initialize page context and elements
    constructor(page: Page) {
        this.page = page;
        this.signUpLink = this.page.locator('#signin2');
        this.usernameInput = this.page.locator('#sign-username');
        this.passwordInput = this.page.locator('#sign-password');
        this.signUpButton = this.page.locator('div.modal-footer button:has-text("Sign up")');
    }

    // Create reusable user actions
    async navigateToSignUp() {
        await this.signUpLink.click();
    }

    async fillUsername(username: string) {
        await this.usernameInput.clear();
        await this.usernameInput.fill(username);
    }

    async fillPassword(password: string) {
        await this.passwordInput.clear();
        await this.passwordInput.fill(password);
    }

    async submitSignUp() {
        await this.signUpButton.click();
    }

    async signUp(username: string, password: string): Promise<string> {
        await this.navigateToSignUp();
        await this.fillUsername(username);
        await this.fillPassword(password);

        const dialogPromise = this.page.waitForEvent('dialog');
        await this.submitSignUp();

        const dialog = await dialogPromise;
        const message = dialog.message();
        await dialog.accept();

        return message;
    }


}
