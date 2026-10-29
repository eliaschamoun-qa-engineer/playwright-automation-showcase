import { test, expect } from '../../fixtures/baseFixture';
import inventoryData from '../../data/InventoryData.json';
import {
  isSortedAZ,
  isSortedZA,
  isSortedPriceLowToHigh,
  isSortedPriceHighToLow,
} from '../../utils/sortingUtils';

test.describe('Inventory - Sorting Engine', () => {
  test.beforeEach(async ({ loggedInPage }) => {
    // Authenticated on /inventory.html
  });

  test('INV-03A: Verify alphabetical sorting: Name (A to Z) @sorting @p1', async ({
    inventoryPage,
  }) => {
    await inventoryPage.selectSortingOption(inventoryData.sorting_values.az);
    const productNames = await inventoryPage.getProductNames();
    expect(isSortedAZ(productNames)).toBe(true);
  });

  test('INV-03B: Verify reverse alphabetical sorting: Name (Z to A) @sorting @p1', async ({
    inventoryPage,
  }) => {
    await inventoryPage.selectSortingOption(inventoryData.sorting_values.za);
    const productNames = await inventoryPage.getProductNames();
    expect(isSortedZA(productNames)).toBe(true);
  });

  test('INV-04A: Verify numerical price sorting: Low to High @sorting @p1', async ({
    inventoryPage,
  }) => {
    await inventoryPage.selectSortingOption(inventoryData.sorting_values.lowToHigh);
    const productPrices = await inventoryPage.getProductPrices();
    expect(isSortedPriceLowToHigh(productPrices)).toBe(true);
  });

  test('INV-04B: Verify numerical price sorting: High to Low @sorting @p1', async ({
    inventoryPage,
  }) => {
    await inventoryPage.selectSortingOption(inventoryData.sorting_values.highToLow);
    const productPrices = await inventoryPage.getProductPrices();
    expect(isSortedPriceHighToLow(productPrices)).toBe(true);
  });
});
