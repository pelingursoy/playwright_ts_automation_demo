/**
 * Playwright Test for Booking.com Date Picker
 */

import { test, expect, type Page } from '@playwright/test';

/**
 * Helper function to select a date from the date picker
 * This function navigates through months and clicks the target date
 * 
 * page - Playwright Page object representing the browser tab
 * targetMonth - Month name to select (e.g., 'July')
 * targetYear - Year to select (e.g., '2026')
 * targetDay - Day number to select (e.g., '25')
 */

async function selectDate(page: Page, targetMonth: string, targetYear: string, targetDay: string) {
  // Get the 'Next month' button element from the date picker
  const nextMonthButton = page.getByRole('button', { name: 'Next month' });

  // Construct the expected format that appears in the date picker's aria-label
  // Example: "July 25, 2026"
  const targetLabelSubstring = `${targetMonth} ${targetDay}, ${targetYear}`;

  // Loop through months (max 12 months forward)
  // This handles cases where the target date might be in future months
  for (let attempt = 0; attempt < 12; attempt++) {
    // Find the date element using partial aria-label match
    // .first() ensures we get the first match if multiple exist
    const candidateDate = page.locator(`[aria-label*="${targetLabelSubstring}"]`).first();

    // Check if the target date is visible in the current month view
    if (await candidateDate.isVisible()) {
      // Click the date to select it
      await candidateDate.click();
      return; // Exit the function completely after successful selection
    }

    // If the date is not found, check if we can navigate to the next month
    if (await nextMonthButton.isVisible()) {
      await nextMonthButton.click(); // Navigate to the next month
      continue; // Continue to the next iteration to check for the date again
    }

    // If we reach this point, something went wrong - the date wasn't found
    // and we couldn't navigate further
    console.log(`Date not found: ${targetMonth} ${targetDay}, ${targetYear}`);
  }
}

/**
 * Main test: Booking.com date picker functionality
 * This test demonstrates selecting check-in and check-out dates dynamically
 */
test('Booking.com date picker: Select check-in and check-out dates dynamically', async ({ page }) => {
  // STEP 1: Navigate to Booking.com homepage
  await page.goto('https://www.booking.com/');

  // STEP 2: Dismiss the sign-in banner (popup that appears on first visit)
  // This uses an aria-label to find and close the banner
  await page.locator('button[aria-label="Dismiss sign-in info."]').click();

  // STEP 3: Enter destination in the search box
  // - Get the search input field using its role and name
  // - Type "Chennai" as the destination
  await page.getByRole('combobox', { name: 'Where are you going?' }).fill('Chennai');

  // - Select the first auto-suggestion from the dropdown
  // - .filter() finds elements containing the text "Chennai"
  // - .first() selects the first match
  await page.locator('div').filter({ hasText: 'Chennai' }).first().click();

  // STEP 4: Open the date picker calendar
  // Click on the date container to show the calendar
  await page.getByTestId('searchbox-dates-container').click();

  // STEP 5: Select check-in date
  // Define the check-in date: July 25, 2026
  const checkIn = { month: 'July', year: '2026', day: '25' };
  await selectDate(page, checkIn.month, checkIn.year, checkIn.day);

  // STEP 6: Select check-out date
  // Define the check-out date: September 30, 2026
  const checkOut = { month: 'September', year: '2026', day: '30' };
  await selectDate(page, checkOut.month, checkOut.year, checkOut.day);

  // STEP 7: Verify the dates are correctly selected
  // Get the text content from the date picker input field
  const dateInputValue = await page.getByTestId('searchbox-dates-container').innerText();

  // Assertion 1: Verify check-in date appears in the input
  // .substring(0,3) gets the first 3 letters of the month (e.g., "Jul" for "July")
  expect(dateInputValue).toContain(`${checkIn.month.substring(0, 3)} ${checkIn.day}`
  );

  // Assertion 2: Verify check-out date appears in the input
  expect(dateInputValue).toContain(`${checkOut.month.substring(0, 3)} ${checkOut.day}`
  );

  // STEP 8: Success message (optional)
  console.log(' Test completed successfully! Dates selected and verified.');
});