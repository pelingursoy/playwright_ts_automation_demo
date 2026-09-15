//alert(), confirm(), prompt() dialogs/JS alerts
//Reference:  https://playwright.dev/docs/dialogs#alert-confirm-prompt-dialogs

//1) By default, dialogs are auto-dismissed by Playwright, so you don't have to handle them. 
// 2) However, you can register a dialog handler before the action that triggers the dialog to either 
// dialog.accept() or dialog.dismiss() it.


import { test, expect } from "@playwright/test";


test.describe("Handle dialogs/alerts", () => {

    test.beforeEach('Navigate to the File Upload page', async ({ page }) => {
        await page.goto("https://sdetqa.vercel.app/autoplay.html");
        await expect(page.getByText('AutoPlay')).toBeVisible();
    });


    test('simple dialog', async ({ page }) => {
        page.on('dialog', (dialog) => {
            expect(dialog.type()).toBe('alert')
            expect(dialog.message()).toContain("Simple alert!")
            dialog.accept()
        });
        await page.getByRole('button', { name: 'Simple' }).click()
        //await page.waitForTimeout(5000)
    });


    test('confirmation dialog', async ({ page }) => {
        page.on('dialog', (dialog) => {
            expect(dialog.type()).toBe('confirm')
            expect(dialog.message()).toContain("Confirm?")
            dialog.dismiss()    //dialog.accept()
        });
        await page.getByRole('button', { name: 'Confirm' }).click()
    })


    test('prompt dialog', async ({ page }) => {
        page.on('dialog', (dialog) => {
            if (dialog.type() === "prompt") {
                dialog.accept("Welcome")
            }
            else if (dialog.type() === 'alert') {
                dialog.accept()
            }
        });
        await page.getByRole('button', { name: 'Prompt' }).click()
    })


})



