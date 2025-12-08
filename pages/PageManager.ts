import{Page} from '@playwright/test'

import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/Homepage'
import  {CartPage} from '../pages/CartPage';
import { TestConfig } from '../test.config';


export class PageManager{
    private readonly page:Page;

    private  loginpage?:LoginPage;
    private  homepage?:HomePage;
    private cartpage?:CartPage;
    private config?:TestConfig;

    constructor(page :Page){
        this.page=page;
    }

    getLoginPage(): LoginPage
    {
        return this.loginpage??=new LoginPage(this.page);
    }
     getHomePage(): HomePage
     {
        return this.homepage??=new HomePage(this.page);
    }
     getCartPage(): CartPage
     {
        return this.cartpage??=new CartPage(this.page);
    }
     getConfig(): TestConfig
     {
        return this.config??=new TestConfig();
    }

}