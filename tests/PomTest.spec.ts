import{test,expect} from '@playwright/test';
import { PageManager } from '../pages/PageManager';


test.beforeEach(async({page})=>{
const pm=new PageManager(page);
    await page.goto(pm.getConfig().applUrl);
    
})
test.afterEach(async({page})=>{
await page.waitForTimeout(3000);
await page.close();
    
})

test('End-to-End flow',async ({page})=>{
const pm=new PageManager(page);

await pm.getLoginPage().clickLoginLink();
await pm.getLoginPage().enterUserName('226074');
await pm.getLoginPage().enterPassword('Ajay@123');
await pm.getLoginPage().clickLoginButton();
expect(await pm.getLoginPage().welcomeMsgValidation()).toBe('Welcome 226074');

await pm.getHomePage().clickItem('Sony xperia z5');
await pm.getHomePage().goToCart();

expect(await pm.getCartPage().checkItem('Sony xperia z5')).toBe(true);
await pm.getCartPage().placeItemOrder();
await pm.getCartPage().details();

})