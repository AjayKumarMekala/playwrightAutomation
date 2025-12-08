import { Page, Locator } from '@playwright/test'
export class LoginPage {
    private readonly page: Page;
    private readonly loginLink: Locator;
    private readonly userName: Locator;
    private readonly password: Locator;
    private readonly loginButton: Locator;
    private readonly welcomeMsg: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginLink = this.page.locator('#login2');
        this.userName = this.page.locator('#loginusername');
        this.password = this.page.locator('#loginpassword');
        this.loginButton = this.page.getByRole('button', { name: 'Log in' });
        this.welcomeMsg = this.page.locator('#nameofuser');
    }

    async clickLoginLink(): Promise<void> {
        await this.loginLink.click();
    }

    async enterUserName(userName: string): Promise<void> {
        await this.userName.fill(userName);
    }

    async enterPassword(password: string): Promise<void> {
        await this.password.fill(password);
    }

    async clickLoginButton(): Promise<void> {
        await this.loginButton.click();
    }

    async welcomeMsgValidation(): Promise<string> {
        await this.page.waitForTimeout(2000);
        
        return await this.welcomeMsg.innerText();
    }



}