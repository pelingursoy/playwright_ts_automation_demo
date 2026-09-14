// innerText() Vs textContent()
// innerText() method returns the visible text of an element, 
// textContent() returns the text content of an element, including hidden elements.

import { test } from '@playwright/test';


test("Comparing methods", async ({ page }) => {

    await page.goto('https://demowebshop.tricentis.com/');

    let products = page.locator('.product-title');   //6

    // innerText() Vs textContent()

    console.log(await products.nth(1).innerText()); //14.1-inch Laptop  // Preferable to use innerText() over textContent() because it trims the text and removes extra spaces and new lines.
     console.log(await products.nth(1).textContent());

     const text=await products.nth(1).textContent()

     if(text!==null && text!==undefined){
            console.log(text.trim())
     }
     
      //you can simply write:
    console.log(text?.trim())

})


/*
?. (Optional Chaining)

The optional chaining operator (?.) checks whether text is not null or undefined before calling trim().

*/