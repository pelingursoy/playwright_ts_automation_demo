import { test, expect } from "@playwright/test";
import fs from "fs"


test("Login as admin and check dashboard", async({browser})=>{

// attaching the local storage
const context=await browser.newContext()

const page=await context.newPage()

// Read Session Storage from file
 const sessionStorageData = JSON.parse(fs.readFileSync('./storage_data/session_data.json', 'utf8') );

 /*
await context.addInitScript((storage) => {
       Object.keys(storage).forEach(key => {
            sessionStorage.setItem(key, storage[key]);
        });
 }, sessionStorageData);
*/

//{"auth_session_user":"admin","auth_session_admin":"authenticated"}

 //or using loop
    await context.addInitScript((storage) => {
        for (const key in storage) {
            sessionStorage.setItem(key, storage[key]);
        }
    }, sessionStorageData);

await page.goto("https://sdetqa.vercel.app/login_app")

// User should already be logged in
await expect(page.getByText('Dashboard Welcome', { exact: true })).toBeVisible();
await expect(page.locator('#displayUser')).toContainText('admin');


await page.waitForTimeout(5000)

await context.close()
})
