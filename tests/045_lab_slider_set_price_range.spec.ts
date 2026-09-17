import { test, expect } from '@playwright/test';

test('Set price range from $100 to $300', async ({ page }) => {

    // Open the page
    await page.goto('https://sdetqa.vercel.app/autoplay');

    // Slider handles
    const minSlider = page.locator('#slider-range span').first();
    const maxSlider = page.locator('#slider-range span').last();

    // Price textbox
    const priceRange = page.locator('#amount');

    // ----------------------------
    // Reset sliders to default
    // ----------------------------

    // Move minimum slider to the beginning ($0)
    await minSlider.focus();
    await page.keyboard.press('Home');

    // Move maximum slider to the end ($500)
    await maxSlider.focus();
    await page.keyboard.press('End');

    // ----------------------------
    // Move minimum slider to $100
    // ----------------------------

    for (let i = 0; i < 100; i++) {

        const currentValue = await priceRange.inputValue();
        const minPrice = currentValue.split(' - ')[0];

        if (minPrice === '$100') {
            break;
        }

        await minSlider.press('ArrowRight');
    }

    // ----------------------------
    // Move maximum slider to $300
    // ----------------------------

    for (let i = 0; i < 200; i++) {

        const currentValue = await priceRange.inputValue();
        const maxPrice = currentValue.split(' - ')[1];

        if (maxPrice === '$300') {
            break;
        }

        await maxSlider.press('ArrowLeft');
    }

    // Verify final price range
    await expect(priceRange).toHaveValue('$100 - $300');

});