import { Page, Locator } from '@playwright/test';

export class MenuContainer{
    readonly page: Page;
    readonly menuButtonContainer: Locator;
    readonly openMenuButton: Locator;
    readonly closeMenuButton: Locator;
    readonly allItems: Locator;
    readonly about: Locator;
    readonly logoutButton: Locator;
    readonly resetAppState: Locator;

    constructor(page: Page){
        this.page = page;
        this.menuButtonContainer = page.locator('#menu_button_container');
        this.openMenuButton = page.getByRole('button', { name: 'Open Menu' });
        this.closeMenuButton = page.getByRole('button', { name: 'Close Menu' });
        this.allItems = page.locator('[data-test="inventory-sidebar-link"]');
        this.about = page.locator('[data-test="about-sidebar-link"]');
        this.logoutButton = page.locator('[data-test="logout-sidebar-link"]');
        this.resetAppState = page.locator('[data-test="reset-sidebar-link"]');
    }
    async openMenu(){
        await this.openMenuButton.click();
    }
    async closeMenu(){
        await this.closeMenuButton.click();
    }
    async logout(){
        await this.logoutButton.click();
    }
    async resetAppStateClick(){
        await this.resetAppState.click();
    }
}