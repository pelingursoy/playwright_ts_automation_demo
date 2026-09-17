/*
A Browser Context in Playwright represents an isolated (independent) browser session. 
Each context has its own cookies, local storage, session storage, and cache. 
This allows you to simulate multiple users within the same browser instance.


Browser ---> Contexts ----> pages/tabs

Browsers ---> chromium, firefox, webkit

Contexts ---> we can have multiple contexts for multiple users/apps for the same browser. 
              provide a way to operate multiple independent browser sessions.
page ---> New Tab, Window, Popup

Why Browser Context?
------------------
Browser Context provides session isolation without launching multiple browsers.

Browser
│
├── Context 1
│     └── Page 1
│
├── Context 2
│     └── Page 2


*/


import {test,chromium} from "@playwright/test";

//Browser--->context--->page

test("Browser context demo",async()=>{

   //created chromium browser 
   const browser= await chromium.launch()

   //create context1
   const context1=await browser.newContext()
   const context2=await browser.newContext()
  
   //create pages
   const context1_page=await context1.newPage()
   const context2_page=await context2.newPage()

   await context1_page.goto("https://www.saucedemo.com/")

   await context2_page.goto("https://www.saucedemo.com/")

   await context1_page.waitForTimeout(5000)
   await context2_page.waitForTimeout(5000)

    await context1.close()
    await context2.close()

    await browser.close()
    
})
