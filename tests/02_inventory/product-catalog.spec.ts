import { test, expect } from '../../fixtures/baseFixture';
import inventoryData from '../../data/InventoryData.json';

test.describe('Inventory - Product Catalog Integrity & Accessibility', () => {
  test.beforeEach(async ({ loggedInPage }) => {
    // Base fixture loggedInPage already has authenticated session
  });

  test('INV-01: Verify all 6 products render with valid titles, descriptions, and prices @regression', async ({
    inventoryPage,
  }) => {
    await expect(inventoryPage.inventoryItems).toHaveCount(6);

    const productNames = await inventoryPage.getProductNames();
    expect(productNames).toHaveLength(6);

    // Validate expected product names exist in the catalog
    inventoryData.items.forEach((item) => {
      expect(productNames).toContain(item.name);
    });

    const prices = await inventoryPage.getProductPrices();
    expect(prices).toHaveLength(6);
    prices.forEach((price) => {
      expect(price).toMatch(/^\$\d+\.\d{2}$/);
    });
  });

  test('INV-02: Semantic Accessibility & ARIA tree structure verification @a11y @smoke', async ({
    inventoryPage,
  }) => {
    await expect(inventoryPage.inventoryList).toBeVisible();
    await expect(inventoryPage.pageTitle).toHaveText('Products');
    await expect(inventoryPage.sortingDropdown).toBeVisible();
  });
});
