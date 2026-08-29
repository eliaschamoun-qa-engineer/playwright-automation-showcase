import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;

  // Header & Title
  readonly pageTitle: Locator;
  readonly shoppingCartBadge: Locator;

  // Step 1: Your Information Form
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly cancelButtonStepOne: Locator;
  readonly errorMessage: Locator;
  readonly errorDismissButton: Locator;

  // Step 2: Overview & Summary
  readonly cartItems: Locator;
  readonly itemNames: Locator;
  readonly itemPrices: Locator;
  readonly itemQuantities: Locator;
  readonly paymentInfoLabel: Locator;
  readonly paymentInfoValue: Locator;
  readonly shippingInfoLabel: Locator;
  readonly shippingInfoValue: Locator;
  readonly subtotalLabel: Locator;
  readonly taxLabel: Locator;
  readonly totalLabel: Locator;
  readonly finishButton: Locator;
  readonly cancelButtonStepTwo: Locator;

  // Step 3: Order Complete
  readonly completeHeader: Locator;
  readonly completeText: Locator;
  readonly ponyExpressImage: Locator;
  readonly backHomeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('[data-test="title"]');
    this.shoppingCartBadge = page.locator('[data-test="shopping-cart-badge"]');

    // Step 1 Locators
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.cancelButtonStepOne = page.locator('[data-test="cancel"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.errorDismissButton = page.locator('[data-test="error-button"]');

    // Step 2 Locators
    this.cartItems = page.locator('[data-test="inventory-item"]');
    this.itemNames = page.locator('[data-test="inventory-item-name"]');
    this.itemPrices = page.locator('[data-test="inventory-item-price"]');
    this.itemQuantities = page.locator('[data-test="item-quantity"]');
    this.paymentInfoLabel = page.locator('[data-test="payment-info-label"]');
    this.paymentInfoValue = page.locator('[data-test="payment-info-value"]');
    this.shippingInfoLabel = page.locator('[data-test="shipping-info-label"]');
    this.shippingInfoValue = page.locator('[data-test="shipping-info-value"]');
    this.subtotalLabel = page.locator('[data-test="subtotal-label"]');
    this.taxLabel = page.locator('[data-test="tax-label"]');
    this.totalLabel = page.locator('[data-test="total-label"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.cancelButtonStepTwo = page.locator('[data-test="cancel"]');

    // Step 3 Locators
    this.completeHeader = page.locator('[data-test="complete-header"]');
    this.completeText = page.locator('[data-test="complete-text"]');
    this.ponyExpressImage = page.locator('[data-test="pony-express"]');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
  }

  // Actions for Step 1
  async fillShippingInformation(firstName: string, lastName: string, postalCode: string): Promise<void> {
    if (firstName) {
      await this.firstNameInput.fill(firstName);
    } else {
      await this.firstNameInput.clear();
    }
    if (lastName) {
      await this.lastNameInput.fill(lastName);
    } else {
      await this.lastNameInput.clear();
    }
    if (postalCode) {
      await this.postalCodeInput.fill(postalCode);
    } else {
      await this.postalCodeInput.clear();
    }
    await this.continueButton.click();
  }

  async cancelStepOne(): Promise<void> {
    await this.cancelButtonStepOne.waitFor({state: 'visible'});
    await this.cancelButtonStepOne.click();
  }

  async dismissError(): Promise<void> {
    await this.errorDismissButton.click();
  }

  // Actions for Step 2
  async cancelStepTwo(): Promise<void> {
    await this.cancelButtonStepTwo.click();
  }

  async finishOrder(): Promise<void> {
    await this.finishButton.click();
  }

  // Financial Extraction Helpers
  async getSubtotal(): Promise<number> {
    const text = await this.subtotalLabel.innerText();
    return parseFloat(text.replace(/[^0-9.]/g, ''));
  }

  async getTax(): Promise<number> {
    const text = await this.taxLabel.innerText();
    return parseFloat(text.replace(/[^0-9.]/g, ''));
  }

  async getTotal(): Promise<number> {
    const text = await this.totalLabel.innerText();
    return parseFloat(text.replace(/[^0-9.]/g, ''));
  }

  async getItemPricesSum(): Promise<number> {
    const prices = await this.itemPrices.allInnerTexts();
    const sum = prices.reduce((acc, curr) => {
      return acc + parseFloat(curr.replace(/[^0-9.]/g, ''));
    }, 0);
    return parseFloat(sum.toFixed(2));
  }

  // Actions for Step 3
  async returnBackHome(): Promise<void> {
    await this.backHomeButton.click();
  }
}