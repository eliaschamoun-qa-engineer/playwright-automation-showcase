import  {Page, Locator} from '@playwright/test';

export class CartPage{
    readonly page: Page;
    readonly yourCartLabel: Locator;
    readonly cart: Locator;
    readonly quantityLabel: Locator;
    readonly descriptionLabel: Locator;
    readonly productName: Locator;
    readonly productDesc: Locator;
    readonly productPrice: Locator;
    readonly removeFromCartButton: Locator;
    readonly continueShoppingButton: Locator;
    readonly checkoutButton: Locator;

    constructor(page: Page){
        this.page = page;
        this.yourCartLabel = page.locator('');
        this.cart = page.locator('#shopping_cart_container');
        this.quantityLabel = page.locator('[data-test="cart-quantity-label"]');
        this.descriptionLabel = page.locator('[data-test="cart-desc-label"]');
        this.productName = page.locator('[data-test="inventory-item-name"]');
        this.productDesc = page.locator('[data-test="inventory-item-desc"]');
        this.productPrice = page.locator('[data-test="inventory-item-price"]');
        this.continueShoppingButton = page.locator('');
        this.checkoutButton = page.locator('');
        this.removeFromCartButton = page.locator('class="btn btn_secondary btn_small cart_button"');
    }

}