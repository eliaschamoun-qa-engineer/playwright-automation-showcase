import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly cartList: Locator;
  readonly cartItems: Locator;
  readonly itemQuantities: Locator;
  readonly itemNames: Locator;
  readonly itemDescs: Locator;
  readonly itemPrices: Locator;
  readonly removeButtons: Locator;
  readonly continueShoppingButton: Locator;
  readonly checkoutButton: Locator;
  readonly shoppingCartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('[data-test="title"]');
    this.cartList = page.locator('[data-test="cart-list"]');
    this.cartItems = page.locator('[data-test="inventory-item"]');
    this.itemQuantities = page.locator('[data-test="item-quantity"]');
    this.itemNames = page.locator('[data-test="inventory-item-name"]');
    this.itemDescs = page.locator('[data-test="inventory-item-desc"]');
    this.itemPrices = page.locator('[data-test="inventory-item-price"]');
    this.removeButtons = page.locator('button[data-test^="remove-"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.shoppingCartBadge = page.locator('[data-test="shopping-cart-badge"]');
  }

  async goto(): Promise<void> {
    await this.page.goto('/cart.html');
  }

  async removeItemByName(name: string): Promise<void> {
    const item = this.cartItems.filter({ hasText: name });
    await item.locator('button[data-test^="remove-"]').click();
  }

  async removeItemByIndex(index: number): Promise<void> {
    await this.removeButtons.nth(index).click();
  }

  async removeAllItems(): Promise<void> {
    const count = await this.removeButtons.count();
    for (let i = 0; i < count; i++) {
      await this.removeButtons.first().click();
    }
  }

  async continueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }

  async getItemNames(): Promise<string[]> {
    return await this.itemNames.allInnerTexts();
  }

  async getItemCount(): Promise<number> {
    return await this.cartItems.count();
  }
}
