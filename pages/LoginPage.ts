import {Page, Locator } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly pageTitle: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.pageTitle = page.getByText('Swag Labs');
        this.emailInput = page.locator('[data-test="username"]');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('[type="submit"]');
        this.errorMessage = page.locator('[data-test="error"]');
    }
    async login(email: string, password: string){
        await this.emailInput.waitFor({state: 'visible'});
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
    async clearUsername(){
        await this.emailInput.clear();
    }
    async clearPassword(){
        await this.passwordInput.clear();
    }
    
}