import { test, expect } from '@playwright/test';



test('Lazy loading page', async ({ page }) => {

  await page.goto('https://www.booksbykilo.in/new-books?pricerange=201to500');
 
  let previousHeight = 0;

  while(true){
        await page.evaluate( ()=>window.scrollTo(0,document.body.scrollHeight) ) //scroll down

        await page.waitForTimeout(2000);

          // Get current scroll height
            const currentHeight = await page.evaluate(() => {
                        return document.body.scrollHeight;
                  });
    
    console.log("==============================")
    console.log(`Previous height: ${previousHeight}`);
    console.log(`Current height: ${currentHeight}`);


        if(previousHeight===currentHeight){
            break
        }
        previousHeight=currentHeight
  }

  console.log("You reached End of the page.....")

});