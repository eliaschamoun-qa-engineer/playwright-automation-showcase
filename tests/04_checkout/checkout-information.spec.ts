import { test, expect } from '../../fixtures/baseFixture';
import cartData from '../../data/CartData.json';

test.describe('Checkout - Step One Information Validations', () => {
  test.beforeEach(async ({ seededInventoryPage, cartPage, checkoutPage }) => {
    await seededInventoryPage.clickShoppingCart();
    await cartPage.proceedToCheckout();
  });

  test('CHK-01: Verify error when First Name is missing @negative @checkout', async ({
    checkoutPage,
  }) => {
    await checkoutPage.fillShippingInformation('', 'Chamoun', '1100');

    await expect(checkoutPage.errorMessage).toBeVisible();
    await expect(checkoutPage.errorMessage).toHaveText(cartData.error_messages.first_name_required);
  });

  test('CHK-02: Verify error when Last Name is missing @negative @checkout', async ({
    checkoutPage,
  }) => {
    await checkoutPage.fillShippingInformation('Elias', '', '1100');

    await expect(checkoutPage.errorMessage).toBeVisible();
    await expect(checkoutPage.errorMessage).toHaveText(cartData.error_messages.last_name_required);
  });

  test('CHK-03: Verify error when Postal Code is missing @negative @checkout', async ({
    checkoutPage,
  }) => {
    await checkoutPage.fillShippingInformation('Elias', 'Chamoun', '');

    await expect(checkoutPage.errorMessage).toBeVisible();
    await expect(checkoutPage.errorMessage).toHaveText(cartData.error_messages.postal_code_required);
  });

  test('CHK-04: Verify error banner can be dismissed @ui @negative @checkout', async ({
    checkoutPage,
  }) => {
    await checkoutPage.fillShippingInformation('', '', '');
    await expect(checkoutPage.errorMessage).toBeVisible();

    await checkoutPage.dismissError();
    await expect(checkoutPage.errorMessage).toBeHidden();
  });
});
