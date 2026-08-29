import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly inventoryList: Locator;
  readonly inventoryItems: Locator;
  readonly itemNames: Locator;
  readonly itemPrices: Locator;
  readonly itemDescs: Locator;
  readonly itemImages: Locator;
  readonly sortingDropdown: Locator;
  readonly activeSortOption: Locator;
  readonly shoppingCartLink: Locator;
  readonly shoppingCartBadge: Locator;
  readonly addToCartButtons: Locator;
  readonly removeFromCartButtons: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('[data-test="title"]');
    this.inventoryList = page.locator('[data-test="inventory-list"]');
    this.inventoryItems = page.locator('[data-test="inventory-item"]');
    this.itemNames = page.locator('[data-test="inventory-item-name"]');
    this.itemPrices = page.locator('[data-test="inventory-item-price"]');
    this.itemDescs = page.locator('[data-test="inventory-item-desc"]');
    this.itemImages = page.locator('.inventory_item_img img');
    this.sortingDropdown = page.locator('[data-test="product-sort-container"]');
    this.activeSortOption = page.locator('[data-test="active-option"]');
    this.shoppingCartLink = page.locator('[data-test="shopping-cart-link"]');
    this.shoppingCartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.addToCartButtons = page.locator('button[data-test^="add-to-cart-"]');
    this.removeFromCartButtons = page.locator('button[data-test^="remove-"]');
  }

  async goto(): Promise<void> {
    await this.page.goto('/inventory.html');
  }

  async addProductToCartByIndex(index: number): Promise<void> {
    await this.addToCartButtons.nth(index).click();
  }

  async removeProductFromCartByIndex(index: number): Promise<void> {
    await this.removeFromCartButtons.nth(index).click();
  }

  async addProductByName(name: string): Promise<void> {
    const itemContainer = this.inventoryItems.filter({ hasText: name });
    await itemContainer.locator('button[data-test^="add-to-cart-"]').click();
  }

  async removeProductByName(name: string): Promise<void> {
    const itemContainer = this.inventoryItems.filter({ hasText: name });
    await itemContainer.locator('button[data-test^="remove-"]').click();
  }

  async clickProductTitle(name: string): Promise<void> {
    await this.itemNames.filter({ hasText: name }).click();
  }

  async clickProductImage(index: number): Promise<void> {
    await this.itemImages.nth(index).click();
  }

  async clickShoppingCart(): Promise<void> {
    await this.shoppingCartLink.click();
  }

  async selectSortingOption(optionValueOrText: string): Promise<void> {
    await this.sortingDropdown.selectOption(optionValueOrText);
  }

  async getProductNames(): Promise<string[]> {
    return await this.itemNames.allInnerTexts();
  }

  async getProductPrices(): Promise<string[]> {
    return await this.itemPrices.allInnerTexts();
  }

  async getProductPricesAsNumbers(): Promise<number[]> {
    const prices = await this.getProductPrices();
    return prices.map((p) => parseFloat(p.replace(/[^0-9.]/g, '')));
  }

  async getCartBadgeCount(): Promise<number> {
    const isVisible = await this.shoppingCartBadge.isVisible();
    if (!isVisible) return 0;
    const text = await this.shoppingCartBadge.innerText();
    return parseInt(text.trim(), 10) || 0;
  }

  async returnCartItemsNumber(): Promise<string> {
    const isVisible = await this.shoppingCartBadge.isVisible();
    if (isVisible) {
      return await this.shoppingCartBadge.innerText();
    }
    return '0';
  }
}