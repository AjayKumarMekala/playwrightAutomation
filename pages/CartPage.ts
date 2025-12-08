import { Page, Locator } from '@playwright/test'
export class CartPage {
    private readonly page: Page;
    private readonly productNamesInCart: string;
    private readonly placeOrder: Locator;
    private readonly name: Locator;
    private readonly country: Locator;
    private readonly city: Locator;
    private readonly card: Locator;
    private readonly month: Locator;
    private readonly year: Locator;
    private readonly purchase: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productNamesInCart = '#tbodyid td:nth-child(2)';
        this.placeOrder = this.page.getByRole('button', { name: 'Place Order' });
        this.name = this.page.locator('#name');
        this.country = this.page.locator('#country');
        this.city = this.page.locator('#city');
        this.card = this.page.locator('#card');
        this.month = this.page.locator('#month');
        this.year = this.page.locator('#year');
        this.purchase = this.page.getByRole('button', { name: 'Purchase' })
    }

    async checkItem(itemName: string): Promise<boolean> {

        await this.page.waitForTimeout(3000);
        const products = await this.page.locator(this.productNamesInCart).all();
        for (const item of products) {
            const name = await item.textContent();
            console.log(name);
            if (await name?.trim().toLowerCase().includes(await itemName.toLowerCase())) {
                return true;
            }
        }
        return false;
    }

    async placeItemOrder() {
        await this.placeOrder.click();
    }

    async details():Promise<void>
    {
        await this.name.fill('Randy');
        await this.country.fill('India');
        await this.city.fill('Hyderabad');
        await this.card.fill('1234567890112345');
        await this.month.fill('1');
        await this.year.fill('2026');
        await this.purchase.click();
    }



}