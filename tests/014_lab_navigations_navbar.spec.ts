import { test, expect } from '@playwright/test';

  test('Navigation anchors move to the expected sections', async ({ page }) => {

    await page.goto("https://sdetqa.vercel.app/autoplay.html");
    await expect(page.getByText('AutoPlay')).toBeVisible();

    await page.locator('a[href="#home"]').click();
    await expect(page.getByRole('heading', { name: ' Data Entry Form' })).toBeVisible();

    await page.locator('a[href="#forms"]').click();
    await expect(page.getByRole('heading', { name: ' Dropdowns & more' })).toBeVisible();

    await page.locator('a[href="#tables"]').click();
    await expect(page.getByRole('heading', { name: ' Static Web Table' })).toBeVisible();

    await page.locator('a[href="#popups"]').click();
    await expect(page.getByRole('heading', { name: ' Alerts' })).toBeVisible();

    await page.locator('a[href="#files"]').click();
    await expect(page.getByRole('heading', { name: ' File Upload' })).toBeVisible();

    await page.locator('a[href="#advanced"]').click();
    await expect(page.getByRole('heading', { name: ' Interactive Tooltip' })).toBeVisible();
  });