import{expect,test,Locator} from '@playwright/test';

test.skip('Nope commerce Home page', async({page},testInfo)=>{
   await page.goto("https://demo.nopcommerce.com/");
   const logo:Locator=page.getByAltText('nopCommerce demo store');
   await expect(logo).toBeVisible();
   const fileName=`logo-${new Date().toISOString().replace(/[:]/g, "-")}`;
   const screenshot=await logo.screenshot({path:`./Screenshots/${fileName}.png`});
   await testInfo.attach(fileName,{body:screenshot,contentType:'image/png'})
   
   
})

test.skip('test  autoation practice',async({page},testInfo)=>{
  await page.goto("https://testautomationpractice.blogspot.com/");
  const checkbox:Locator=await page.getByRole('checkbox',{name:'Sunday'});
  await checkbox.check();
  const name=`${new Date().toISOString().replace(/[:]/g,"-")}`;
  const screenshot=await checkbox.screenshot({path:`./Screenshots/${name}.png`});
  await expect(page.getByRole('checkbox',{name:'Sunday'})).toBeChecked();
  await testInfo.attach(name,{body:screenshot,contentType:'image/png'})
})


test('dialog simple', async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/", { waitUntil: 'domcontentloaded' });
  page.on('dialog', async (dialog) => {
    expect(dialog.message()).toContain('I am an alert box!');
    await dialog.accept();
  });
  await page.getByRole('button', { name: 'Simple Alert' }).click();
  

  
});

test('dialog confirm', async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/", { waitUntil: 'domcontentloaded' });
  page.on('dialog', async (dialog) => {
    expect(dialog.message()).toContain('Press a button!');
    await dialog.dismiss();
  });
  await page.getByRole('button', { name: 'Confirmation Alert' }).click();
 
});

test('dialog prompt', async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/", { waitUntil: 'domcontentloaded' });
  page.on('dialog', async (dialog) => {
    expect(dialog.message()).toContain('Please enter your name:');
    await dialog.accept('Playwright User');
  });
  await page.getByRole('button', { name: 'Prompt Alert' }).click();
  
});

test('Frames handling',async({page})=>{
  await page.goto("https://www.hyrtutorials.com/p/frames-practice.html");

  await page.frame({url:'https://www.hyrtutorials.com/p/html-dropdown-elements-practice.html'})?.locator('#selectnav2').selectOption('Home');

  await page.frameLocator('#frm2').locator('#selectnav1').selectOption('-- Selenium');

  await page.locator('#name').fill('Ajay Kumar');

  await page.waitForTimeout(5000);
})

test('handling tabs',async({browser})=>{
  const browserContext=await browser.newContext();
  const page=await browserContext.newPage();
  await page.goto("https://testautomationpractice.blogspot.com/");
  let parent=await page.title();

  // const [newTab]=await Promise.all([browserContext.waitForEvent('page'),await page.getByRole('button',{name:'New Tab'}).click()])
  // console.log("new tab title is "+await newTab.title());
  const [childPage]=await Promise.all([browserContext.waitForEvent('page'),await page.getByRole('button',{name:'New Tab'}).click()]);

  console.log("child page title is "+await childPage.title());
  console.log("Parent page title is "+parent);

  const pages=browserContext.pages();

   const childpage= await pages[0].title();
   console.log("child page title is "+childpage);
   const childpage2= await pages[1].title();
   console.log("child page title is "+childpage2);
   

})

test('Handling multiple popups,',async({browser})=>{
  const browserContext=await browser.newContext();
  const page=await browserContext.newPage();
 
  await page.goto("https://testautomationpractice.blogspot.com/"); 
  let parent=await page.title();
  const [popup1]=await Promise.all([page.waitForEvent('popup'), page.getByRole('button',{name:'Popup Windows'}).click()]);
  
  // console.log("main title1 title is "+ parent);
  // console.log("popup2 title is "+await popup1.title());

  const popups=browserContext.pages();

  for(const popup of popups){
   let title= await popup.title();
   console.log("main title1 title is "+ title);
   if(title.includes('Selenium')){
   // console.log("popup page title is "+await popup.title());
   await popup.waitForLoadState();
    let element=popup.locator("//span[@class='navbar-logo']");
   await element.screenshot({ path: './Screenshots/popup.png' });
  await popup.close()}
  else {
    console.log("popup page title is "+await popup.title());
  }
}})
  

test('mouse actions',async({page})=>{
await page.goto("https://testautomationpractice.blogspot.com/");
await page.getByRole('button',{name:'Point Me'}).hover();

let element2= page.locator("//a[contains(text(),'Mobiles')]");
await element2.hover();
await element2.click();
await page.waitForLoadState();
await page.screenshot({path:'./Screenshots/mobiles.png'});
})
test('mouse1 actions',async({page})=>{
await page.goto("https://swisnl.github.io/jQuery-contextMenu/demo.html");
await page.locator("//span[text()='right click me']").click({button:'right'});
await page.waitForTimeout(3000);
 page.on('dialog',async(dialog)=>{
  console.log( dialog.message());
  await dialog.accept();      
})
await page.locator("//span[text()='Edit']").click(); 

await page.waitForTimeout(3000);
await page.screenshot({path:'./Screenshots/mobiles1.png'});


})
test('mouse actions doubleclick',async({page})=>{
await page.goto("https://testautomationpractice.blogspot.com/");
await page.getByRole('button',{name:'Copy Text'}).dblclick();
await expect( page.locator('#field2')).toHaveValue('Hell World!');
await page.screenshot({path:'./Screenshots/mobiles.png'});
})
test('mouse actions drag and drop',async({page})=>{
await page.goto("https://testautomationpractice.blogspot.com/");
const src= page.locator('#draggable');
const target= page.locator('#droppable');
await src.dragTo(target);

await page.locator('#comboBox').click();

const text=page.locator('#dropdown div:nth-child(100)');
console.log(await text.innerText());
await text.click();

await page.screenshot({path:'./Screenshots/drag.png'});
})

test('scroll window',async({page})=>{
  test.slow();
await page.goto("https://www.booksbykilo.in/new-books");
let previousHeight:number=0;
let bookfound=false;
while(true){

  let bookslist=  page.locator('#divItemCard h3');
  for(let i=0 ;i<await bookslist.count();i++ ){
    let book:string=await bookslist.nth(i).innerText()
  if(book ==='The Romans'){
   bookfound=true;
   await bookslist.nth(i).click();
   await page.waitForTimeout(5000);
   expect(bookfound).toBeTruthy();
   break;

  }
  }
  if(bookfound)break;
  await page.evaluate(()=>{
     window.scrollTo(0,document.body.scrollHeight);
  })
  await page.waitForTimeout(3000);

  let currentHeight=await page.evaluate(()=>{
  return document.body.scrollHeight;
  })

  if(previousHeight===currentHeight){
    break;
  }
  previousHeight=currentHeight;
  console.log(currentHeight);
}
if(!bookfound)
{
  console.log('Book is not found');
}

})

