import { Page, Locator } from '@playwright/test'
export class HomePage {
    private readonly page: Page;
    private readonly productListLocator: string;
    private readonly addToCartButton: Locator;
    private readonly cartLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productListLocator = 'div#tbodyid div.card-block a';
        this.addToCartButton = this.page.getByRole('link', { name: 'Add to cart' })
        this.cartLink = this.page.locator('#cartur');
    }

    async clickItem(itemName: string): Promise<void> {
        const products = await this.page.locator(this.productListLocator).all();
        for (const item of products) {
            const name = await item.textContent();
            if (name?.trim() === itemName) {
                await item.click();
                break;
            }
        }
        this.page.once('dialog', async (dialog) => {
            if (dialog.message().includes('added'))
                await dialog.accept();

        })

        await this.addToCartButton.click();
    }

    async goToCart(): Promise<void> {
        await this.cartLink.click();
    }

}