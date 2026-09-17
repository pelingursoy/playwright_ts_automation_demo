import { test, expect } from '@playwright/test';
import fs from 'fs';


test('File download', async ({ page }) => {

    await page.goto('https://sdetqa.vercel.app/autoplay');
    await expect(page).toHaveURL(/autoplay/);

    const [download] = await Promise.all(
        [
            page.waitForEvent('download'),
            page.locator('button', { hasText: 'Download File' }).click(),
        ]
    )
    expect(download.suggestedFilename()).toContain("sample.txt")

    // save the file in the custom path
    //const downloadPath = "downloads/sample.txt"   // Staticc name (if you know the name)
    //const downloadPath="downloads/"+download.suggestedFilename() // Dynamic file name - appoach 1
    const downloadPath = `downloads/${download.suggestedFilename()}` // Dynamic file name - appoach 2

    await download.saveAs(downloadPath)

    //Checking file exists
    const fileExists = fs.existsSync(downloadPath);
    expect(fileExists).toBeTruthy()

    // delete the file/ clean up the file indei the folder
    if (fileExists) {
        fs.unlinkSync(downloadPath)
    }

    await page.close()

})


//Approach 1- using our own browser context
test('Open PDF1', async ({ browser }) => {

    const context = await browser.newContext()
    const page = await context.newPage()

    await page.goto('https://sdetqa.vercel.app/autoplay');
    await expect(page).toHaveURL(/autoplay/);

    /*
 It does two things simultaneously:

 1. Starts listening for a new page (tab/popup).
 2. Clicks the Open PDF button.

 When both complete, it stores the newly opened page in pdfPage.
 */


    const [pdfPage] = await Promise.all([
        context.waitForEvent('page'), //
        page.locator('button', { hasText: 'Open PDF' }).click(),
    ]);
    expect(pdfPage).toBeTruthy();

    await page.waitForTimeout(5000)

    await browser.close();

});



//Approach 2- using the default browser context provided by playwright
test('Open PDF', async ({ page }) => {

    await page.goto('https://sdetqa.vercel.app/autoplay');
    await expect(page).toHaveURL(/autoplay/);

    const [pdfPage] = await Promise.all([
        page.context().waitForEvent('page'),
        page.locator('button', { hasText: 'Open PDF' }).click(),
    ]);
    expect(pdfPage).toBeTruthy();

    await page.waitForTimeout(5000)
    await pdfPage.close();
});

