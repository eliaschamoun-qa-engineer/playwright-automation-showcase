import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;
    
    // Step 1: Cart Elements (Consider moving to a dedicated CartPage.ts later)
    readonly yourCartLabel: Locator;
    readonly qtyLabel: Locator;
    readonly cartDescLabel: Locator;
    readonly continueShoppingButton: Locator;
    readonly checkoutButton: Locator;
    readonly removeFromCartButton: Locator;
    readonly items: Locator;
    readonly itemQuantity: Locator;

    // Step 2: Shipping Information Form
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly postalCodeInput: Locator;
    readonly continueButton: Locator;
    readonly errorMessage: Locator; // Captured from your negative test

    // Step 3: Overview
    readonly paymentInfoLabel: Locator;
    readonly shippingInfoLabel: Locator;
    readonly totalInfoLabel: Locator;
    readonly titleLabel: Locator;
    readonly finishButton: Locator;
    readonly cancelButton: Locator;
    readonly cartList: Locator;

    // Step 4: Complete
    readonly completeHeader: Locator;
    readonly completeText: Locator;
    readonly ponyExpressImage: Locator;
    readonly backHomeButton: Locator;

    constructor(page: Page) {
        this.page = page;
        
        // Cart Step
        this.yourCartLabel = page.locator('.title', { hasText: 'Your Cart' });
        this.qtyLabel = page.locator('.cart_quantity_label');
        this.cartDescLabel = page.locator('.cart_desc_label');
        this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.removeFromCartButton = page.locator('[data-test^="remove-"]');
        this.items = page.locator('.cart_item');
        this.itemQuantity = page.locator('.cart_quantity');

        // Information Step
        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.postalCodeInput = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.errorMessage = page.locator('[data-test="error"]');

        // Overview Step
        this.paymentInfoLabel = page.locator('.summary_info_label', { hasText: 'Payment Information:' });
        this.shippingInfoLabel = page.locator('.summary_info_label', { hasText: 'Shipping Information:' });
        this.totalInfoLabel = page.locator('.summary_info_label', { hasText: 'Price Total' });
        this.titleLabel = page.locator('.title');
        this.finishButton = page.locator('[data-test="finish"]');
        this.cancelButton = page.locator('[data-test="cancel"]');
        this.cartList = page.locator('.cart_list');

        // Complete Step
        this.completeHeader = page.locator('.complete-header');
        this.completeText = page.locator('.complete-text');
        this.ponyExpressImage = page.locator('.pony_express');
        this.backHomeButton = page.locator('[data-test="back-to-products"]');
    }

    async initiateCheckout(): Promise<void> {
        await this.checkoutButton.waitFor({state: 'visible'});
        await this.checkoutButton.click();
    }

    async fillShippingInformation(firstName: string, lastName: string, postalCode: string): Promise<void> {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
        await this.continueButton.click();
    }
}