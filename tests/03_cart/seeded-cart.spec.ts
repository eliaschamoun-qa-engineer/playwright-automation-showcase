import { test, expect } from '../../fixtures/baseFixture';

test.describe('Cart - Fast State Injection (Session & Cart Seeding)', () => {
  test('CART-06: Seeded cart fixture initializes state without UI interaction @performance @p0', async ({
    page,
    seededInventoryPage,
    cartPage,
  }) => {
    // Verify seeded state directly on inventory
    await expect(page).toHaveURL(/.*inventory\.html/);
    await expect(seededInventoryPage.shoppingCartBadge).toHaveText('2');

    // Navigate to cart and verify seeded products (item ids 4 and 0)
    await seededInventoryPage.clickShoppingCart();
    await expect(page).toHaveURL(/.*cart\.html/);
    await expect(cartPage.cartItems).toHaveCount(2);

    const itemNames = await cartPage.getItemNames();
    expect(itemNames).toContain('Sauce Labs Backpack');
    expect(itemNames).toContain('Sauce Labs Bike Light');
  });
});
