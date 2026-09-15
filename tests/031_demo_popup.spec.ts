import { test, expect } from '@playwright/test';

test('Common Popup overlay', async ({ page }) => {
    await page.goto("https://sdetqa.vercel.app/autoplay.html");

    await page.locator('#PopUp').click();

    const popopBox = page.locator('#inlinePopup');
    await expect(popopBox).toBeVisible();

    await expect(popopBox.getByRole('heading', { name: 'Be always in touch' })).toBeVisible();

    await popopBox.getByRole('button', { name: 'Yes' }).click();
    await expect(popopBox).toBeHidden();

    //await page.close()
});

