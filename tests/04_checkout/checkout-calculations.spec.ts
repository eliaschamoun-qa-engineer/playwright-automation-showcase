import { test, expect } from '../../fixtures/baseFixture';
import cartData from '../../data/CartData.json';

test.describe('Checkout - Step Two Pricing & Financial Calculations', () => {
  test.beforeEach(async ({ seededInventoryPage, cartPage, checkoutPage }) => {
    // Seeded with Backpack ($29.99) + Bike Light ($9.99)
    await seededInventoryPage.clickShoppingCart();
    await cartPage.proceedToCheckout();
    await checkoutPage.fillShippingInformation(
      cartData.valid_shipping_info.firstName,
      cartData.valid_shipping_info.lastName,
      cartData.valid_shipping_info.postalCode
    );
  });

  test('CHK-06: Verify financial math: Item Total + Tax = Total @p0 @checkout', async ({
    page,
    checkoutPage,
  }) => {
    await expect(page).toHaveURL(/.*checkout-step-two\.html/);

    // 1. Verify Payment & Shipping Information
    await expect(checkoutPage.paymentInfoValue).toHaveText(cartData.checkout_summary.payment_info);
    await expect(checkoutPage.shippingInfoValue).toHaveText(cartData.checkout_summary.shipping_info);

    // 2. Extract values dynamically
    const itemSum = await checkoutPage.getItemPricesSum();
    const subtotal = await checkoutPage.getSubtotal();
    const tax = await checkoutPage.getTax();
    const total = await checkoutPage.getTotal();

    // 3. Mathematical assertions
    expect(subtotal).toBeCloseTo(itemSum, 2);

    // Tax should match 8% of subtotal
    const expectedTax = parseFloat((subtotal * cartData.tax_rate).toFixed(2));
    expect(tax).toBeCloseTo(expectedTax, 2);

    // Total must equal subtotal + tax
    const expectedTotal = parseFloat((subtotal + tax).toFixed(2));
    expect(total).toBeCloseTo(expectedTotal, 2);
  });
});
