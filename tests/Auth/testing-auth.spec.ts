import { test, expect } from '../../fixtures/baseFixture';
test.describe('Full Authentication Testing Suite', () => {
    test("QA Testing", async({page})=>{
        await page.goto('/');
        expect(page).toHaveURL('/');
    })
})