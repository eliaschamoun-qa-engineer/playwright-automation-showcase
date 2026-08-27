import { test, expect } from '../../fixtures/baseFixture';
import LoginData from '../../data/LoginData.json';

test.describe('E2E full Testing Suite for Add To Cart', () => {
    
    test.beforeEach(async ({ page, loginPage, context, baseURL }) => {
        await page.goto('/');
        await loginPage.login(LoginData.users.standard_user, process.env.TEST_USER_PASSWORD || LoginData.users.valid_password);
    });

    test('Test Case ATC-7: Verify correct behavior when adding one new item to the cart', async({inventoryPage, checkoutPage})=>{
        const addToCartButtonsCount = await inventoryPage.addToCartButtons.count();
        await console.log('Count', addToCartButtonsCount);
        await inventoryPage.addProductToCartByIndex(0);
        expect((inventoryPage.removeFromCartButtons).nth(0)).toBeVisible();
        expect((inventoryPage.removeFromCartButtons).nth(0)).toHaveCount(1);
        expect((inventoryPage.addToCartButtons)).toHaveCount(addToCartButtonsCount - 1);
        expect(checkoutPage.cart).toBeVisible();
        expect(checkoutPage.cart).toBeEnabled();
        expect(checkoutPage.cart).toHaveText('1');
        await checkoutPage.cart.click();
        expect(checkoutPage.quantityLabel).toHaveText("QTY");
        expect(checkoutPage.productDesc).toContainText("streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.");
        expect(checkoutPage.descriptionLabel).toHaveText("Description");
        expect(checkoutPage.productName).toBeVisible();
        expect(checkoutPage.productName).toHaveText('Sauce Labs Backpack');
        expect(checkoutPage.productPrice).toBeVisible();
        expect(checkoutPage.productPrice).toHaveText('$29.99');
        expect(inventoryPage.addToCartButtons).not.toBeVisible();
        expect(checkoutPage.removeFromCartButton).toBeVisible();
        expect(checkoutPage.removeFromCartButton).toHaveText('Remove');

    });
});