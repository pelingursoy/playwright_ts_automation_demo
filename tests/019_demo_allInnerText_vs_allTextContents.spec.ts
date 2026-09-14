
// allInnerText() Vs allTextContent()

import { test, expect } from '@playwright/test';

test("Comparing methods", async ({ page }) => {

    await page.goto('https://demowebshop.tricentis.com/');

    let products = page.locator('.product-title');   //6

    // allInnerText() Vs allTextContent()

    let productNames=await products.allInnerTexts() // Preferable to use allInnerTexts() over allTextContents() because it trims the text and removes extra spaces and new lines.
    console.log("Product Names captured by allInnerText(): ", productNames)

    productNames = await products.allTextContents()
    console.log("Product Names captured by allTextContent(): ", productNames)

    let productNamesTrimmed= productNames.map((text) => text?.trim());
    console.log("Product Names after trimmed: ", productNamesTrimmed)

        // all() - converts Locator----> Locator[]
    //Returns array of locators
    //Returns array of locators 
    // (Stores locators of products)/Converts Locator to array of locators (for iteration)

    // Normal - without all()
    products = page.locator('.product-title'); 
    console.log(await products.nth(1).innerText())
    console.log(await products.nth(2).innerText())
    console.log(await products.nth(3).innerText())

  // using all()
    let productLocators=await products.all()

    console.log(await productLocators[0].innerText())
    console.log(await productLocators[1].innerText())
    console.log(await productLocators[2].innerText())
    
    for(let prodloc of productLocators){
        console.log(await prodloc.innerText())
    }


})