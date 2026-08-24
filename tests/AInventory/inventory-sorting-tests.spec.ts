import { test, expect } from '../../fixtures/baseFixture';
import InventoryData from '../../data/InventoryData.json'
import { 
  isSortedAZ, 
  isSortedZA, 
  isSortedPriceLowToHigh, 
  isSortedPriceHighToLow 
} from '../../utils/sortingUtils';
test.describe.skip("Inventory testing suite for sorting products", () => {
    
    test.beforeEach(async ({ page, context, baseURL }) => {
        await context.addCookies([
            {
                name: process.env.TEST_USERNAME_COOKIE, // Change this to your app's actual cookie name
                value: process.env.TEST_VALUE_COOKIE,
                url: baseURL,
            }
        ]);
        await page.goto('/inventory.html');
    });

    test('Test Case Inv-3: Verify correct sorting of products: A to Z', async ({ inventoryPage }) => {
        await inventoryPage.selectSortingOption(InventoryData.sorting_options.az);
        const productNames = await inventoryPage.getProductNames();
        expect(isSortedAZ(productNames)).toBe(true);
    });

    test('Test Case Inv-4: Verify correct sorting of products: Z to A', async ({ inventoryPage }) => {
        await inventoryPage.selectSortingOption(InventoryData.sorting_options.za);
        const productNames = await inventoryPage.getProductNames();
        expect(isSortedZA(productNames)).toBe(true);
    });

    test('Test Case Inv-5: Verify correct sorting of products - prices: low to high', async ({ inventoryPage }) => {
        await inventoryPage.sortingDropdown.selectOption(InventoryData.sorting_options.lowToHigh);
        const productPrices = await inventoryPage.getProductPrices();
        expect(isSortedPriceLowToHigh(productPrices)).toBe(true);
    });

    test('Test Case Inv-6: Verify correct sorting of products: high to low', async ({ inventoryPage }) => {
        await inventoryPage.sortingDropdown.selectOption(InventoryData.sorting_options.highToLow);
        const productPrices = await inventoryPage.getProductPrices();
        expect(isSortedPriceHighToLow(productPrices)).toBe(true);
    });

})