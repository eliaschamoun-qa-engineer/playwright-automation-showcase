import { test, expect } from '../../fixtures/baseFixture';
import inventoryData from '../../data/InventoryData.json';

test.describe('Inventory - Product Details & Deep Navigation', () => {
  test.beforeEach(async ({ loggedInPage }) => {
    // Authenticated on /inventory.html
  });

  test('INV-05: Click product title navigates to Product Details page with correct details @regression', async ({
    page,
    inventoryPage,
    productDetailPage,
  }) => {
    const targetItem = inventoryData.items[0]; // Sauce Labs Backpack
    await inventoryPage.clickProductTitle(targetItem.name);

    await expect(page).toHaveURL(new RegExp(`inventory-item\\.html\\?id=${targetItem.id}`));
    await expect(productDetailPage.productName).toHaveText(targetItem.name);
    await expect(productDetailPage.productPrice).toHaveText(targetItem.price);
    await expect(productDetailPage.productDesc).toHaveText(targetItem.description);
    await expect(productDetailPage.addToCartButton).toBeVisible();
  });

  test('INV-06: Click product image navigates to Product Details page @regression', async ({
    page,
    inventoryPage,
    productDetailPage,
  }) => {
    await inventoryPage.clickProductImage(0);

    await expect(page).toHaveURL(/inventory-item\.html\?id=\d+/);
    await expect(productDetailPage.productImage).toBeVisible();
    await expect(productDetailPage.backToProductsButton).toBeVisible();
  });

  test('INV-07: Add to Cart and Remove toggles state inside Product Details page @regression', async ({
    inventoryPage,
    productDetailPage,
  }) => {
    await inventoryPage.clickProductTitle(inventoryData.items_names.sauce_labs_backpack);

    // Initial state: Add to Cart visible
    await expect(productDetailPage.addToCartButton).toBeVisible();
    await productDetailPage.addToCart();

    // After add: Remove button visible and badge count is 1
    await expect(productDetailPage.removeFromCartButton).toBeVisible();
    await expect(productDetailPage.shoppingCartBadge).toHaveText('1');

    // Remove from cart
    await productDetailPage.removeFromCart();
    await expect(productDetailPage.addToCartButton).toBeVisible();
    await expect(productDetailPage.shoppingCartBadge).toBeHidden();
  });

  test('INV-08: Back to Products button navigates back to main Inventory catalog @regression', async ({
    page,
    inventoryPage,
    productDetailPage,
  }) => {
    await inventoryPage.clickProductTitle(inventoryData.items_names.sauce_labs_bike_light);
    await expect(page).toHaveURL(/inventory-item\.html\?id=\d+/);

    await productDetailPage.backToProducts();
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(inventoryPage.inventoryItems).toHaveCount(6);
  });
});
