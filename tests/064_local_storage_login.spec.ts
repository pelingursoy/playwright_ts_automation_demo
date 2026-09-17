import { test, expect } from "@playwright/test";


// makes execution serial
test.describe.configure({mode:'serial'})

test("Login as admin and check dashboard", async({browser})=>{

// attaching the local storage
const context=await browser.newContext( {storageState:'./storage_data/admin_data.json'})

const page=await context.newPage()
await page.goto("https://sdetqa.vercel.app/login_app")

// User should already be logged in
await expect(page.getByText('Dashboard Welcome', { exact: true })).toBeVisible();
await expect(page.locator('#displayUser')).toContainText('admin');


await page.waitForTimeout(5000)

await context.close()
})


test("Login as user and check dashboard", async({browser})=>{

// attaching the local storage
const context=await browser.newContext( {storageState:'./storage_data/user_data.json'})

const page=await context.newPage()
await page.goto("https://sdetqa.vercel.app/login_app")

// User should already be logged in
await expect(page.getByText('Dashboard Welcome', { exact: true })).toBeVisible();
await expect(page.locator('#displayUser')).toContainText('testuser1');


await page.waitForTimeout(5000)

await context.close()
})