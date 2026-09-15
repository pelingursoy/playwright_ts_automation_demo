import { test, expect } from '@playwright/test';
import fs from 'fs';

test('Extract pagination table data to text file', async ({ page }) => {
  // Define the output text file path
  const filePath = "./tests/chapter15-pagination-table/table_data.txt";

  // Clear the file if it already exists from a previous run
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }

  // Navigate to your target website
  await page.goto('https://datatables.net/examples/basic_init/zero_configuration.html');

  // Define your selectors (Adjust these based on your DOM structure)
  const tableRowsLocator = page.locator('#example tbody tr');
  const nextButtonLocator = page.getByRole('link', { name: 'Next' });
  let hasNextPage = true;
  let pageCount = 1;

  while (hasNextPage) {
    console.log(`Extracting data from page ${pageCount}...`);

    // 1. Wait for the table rows to be visible on the current page
    await tableRowsLocator.first().waitFor({ state: 'visible' });

    // 2. Get all row elements available on the current page
    const rows = await tableRowsLocator.all();
    let pageDataString = `--- Page ${pageCount} ---\n`;

    // 3. Loop through each row and extract text from its cell elements (td)
    for (const row of rows) {
      const cells = await row.locator('td').allTextContents();
      if (cells.length > 0) {
        console.log(cells)
        // Join cell values with a comma or tab delimiter
        pageDataString += cells.join(', ') + '\n';

      }
    }

    // 4. Append extracted page data to the text file immediately
    fs.appendFileSync(filePath, pageDataString);

    // 5. Check if the "Next" button exists and is clickable
    if (await nextButtonLocator.isVisible() && await nextButtonLocator.isEnabled()) {
      // Click next and wait for the network/DOM to stabilize or the page state to change
      await nextButtonLocator.click();
      pageCount++;
      // Optional: Add a short wait or verify a structural change if pagination is fully client-side
      await page.waitForTimeout(1000);
    } else {
      hasNextPage = false;
      console.log('Reached the last page. Extraction complete.');
    }
  }
 })

test("Filter the rows and check the rows count", async ({ page }) => {

    await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html");

    const dropdown = page.locator("#dt-length-0");
    await dropdown.selectOption({ label: '25' });

    //Appraoch 1
    const rows = await page.locator("#example tbody tr").all();
    expect(rows.length).toBe(25); //assertion

    //Appraoch2
    const rows2 = page.locator("#example tbody tr");
    await expect(rows2).toHaveCount(25);
  })


  test("Search for specific data in a table", async ({ page }) => {

    await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html");

    const searchbox = page.locator('#dt-search-0');
    await searchbox.fill('Paul Byrd');

    await page.waitForTimeout(5000);
    const rows = await page.locator("#example tbody tr").all();

    if (rows.length >= 1) {
        let matchFound = false;
        for (let row of rows) {
            const text = await row.innerText();
            if (text.includes('Paul Byrd')) {
                console.log("Record exist- found");
                matchFound = true;
                break;
            }

        }
        expect(matchFound).toBeTruthy();
    }
    else {
        console.log("No Rows found with search text")
    }
});