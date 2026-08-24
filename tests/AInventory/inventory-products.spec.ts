import { test, expect } from '../../fixtures/baseFixture';
import InventoryData from '../../data/InventoryData.json'

test.describe.skip("Inventory testing suite for products", ()=>{
     
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

  test('Test Case Inv-1: Verify correct product names (titles) and description (test will fail because of weird names)', async ({ page, inventoryPage }) => {
    const codeLikePattern = /\w+\.\w+\(\)/;

    await expect(page).toHaveURL('/inventory.html');

    const productsTitles = inventoryPage.itemsName;
    
    await expect(productsTitles).toHaveCount(6);

    const productsDescription = inventoryPage.itemsDesc;

    await expect(productsDescription).toHaveCount(6);

    for (const title of await productsTitles.all()) {
      const text = await title.textContent();
      expect(text, `Title ${text} contains buggy characters`).not.toMatch(codeLikePattern);
    }

    for (const desc of await productsDescription.all()) {
      const text = await desc.textContent();
      expect(text, `Description ${text} contains buggy characters`).not.toMatch(codeLikePattern);
    }

  });
  test('Test Case Inv-2: Verify each product has title, image, price, description and Add to Cart button (using Accessibility testing snapshot)', async({page, inventoryPage}) =>{
    await expect(inventoryPage.itemList).toMatchAriaSnapshot(`
        - link "${InventoryData.items_names.sauce_labs_backpack}":
          - /url: "#"
          - img "Sauce Labs Backpack"
        - link "Sauce Labs Backpack":
          - /url: "#"
        - text: /.*\\${InventoryData.items_prices.sauce_labs_backpack}.*/
        - button "Add to cart"
        - link "${InventoryData.items_names.sauce_labs_bike_light}":
          - /url: "#"
          - img "Sauce Labs Bike Light"
        - link "Sauce Labs Bike Light":
          - /url: "#"
        - text: /.*\\${InventoryData.items_prices.sauce_labs_bike_light}.*/
        - button "Add to cart"
        - link "${InventoryData.items_names.sauce_labs_bolt_tshirt}":
          - /url: "#"
          - img "Sauce Labs Bolt T-Shirt"
        - link "Sauce Labs Bolt T-Shirt":
          - /url: "#"
        - text: /.*\\${InventoryData.items_prices.sauce_labs_bolt_tshirt}.*/
        - button "Add to cart"
        - link "${InventoryData.items_names.sauce_labs_fleece_jacket}":
          - /url: "#"
          - img "Sauce Labs Fleece Jacket"
        - link "Sauce Labs Fleece Jacket":
          - /url: "#"
        - text: /.*\\${InventoryData.items_prices.sauce_labs_fleece_jacket}.*/
        - button "Add to cart"
        - link "${InventoryData.items_names.sauce_labs_onesie}":
          - /url: "#"
          - img "Sauce Labs Onesie"
        - link "Sauce Labs Onesie":
          - /url: "#"
        - text: /.*\\${InventoryData.items_prices.sauce_labs_onesie}.*/
        - button "Add to cart"
        - link "Test.allTheThings() T-Shirt (Red)":
          - /url: "#"
          - img "Test.allTheThings() T-Shirt (Red)"
        - link "${InventoryData.items_names.test_all_things_red}":
          - /url: "#"
        - text: /.*\\${InventoryData.items_prices.test_all_things_red}.*/
        - button "Add to cart"
    `);
  });
  

})