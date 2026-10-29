import { test, expect } from '../../fixtures/baseFixture';
import cartData from '../../data/CartData.json';

test.describe('Checkout - Cancellation & Backward Navigation', () => {
  test.beforeEach(async ({ seededInventoryPage, cartPage }) => {
    await seededInventoryPage.clickShoppingCart();
    await cartPage.proceedToCheckout();
  });

  test('CHK-04: Cancel button at Step One returns to Cart page @checkout', async ({
    page,
    checkoutPage,
    cartPage,
  }) => {
    await expect(page).toHaveURL(/.*checkout-step-one\.html/);

    await checkoutPage.cancelStepOne();

    await expect(page).toHaveURL(/.*cart\.html/);
    await expect(cartPage.cartItems).toHaveCount(2);
  });

  test('CHK-07: Cancel button at Step Two aborts checkout and returns to Inventory @checkout', async ({
    page,
    checkoutPage,
    inventoryPage,
  }) => {
    await checkoutPage.fillShippingInformation(
      cartData.valid_shipping_info.firstName,
      cartData.valid_shipping_info.lastName,
      cartData.valid_shipping_info.postalCode
    );
    await expect(page).toHaveURL(/.*checkout-step-two\.html/);

    await checkoutPage.cancelStepTwo();

    await expect(page).toHaveURL(/.*inventory\.html/);
    await expect(inventoryPage.inventoryItems).toHaveCount(6);
  });
});
