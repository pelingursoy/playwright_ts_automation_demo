import { test, expect, Frame } from '@playwright/test';

test.describe('Frames Examples', () => {

    test('Frame 1 - Fill and verify input field', async ({ page }) => {

        await page.goto('https://ui.vision/demo/webtest/frames/');

        const frame1 = page.frameLocator('frame[src="frame_1.html"]');

        await frame1.locator('input[name="mytext1"]').fill('Welcome');

        await expect(frame1.locator('input[name="mytext1"]')).toHaveValue('Welcome');

    });

    test('Frame 2 - Fill and verify input field', async ({ page }) => {

        await page.goto('https://ui.vision/demo/webtest/frames/');

        const frame2 = page.frameLocator('frame[src="frame_2.html"]');

        await frame2.locator('input[name="mytext2"]').fill('Suneel');

        await expect(frame2.locator('input[name="mytext2"]')).toHaveValue('Suneel');

    });

    test('Frame 3 - Handle nested frame and Google Form', async ({ page }) => {

        await page.goto('https://ui.vision/demo/webtest/frames/');

        // Parent frame
        const frame3 = page.frameLocator('frame[src="frame_3.html"]');

        await frame3.locator('[name="mytext3"]').fill('You are in Frame 3 - Teal');

        await expect(frame3.locator('[name="mytext3"]')).toHaveValue('You are in Frame 3 - Teal');

        // Child frame inside Frame 3
        // Nested iframe (Google Form)
        const childFrame = frame3.frameLocator('iframe');

        // Now interact with elements inside the child frame
        await childFrame.getByRole('radio', { name: 'Hi, I am the UI.Vision IDE' }).click();

        // Select checkbox
        await childFrame.getByRole('checkbox', { name: 'Form Autofilling' }).click();

        // Next button
        await childFrame.getByRole('button', { name: 'Next' }).click();

        // Fill short text
        const shortText = childFrame.getByRole('textbox', {
            name: 'Enter a short text'
        });

        await shortText.fill('We are here');
        await expect(shortText).toHaveValue('We are here');

        // Fill long text
        const longText = childFrame.getByRole('textbox', { name: 'Enter a long answer' });

        await longText.fill('We are able to access all element in child frame');

        await expect(longText).toHaveValue('We are able to access all element in child frame');

        // Submit form
        await childFrame.getByRole('button', { name: 'Submit' }).click();

        const confirmationText = await childFrame.locator('.vHW8K').innerText();

        console.log(confirmationText);
        expect(confirmationText).toContain('Thank you for testing the UI.Vision');

    });

    test('Frame 4 - Fill and verify input field', async ({ page }) => {

        await page.goto('https://ui.vision/demo/webtest/frames/');

        const frame4 = page.frameLocator('frame[src="frame_4.html"]');

        await frame4.locator('input[name="mytext4"]').fill('Frame 4 Text');
        await expect(frame4.locator('input[name="mytext4"]')).toHaveValue('Frame 4 Text');

    });

    test('Frame 5 - Fill input and verify logo', async ({ page }) => {

        await page.goto('https://ui.vision/demo/webtest/frames/');

        const frame5 = page.frameLocator('frame[src="frame_5.html"]');

        await frame5.locator('input[name="mytext5"]').fill('playwright');

        await expect(frame5.locator('input[name="mytext5"]')).toHaveValue('playwright');

        await frame5.locator('a[href="https://a9t9.com"]').click();

        await page.waitForTimeout(5000);

        const logo = frame5.locator('img.responsive-img').first();

        await expect(logo!).toBeVisible();

    });

});