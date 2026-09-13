import {test, expect} from '@playwright/test'; //importing the test and expect functions from the @playwright/test module.
// The test function is used to define a test case, and the expect function is used to make assertions about the state of the application being tested.
//only importing the test property from the @playwright/test module, which is used to define a test case.
// The expect function is not imported in this case, so it cannot be used to make assertions about the state of the application being tested.
//it is called destructuring assignment, which allows you to extract specific properties from an object and assign them to variables.
// In this case, the test and expect properties are being extracted from the @playwright/test module and assigned to variables with the same name.

test('basic test', async ({ page }) => { 
    await page.goto('https://demowebshop.tricentis.com/');
    await expect(page).toHaveTitle(/Demo Web Shop/);
});

//const { test } = require('@playwright/test'); //importing the test function from the @playwright/test module using CommonJS syntax.
/*test('first test', async ({ browser }) => { //defining a test case named 'first test' using the test function, which takes a callback function as an argument. 
The callback function is marked as async, indicating that it contains asynchronous code.

    const context = await browser.newContext(); //creating a new browser context using the newContext method of the browser object.
    const page = await context.newPage(); //creating a new page in the browser context using the newPage method of the context object.
    await page.goto('https://demowebshop.tricentis.com/'); //navigating to the specified URL using the goto method of the page object.
    await expect(page).toHaveTitle(/Demo Web Shop/); //making an assertion that the page title matches the regular expression /Demo Web Shop/ using the toHaveTitle method of the expect function.
})
*/

//JS TS is an asynchronous programming language that allows you to write code that can run concurrently,without blocking the execution of other code.
//So, we have to use async and await keywords to handle asynchronous code in a synchronous manner.
/* async is the function that allows you to write asynchronous code in a synchronous manner. 
It is used to handle promises and allows you to use the await keyword to wait for a promise to resolve 
before moving on to the next line of code. In this case, it is used to wait for the page to load and 
for the title to be checked before proceeding with the test.
await is a keyword (a property of async function) that is used to wait for a promise to resolve before moving on to the next line of code.
In this case, it is used to wait for the page to load and for the title to be checked before proceeding with the test.
    
*/

/* 
const {test} = require('playwright/test')   */
test('sample test', async ({ page }) => {
    await page.goto('https://demowebshop.tricentis.com/');
    await expect(page).toHaveTitle(/Demo Web Shop/);
})