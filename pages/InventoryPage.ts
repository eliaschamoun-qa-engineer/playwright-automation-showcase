import { Page, Locator } from '@playwright/test';

export class InventoryPage{
    readonly page: Page;
    readonly cartLocator: Locator;
    readonly sortingDropdown: Locator; 
    readonly inventoryContainer: Locator;
    readonly itemList: Locator;
    readonly itemsName: Locator;
    readonly itemsPrices: Locator;
    readonly itemsDesc: Locator;
    readonly addToCartButtons: Locator;
    readonly removeFromCartButtons: Locator;
    readonly shoppingCartLink: Locator;

    constructor(page: Page){
        this.page = page;
        this.cartLocator = page.locator('#shopping_cart_container');
        this.inventoryContainer = page.locator('[data-test="inventory-item-description"]');
        this.sortingDropdown = page.locator('[data-test="product-sort-container"]');
        this.itemList = page.locator('[data-test="inventory-list"]');
        this.itemsName = page.locator('[data-test="inventory-item-name"]');
        this.itemsPrices = page.locator('[class="inventory_item_price"]');
        this.itemsDesc = page.locator('[data-test="inventory-item-description"]');
        this.addToCartButtons = page.locator('[class="btn btn_primary btn_small btn_inventory "]');
        this.removeFromCartButtons = page.locator('[class="btn btn_secondary btn_small btn_inventory "]');
        this.shoppingCartLink = page.locator('[data-test="shopping-cart-link"]');
    }

    async addProductToCartByIndex(index: number ){
        try{
            await this.addToCartButtons.nth(index).click();
        }
        catch(error){
            console.log(error);
        }
    }
    async removeProductFromCartByIndex(index: number ){
        try{
            await this.removeFromCartButtons.nth(index).click();
        }
        catch(error){
            console.log(error);
        }
        
    }
    async clickOnShoppingCart(){
        await this.shoppingCartLink.waitFor({state: 'visible'});
        await this.shoppingCartLink.click();
    }
    
    async selectSortingOption(optionText: string) {
        await this.sortingDropdown.selectOption(optionText);
    }

    async getProductNames(): Promise<string[]> {
        return await this.itemsName.allInnerTexts();
    }
    async getProductPrices(): Promise<string[]> {
        return await this.itemsPrices.allInnerTexts();
    }
    async clickOnCart(){

    }
    async returnCartItemsNumber(): Promise<string>{
        const isBadgeVisible = await this.cartLocator.isVisible();
        if(isBadgeVisible){
            return await this.cartLocator.innerText();
        }
        return '0';
    }
    
    
}