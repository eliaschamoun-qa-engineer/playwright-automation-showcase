import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly errorButton: Locator;
  readonly loginCredentialsContainer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.getByText('Swag Labs');
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.errorButton = page.locator('[data-test="error-button"]');
    this.loginCredentialsContainer = page.locator('[data-test="login-credentials-container"]');
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.waitFor({ state: 'visible' });
    if (username) {
      await this.usernameInput.fill(username);
    } else {
      await this.usernameInput.clear();
    }
    if (password) {
      await this.passwordInput.fill(password);
    } else {
      await this.passwordInput.clear();
    }
    await this.loginButton.click();
  }

  async clearUsername(): Promise<void> {
    await this.usernameInput.clear();
  }

  async clearPassword(): Promise<void> {
    await this.passwordInput.clear();
  }

  async dismissErrorMessage(): Promise<void> {
    await this.errorButton.click();
  }

  async getErrorMessageText(): Promise<string> {
    return (await this.errorMessage.textContent()) || '';
  }
}