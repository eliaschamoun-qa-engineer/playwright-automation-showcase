import { test, expect } from '../../fixtures/baseFixture';
import inventoryData from '../../data/InventoryData.json';

test.describe('Inventory - Product Actions & Badge Synchronization', () => {
  test.beforeEach(async ({ loggedInPage }) => {
    // Authenticated on /inventory.html
  });

  test('INV-09: Adding products from catalog updates button state and increments cart badge @smoke @cart', async ({
    inventoryPage,
  }) => {
    // Badge initially hidden
    await expect(inventoryPage.shoppingCartBadge).toBeHidden();

    // Add first item
    await inventoryPage.addProductByName(inventoryData.items_names.sauce_labs_backpack);
    await expect(inventoryPage.shoppingCartBadge).toBeVisible();
    await expect(inventoryPage.shoppingCartBadge).toHaveText('1');

    // Add second item
    await inventoryPage.addProductByName(inventoryData.items_names.sauce_labs_bike_light);
    await expect(inventoryPage.shoppingCartBadge).toHaveText('2');
  });

  test('INV-10: Removing products from catalog restores Add to Cart and decrements badge @cart', async ({
    inventoryPage,
  }) => {
    await inventoryPage.addProductByName(inventoryData.items_names.sauce_labs_backpack);
    await inventoryPage.addProductByName(inventoryData.items_names.sauce_labs_bike_light);
    await expect(inventoryPage.shoppingCartBadge).toHaveText('2');

    // Remove one item
    await inventoryPage.removeProductByName(inventoryData.items_names.sauce_labs_backpack);
    await expect(inventoryPage.shoppingCartBadge).toHaveText('1');

    // Remove remaining item
    await inventoryPage.removeProductByName(inventoryData.items_names.sauce_labs_bike_light);
    await expect(inventoryPage.shoppingCartBadge).toBeHidden();
  });
});
