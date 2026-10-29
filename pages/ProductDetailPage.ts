import { Page, Locator } from '@playwright/test';

export class ProductDetailPage {
  readonly page: Page;
  readonly backToProductsButton: Locator;
  readonly productName: Locator;
  readonly productDesc: Locator;
  readonly productPrice: Locator;
  readonly productImage: Locator;
  readonly addToCartButton: Locator;
  readonly removeFromCartButton: Locator;
  readonly shoppingCartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.backToProductsButton = page.locator('[data-test="back-to-products"]');
    this.productName = page.locator('[data-test="inventory-item-name"]');
    this.productDesc = page.locator('[data-test="inventory-item-desc"]');
    this.productPrice = page.locator('[data-test="inventory-item-price"]');
    this.productImage = page.locator('.inventory_details_img');
    this.addToCartButton = page.locator('button[data-test^="add-to-cart"]');
    this.removeFromCartButton = page.locator('button[data-test^="remove"]');
    this.shoppingCartBadge = page.locator('[data-test="shopping-cart-badge"]');
  }

  async backToProducts(): Promise<void> {
    await this.backToProductsButton.click();
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  async removeFromCart(): Promise<void> {
    await this.removeFromCartButton.click();
  }
}
