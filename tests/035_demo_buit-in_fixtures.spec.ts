import { test, expect} from '@playwright/test';

test('page fixture test', async ({ page }) => {

    await page.goto('https://demowebshop.tricentis.com/');
    await page.click('text=Register');
    await expect(page).toHaveURL(/register/);

});

//browser-->context-->page
// context (Incognito window)

test('context fixture test', async ({context}) => {

    const mypage1=await context.newPage()
    await mypage1.goto('https://demowebshop.tricentis.com/')
    await mypage1.locator('text=Register').click();
    await expect(mypage1).toHaveURL(/register/);

    const mypage2=await context.newPage()
    await mypage2.goto('https://www.google.com/')
    await expect(mypage2).toHaveURL(/google/);
});


/* browser
    - context 1
        - page1
        -page2

    - context 2
        - page1
        - page2
             */
test('browser fixture test', async ({browser}) => {

    // context 1:
    const context1=await browser.newContext()
        const context1_page1=await context1.newPage()
            await context1_page1.goto("https://www.google.com/")
        
        const context1_page2=await context1.newPage()
            await context1_page2.goto("https://www.rediff.com/")

    // context 2:
     const context2=await browser.newContext()
        const context2_page1=await context2.newPage()
            await context2_page1.goto("https://www.google.com/")
        
        const context2_page2=await context2.newPage()
            await context2_page2.goto("https://www.rediff.com/")
        
 
   // await context1_page1.waitForTimeout(15000)
   // await context1_page2.waitForTimeout(15000)
   // await context2_page1.waitForTimeout(15000)
   // await context2_page2.waitForTimeout(15000)

    await context1.close()
    await context2.close()
});
