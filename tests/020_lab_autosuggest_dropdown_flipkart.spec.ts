import { test, expect } from "@playwright/test";

test("Handle Autosuggest Dropdown", async ({ page }) => {

    // Navigate to Flipkart
    await page.goto("https://www.flipkart.com/");

    // Wait for the page to load
    await page.waitForTimeout(3000);

    // Close the login popup if it appears
    const closeButton = page.getByText("✕", { exact: true });

    console.log("Visibility check:", await closeButton.isVisible());

    if (await closeButton.isVisible()) {
        await closeButton.click();
    }

    // Locate the search box and enter the search text
    const searchBox = page.locator("input[name='q']").first();

    await expect(searchBox).toBeVisible();
    await searchBox.fill("smart");

    // Wait for auto suggestions to appear
    await page.waitForTimeout(5000);

    // Locate all auto-suggest options
    // Wait until auto-suggestions are displayed
    const options = page.locator("ul > li");
    await expect(options.first()).toBeVisible();

    // Verify suggestions are displayed
    const count = await options.count();
    console.log("Number of suggested options:", count);

    expect(count).toBeGreaterThan(0);

    // Print the 5th suggestion (if available)
    if (count > 5) {
        console.log("5th option:", await options.nth(5).innerText());
    }

    // Print all auto-suggestion values
    console.log("Printing all auto suggestions...");
    for (let i = 0; i < count; i++) {
        console.log(await options.nth(i).textContent());
    }

    // Select the "smartphone" option
    let optionFound = false;

    for (let i = 0; i < count; i++) {

        const text = (await options.nth(i).innerText()).trim();

        if (text === "smartphone") {
            await options.nth(i).click();
            optionFound = true;
            break;
        }
    }

    // Verify the required option was found
    expect(optionFound).toBeTruthy();

    // Wait for the search results page to load
    await page.waitForTimeout(3000);

    // Verify the search URL contains the selected search term
    await expect(page).toHaveURL(/smartphone/i);

    // Verify the search box contains the selected value
    await expect(searchBox).toHaveValue("smartphone");
});