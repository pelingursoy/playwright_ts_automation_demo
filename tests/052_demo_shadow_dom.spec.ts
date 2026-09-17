// spec: tests/autoplay-demo-page-test-plan.md

import { test, expect } from '@playwright/test';

test('Shadow DOM', async ({ page }) => {
  await page.goto('https://sdetqa.vercel.app/autoplay');

  //Heading
  const shadowHeading = page.locator('h3', { hasText: 'Shadow DOM' });
  await shadowHeading.scrollIntoViewIfNeeded(); //optional
  await expect(shadowHeading).toBeVisible();

  const shadowHost = page.locator('#shadow_host');  // main shadow host - top one
  await expect(shadowHost).toBeVisible();
  
  await expect(shadowHost.getByText('Mobiles')).toBeVisible();
  await expect(shadowHost.getByText('Laptops')).toBeVisible();

  const textInput = shadowHost.locator('input[type="text"]');
  const checkbox = shadowHost.locator('input[type="checkbox"]');
  const fileInput = shadowHost.locator('input[type="file"]');

  await textInput.fill('Welcome');
  await expect(textInput).toHaveValue('Welcome');

  await checkbox.check();
  await expect(checkbox).toBeChecked();

  await fileInput.setInputFiles('uploads/Test1.txt');

  const youtubeLink = page.getByRole('link', { name: 'Youtube' });
  await expect(youtubeLink).toBeVisible();
  await expect(youtubeLink).toHaveAttribute('href', 'https://www.youtube.com/@sdetpavan/videos');

  const blogLink = shadowHost.getByRole('link', { name: 'Blog' });
  await expect(blogLink).toBeVisible();
  await expect(blogLink).toHaveAttribute('href', 'https://www.pavantestingtools.com/');
});
