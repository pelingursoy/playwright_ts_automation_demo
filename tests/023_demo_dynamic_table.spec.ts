import { test, expect } from '@playwright/test';

test.describe('Dynamic Table Validations', () => {

  test.beforeEach('Navigate to the File Upload page', async ({ page }) => {
    await page.goto('https://sdetqa.vercel.app/autoplay.html');
    await expect(page.getByText('AutoPlay')).toBeVisible();
  });

  test.afterEach('Closing the page', async ({ page }) => {
    await page.close()
  });

  test('Test Case 1: Chrome CPU Load Validation', async ({ page }) => {
    const rows = await page.locator('table#taskTable tbody tr').all();

    // Basic validations
    expect(rows.length).toBeGreaterThan(0);

    let cpuLoad = '';

    for (const row of rows) {
      const processName = await row.locator('td').nth(0).innerText();
      if (processName === 'Chrome') {
        cpuLoad = await row.locator("td", { hasText: '%' }).innerText();
        const expectedCpu = await page.locator('strong.chrome-cpu').innerText();
        expect(cpuLoad).toBe(expectedCpu);
        break;
      }
    }

    // Validate Chrome row found
    expect(cpuLoad).not.toBe('');

    // Validate format
    expect(cpuLoad).toContain('%');

    const label = page.locator('strong.chrome-cpu');

    // Validate label visible
    await expect(label).toBeVisible();

    // Final validation
    await expect(label).toContainText(cpuLoad);
  });


  test('Test Case 2: Firefox Memory Usage Validation', async ({ page }) => {

    const rows = await page.locator('table#taskTable tbody tr').all();

    expect(rows.length).toBeGreaterThan(0);

    let memoryUsage = '';

    for (const row of rows) {
      const processName = await row.locator('td').nth(0).innerText();
      if (processName === 'Firefox') {
        //const memoryUsage = await row.locator("td", {hasText: 'MB' }).innerText();//Here MB is matching with 3 elements. so use regex like below
        memoryUsage = await row.locator("td", { hasText: /MB$/ }).innerText();
        const expectedMemory = await page.locator('strong.firefox-memory').innerText();
        expect(memoryUsage).toBe(expectedMemory);
        break;
      }
    }

    expect(memoryUsage).not.toBe('');
    expect(memoryUsage).toContain('MB');

    const label = page.locator('strong.firefox-memory');

    await expect(label).toBeVisible();
    await expect(label).toContainText(memoryUsage);
  });

   //-------------------------------------------
    // Assignment
   //-----------------------------------------------
   
    test('Test Case 3: : Chrome Network Speed Validation', async ({ page }) => {

    const rows = await page.locator('table#taskTable tbody tr').all();

    expect(rows.length).toBeGreaterThan(0);

    let networkSpeed = '';

    for (const row of rows) {
      const processName = await row.locator('td').nth(0).innerText();
      if (processName === 'Chrome') {
        networkSpeed = await row.locator("td", { hasText: 'Mbps' }).innerText();
        const expectedNetwork = await page.locator('strong.chrome-network').innerText();
        expect(networkSpeed).toBe(expectedNetwork);
        break;
      }
    }

    expect(networkSpeed).not.toBe('');
    expect(networkSpeed).toContain('Mbps');

    const label = page.locator('strong.chrome-network');

    await expect(label).toBeVisible();
    await expect(label).toContainText(networkSpeed);
  });


  test('Test Case 4: Firefox Disk Usage Validation', async ({ page }) => {
    const rows = await page.locator('table#taskTable tbody tr').all();

    expect(rows.length).toBeGreaterThan(0);

    let diskSpace = '';

    for (const row of rows) {
      const processName = await row.locator('td').nth(0).innerText();
      if (processName === 'Firefox') {
        diskSpace = await row.locator("td", { hasText: 'MB/s' }).innerText();
        const expectedDisk = await page.locator('strong.firefox-disk').innerText();
        expect(diskSpace).toBe(expectedDisk);
        break;
      }
    }

    expect(diskSpace).not.toBe('');
    expect(diskSpace).toContain('MB/s');

    const label = page.locator('strong.firefox-disk');

    await expect(label).toBeVisible();
    await expect(label).toContainText(diskSpace);
  });

});