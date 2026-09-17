/*
//Browser context for Two Different Users

Browser
│
├── Admin context
│     └── Admin Page (Login as a Admin user)
│
├── Customer context
│     └── Customer Page (Login as a Other user)


*/

import {test,chromium} from "@playwright/test";


test("Browser context demo for Two Different Users", async ()=>{
    
  const browser = await chromium.launch()

 // User 1 Context  (Admin)
  const adminContext = await browser.newContext();
  const adminPage = await adminContext.newPage();

  // User 2 Context  (Customer)
  const customerContext = await browser.newContext();
  const customerPage = await customerContext.newPage();

  // Login as Admin
  await adminPage.goto('https://www.saucedemo.com/');
  await adminPage.locator('#user-name').fill('standard_user');
  await adminPage.locator('#password').fill('secret_sauce');
  await adminPage.locator('#login-button').click();

  // Login as another user
  await customerPage.goto('https://www.saucedemo.com/');
  await customerPage.locator('#user-name').fill('visual_user');
  await customerPage.locator('#password').fill('secret_sauce');
  await customerPage.locator('#login-button').click();

  console.log('Both users are logged in independently.');

  await adminPage.waitForTimeout(5000);
  await customerPage.waitForTimeout(5000);

  await adminContext.close();
  await customerContext.close();
  await browser.close();

})
