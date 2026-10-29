import { Page, Locator } from '@playwright/test';

export class MenuContainer {
  readonly page: Page;
  readonly menuButtonContainer: Locator;
  readonly openMenuButton: Locator;
  readonly closeMenuButton: Locator;
  readonly allItemsLink: Locator;
  readonly aboutLink: Locator;
  readonly logoutLink: Locator;
  readonly resetAppStateLink: Locator;
  readonly bmMenuWrap: Locator;

  constructor(page: Page) {
    this.page = page;
    this.menuButtonContainer = page.locator('#menu_button_container');
    this.openMenuButton = page.getByRole('button', { name: 'Open Menu' });
    this.closeMenuButton = page.getByRole('button', { name: 'Close Menu' });
    this.allItemsLink = page.locator('[data-test="inventory-sidebar-link"]');
    this.aboutLink = page.locator('[data-test="about-sidebar-link"]');
    this.logoutLink = page.locator('[data-test="logout-sidebar-link"]');
    this.resetAppStateLink = page.locator('[data-test="reset-sidebar-link"]');
    this.bmMenuWrap = page.locator('.bm-menu-wrap');
  }

  async openMenu(): Promise<void> {
    await this.openMenuButton.click();
    await this.bmMenuWrap.waitFor({ state: 'visible' });
  }

  async closeMenu(): Promise<void> {
    await this.closeMenuButton.click();
    await this.bmMenuWrap.waitFor({ state: 'hidden' });
  }

  async clickAllItems(): Promise<void> {
    await this.allItemsLink.click();
  }

  async clickAbout(): Promise<void> {
    await this.aboutLink.click();
  }

  async logout(): Promise<void> {
    await this.logoutLink.click();
  }

  async resetAppState(): Promise<void> {
    await this.resetAppStateLink.click();
  }
}