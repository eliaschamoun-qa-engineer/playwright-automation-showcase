import { test, expect } from '../../fixtures/baseFixture';

test.describe.skip('E2E full Testing Suite for Add To Cart', () => {
    
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

    test('Test Case ATC-7: Verify correct behavior when adding one new item to the cart', async({inventoryPage, cartPage})=>{
        const addToCartButtonsCount = await inventoryPage.addToCartButtons.count();
        await console.log('Count', addToCartButtonsCount);
        await inventoryPage.addProductToCartByIndex(0);
        expect((inventoryPage.removeFromCartButtons).nth(0)).toBeVisible();
        expect((inventoryPage.removeFromCartButtons).nth(0)).toHaveCount(1);
        expect((inventoryPage.addToCartButtons)).toHaveCount(addToCartButtonsCount - 1);
        expect(cartPage.cart).toBeVisible();
        expect(cartPage.cart).toBeEnabled();
        expect(cartPage.cart).toHaveText('1');
        await cartPage.cart.click();
        expect(cartPage.quantityLabel).toHaveText("QTY");
        expect(cartPage.productDesc).toContainText("streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.");
        expect(cartPage.descriptionLabel).toHaveText("Description");
        expect(cartPage.productName).toBeVisible();
        expect(cartPage.productName).toHaveText('Sauce Labs Backpack');
        expect(cartPage.productPrice).toBeVisible();
        expect(cartPage.productPrice).toHaveText('$29.99');
        expect(inventoryPage.addToCartButtons).not.toBeVisible();
        expect(cartPage.removeFromCartButton).toBeVisible();
        expect(cartPage.removeFromCartButton).toHaveText('Remove');

    });
});