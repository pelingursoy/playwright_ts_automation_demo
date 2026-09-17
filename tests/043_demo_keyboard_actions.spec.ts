/*
Keyboard methods:
insertText /type

down
press
up

keyboard.press

await page.keyboard
*/

import { test, expect } from '@playwright/test';


test('keyboard actions', async ({ page }) => {

    await page.goto("https://gotranscript.com/text-compare");

    const input1 = page.locator("textarea[name='text1']");

    //1) fous on Full name
    await input1.focus()

    //2) providing the text
    await page.keyboard.insertText("Welcome") //one shot
    //await page.keyboard.type("Welcome") // character by character

    //3) Ctrl +A  --> Select the text from input 1
    await page.keyboard.down('Control');
    await page.keyboard.press('A');
    await page.keyboard.up('Control');

    //4) Ctrl +C  -->  copy the text from input1
    await page.keyboard.down('Control');
    await page.keyboard.press('C');
    await page.keyboard.up('Control');

    //5) Tab --> navigate to input2
     await page.keyboard.press('Tab');

    //4) Ctrl +V  -->  Paste the text into input2
    await page.keyboard.down('Control');
    await page.keyboard.press('V');
    await page.keyboard.up('Control');

    await expect(page.locator("textarea[name='text2']")).toHaveValue("Welcome")

    await page.waitForTimeout(5000);
})



test('keyboard actions2', async ({ page }) => {

    await page.goto("https://gotranscript.com/text-compare");

    const input1 = page.locator("textarea[name='text1']");

    //1) fous on Full name
    await input1.focus()

    //2) providing the text
    await page.keyboard.insertText("Welcome") //one shot
    //await page.keyboard.type("Welcome") // character by character

    //3) Ctrl +A  --> Select the text from input 1
    await page.keyboard.press('Control+A');

    //4) Ctrl +C  -->  copy the text from input1
    await page.keyboard.press('Control+C');

    //5) Tab --> navigate to input2
     await page.keyboard.press('Tab');

    //4) Ctrl +V  -->  Paste the text into input2
   await page.keyboard.press('Control+V');

    await expect(page.locator("textarea[name='text2']")).toHaveValue("Welcome")

    await page.waitForTimeout(5000);
})