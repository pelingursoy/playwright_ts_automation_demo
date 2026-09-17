/*
Test 1:
Open browser → Login → Save Cookies

Test 2:
Open new browser → Load Cookies → Verify automatic login

 | Part              | Purpose                                                   |
| ------------------ | --------------------------------------------------------- |
| fs                 | Node.js File System module                                |
| writeFileSync()    | Writes data to a file synchronously                       |
| cookieFile         | File path where cookies are saved                         |
| cookies            | JavaScript object/array containing cookie data            |
| JSON.stringify()   | Converts the object to a JSON string                      |
| null               | Includes all object properties (no custom filtering)      |
| 2                  | Formats the JSON with 2-space indentation for readability |



*/

import { test, expect } from '@playwright/test';
import fs from 'fs';

const cookieFile = './storage-data/cookies.data.json';
const appURL = 'https://sdetqa.vercel.app/login_app';

// makes execution serial
test.describe.configure({mode:'serial'})


test("Login and save cookies", async({browser})=>{
   
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(appURL)

    //Login
    await page.getByRole('textbox', { name: 'Username' }).fill('admin');
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
    await page.getByLabel('🍪 Cookie').check();
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('Dashboard Welcome', { exact: true })).toBeVisible()

    //Get all the cookies
    const cookies=await context.cookies()

    /*
        {
         name:"xyz", 
         expiry:34-343-43
        }
  */
     // object ----> JSON String
    fs.writeFileSync(cookieFile, JSON.stringify(cookies, null, 2));

    console.log('Cookies saved successfully.');

    await page.waitForTimeout(5000)

})


test("Login using saved cookies", async({browser})=>{
   
    const context = await browser.newContext();

    //JSON String -- Object
    const savedCookies=JSON.parse(fs.readFileSync(cookieFile, 'utf8'));

    context.addCookies(savedCookies)

    const page = await context.newPage();
    await page.goto(appURL)
   // No providing any login credentials
    await expect(page.getByText('Dashboard Welcome', { exact: true })).toBeVisible()

     await page.waitForTimeout(5000)
    
})
