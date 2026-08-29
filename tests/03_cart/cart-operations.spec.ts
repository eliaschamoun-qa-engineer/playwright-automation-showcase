import { test, expect } from '../../fixtures/baseFixture';
import inventoryData from '../../data/InventoryData.json';

test.describe('Cart - Operations & Item Management', () => {
  test.beforeEach(async ({ loggedInPage, inventoryPage }) => {
    await inventoryPage.addProductByName(inventoryData.items_names.sauce_labs_backpack);
    await inventoryPage.addProductByName(inventoryData.items_names.sauce_labs_bike_light);
    await inventoryPage.clickShoppingCart();
  });

  test('CART-01: Cart displays all added items with quantities, descriptions, and prices @cart @p0', async ({
    page,
    cartPage,
  }) => {
    await expect(page).toHaveURL(/.*cart\.html/);
    await expect(cartPage.pageTitle).toHaveText('Your Cart');
    await expect(cartPage.cartItems).toHaveCount(2);

    const itemNames = await cartPage.getItemNames();
    expect(itemNames).toContain(inventoryData.items_names.sauce_labs_backpack);
    expect(itemNames).toContain(inventoryData.items_names.sauce_labs_bike_light);

    // Quantity validation
    for (const quantity of await cartPage.itemQuantities.all()) {
      await expect(quantity).toHaveText('1');
    }
  });

  test('CART-02: Removing single item from cart updates DOM and cart badge @cart', async ({
    cartPage,
  }) => {
    await expect(cartPage.cartItems).toHaveCount(2);
    await expect(cartPage.shoppingCartBadge).toHaveText('2');

    await cartPage.removeItemByName(inventoryData.items_names.sauce_labs_backpack);

    await expect(cartPage.cartItems).toHaveCount(1);
    await expect(cartPage.shoppingCartBadge).toHaveText('1');

    const remainingItems = await cartPage.getItemNames();
    expect(remainingItems).not.toContain(inventoryData.items_names.sauce_labs_backpack);
    expect(remainingItems).toContain(inventoryData.items_names.sauce_labs_bike_light);
  });

  test('CART-03: Removing all items results in empty cart and hidden badge @cart', async ({
    cartPage,
  }) => {
    await cartPage.removeAllItems();

    await expect(cartPage.cartItems).toHaveCount(0);
    await expect(cartPage.shoppingCartBadge).toBeHidden();
  });

  test('CART-04: Continue Shopping button returns to inventory while retaining items @cart', async ({
    page,
    cartPage,
    inventoryPage,
  }) => {
    await cartPage.continueShopping();

    await expect(page).toHaveURL(/.*inventory\.html/);
    await expect(inventoryPage.shoppingCartBadge).toHaveText('2');
  });
});
