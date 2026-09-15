import { test, expect, Page } from '@playwright/test';

// Reusable function to select a date in the jQuery UI date picker
async function selectDate(page: Page, targetYear: string, targetMonth: string, targetDate: string) {
  // Select the year
  const yearDropdown = page.locator('select.ui-datepicker-year');
  await yearDropdown.selectOption({ label: targetYear });

  // Select the month
  const monthDropdown = page.locator('select.ui-datepicker-month');
  await monthDropdown.selectOption({ label: targetMonth });

  // Click on the desired date
  const allDates = await page.locator('table.ui-datepicker-calendar a').all();
 
 /*
  for (let date of allDates) {
    const dateText = await date.innerText();
    if (dateText === targetDate) {
      await date.click();
      break;
    }
  }
 */
   // shortcut to select the date directly
  await page.locator('table.ui-datepicker-calendar a', { hasText: targetDate }).first().click(); 

}


test('Date Picker with Dropdowns - Select Date', async ({ page }) => {
  // Go to the target page
  await page.goto('https://sdetqa.vercel.app/autoplay.html');

  // Click on the input field to open the date picker
  const dateInput = page.locator('#datepicker2');
  await dateInput.click();

  // Desired date
  const year = '2027';
  const month = 'May';
  const date = '15';

  // Select the date using helper
  await selectDate(page, year, month, date);

  // Assert that the correct date is selected in the input box
  await expect(dateInput).toHaveValue('15/05/2027');  //dd/mm/yyyy
});
