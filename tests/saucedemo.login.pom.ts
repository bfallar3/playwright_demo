import { Page } from '@playwright/test';

export class LoginPage {
    private page: Page;
    private usernameInput;
    private passwordInput;
    private loginButton;
    private errorMessage;

    constructor(page: Page) {
        this.page = page;

        this.usernameInput = this.page.locator('#user-name');
        this.passwordInput = this.page.locator('#password');
        this.loginButton = this.page.locator('#login-button');
        this.errorMessage = this.page.locator('h3[data-test=error]');
    }

    async navigate() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async getErrorMessage() {
        return await this.errorMessage.textContent();
    }
}
