import { test, expect } from '../../fixtures/baseFixture';
import cartData from '../../data/CartData.json';
import inventoryData from '../../data/InventoryData.json';

test.describe('Checkout - End to End Purchase Journey', () => {
  test('CHK-08: Complete full user journey from product selection to order confirmation @e2e @smoke @p0', async ({
    page,
    loggedInPage,
    inventoryPage,
    cartPage,
    checkoutPage,
  }) => {
    // 1. Add product from inventory
    await inventoryPage.addProductByName(inventoryData.items_names.sauce_labs_backpack);
    await expect(inventoryPage.shoppingCartBadge).toHaveText('1');

    // 2. Navigate to Cart
    await inventoryPage.clickShoppingCart();
    await expect(page).toHaveURL(/.*cart\.html/);
    await expect(cartPage.cartItems).toHaveCount(1);

    // 3. Initiate Checkout
    await cartPage.proceedToCheckout();
    await expect(page).toHaveURL(/.*checkout-step-one\.html/);

    // 4. Fill Information
    await checkoutPage.fillShippingInformation(
      cartData.valid_shipping_info.firstName,
      cartData.valid_shipping_info.lastName,
      cartData.valid_shipping_info.postalCode
    );
    await expect(page).toHaveURL(/.*checkout-step-two\.html/);

    // 5. Verify Overview & Finish Order
    await expect(checkoutPage.cartItems).toHaveCount(1);
    await checkoutPage.finishOrder();

    // 6. Validate Completion Screen
    await expect(page).toHaveURL(/.*checkout-complete\.html/);
    await expect(checkoutPage.completeHeader).toHaveText(cartData.checkout_summary.complete_header);
    await expect(checkoutPage.completeText).toHaveText(cartData.checkout_summary.complete_text);
    await expect(checkoutPage.ponyExpressImage).toBeVisible();

    // 7. Validate Cart Badge is cleared after purchase
    await expect(checkoutPage.shoppingCartBadge).toBeHidden();

    // 8. Return Back Home
    await checkoutPage.returnBackHome();
    await expect(page).toHaveURL(/.*inventory\.html/);
  });
});
