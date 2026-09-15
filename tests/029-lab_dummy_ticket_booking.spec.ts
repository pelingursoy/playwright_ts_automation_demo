import { test, expect, Page } from '@playwright/test';

async function selectDate(page: Page, dateInputSelector: string, targetDate: Date) {
  await page.locator(dateInputSelector).click();
  await expect(page.locator('select[aria-label="Select year"]')).toBeVisible();

  const monthValue = targetDate.getMonth().toString(); // Months are zero-indexed in JavaScript, so January is 0, February is 1, etc.
  const yearValue = targetDate.getFullYear().toString(); // Get the full year as a string
  const dayValue = targetDate.getDate().toString(); // Get the day of the month as a string

  await page.locator('select[aria-label="Select year"]').selectOption(yearValue);// Select the year from the dropdown
  await page.locator('select[aria-label="Select month"]').selectOption(monthValue);// Select the month from the dropdown
  await page.locator('table.ui-datepicker-calendar td a', { hasText: dayValue }).first().click();// Click on the day in the calendar  
}

async function selectDateOfBirth(page: Page, birthDate: Date) {
  await selectDate(page, '#dob', birthDate);
}

async function selectTravelDate(page: Page, dateInputSelector: string, travelDate: Date) {
  await selectDate(page, dateInputSelector, travelDate);
}

test.describe('Dummy Ticket Booking', () => {
  test('Book a dummy flight ticket with dynamic date picker helpers', async ({ page }) => {
    const dateOfBirth = new Date('1995-01-15');// Set date of birth to January 15, 1995
    
    const departureDate = new Date(); // Get today's date
    departureDate.setDate(departureDate.getDate() + 30); // Set departure date to 30 days from today
   
    const returnDate = new Date(departureDate); 
    returnDate.setDate(returnDate.getDate() + 10);// Set return date to 10 days after departure date

    // 1. Open the Dummy Ticket Booking application.
    await page.goto('https://www.dummyticket.com/dummy-ticket-for-visa-application/');
    await expect(page).toHaveTitle(/Dummy ticket/);
    await expect(page.locator('#place_order')).toBeVisible();

    // 2. Choose the dummy ticket for visa application.
    await page.locator('#product_549').check();
    await expect(page.locator('#product_549')).toBeChecked();

    // 3. Fill passenger details.
    await page.locator('#travname').fill('John');
    await page.locator('#travlastname').fill('Smith');
    await selectDateOfBirth(page, dateOfBirth);
    await page.locator('#sex_1').check();
    await expect(page.locator('#sex_1')).toBeChecked();

    // 4. Fill trip details and select both departure and return dates.
    await page.locator('#traveltype_2').check();
    await expect(page.locator('#traveltype_2')).toBeChecked();
    await page.locator('#fromcity').fill('Hyderabad');
    await page.locator('#tocity').fill('London');
    await selectTravelDate(page, '#departon', departureDate);// Select departure date using the helper function
    await selectTravelDate(page, '#returndate', returnDate); // Select return date using the helper function

    // 5. Fill billing and contact details.
    await page.locator('#billname').fill('John Smith');
    await page.locator('#billing_phone').fill('9876543210');
    await page.locator('#billing_email').fill('john.smith@test.com');
    await page.locator('#billing_country').selectOption('IN');
    await page.locator('#billing_state').selectOption('TS');
    await page.locator('#billing_address_1').fill('Hitech City, Hyderabad');
    await page.locator('#billing_city').fill('Hyderabad');
    await page.locator('#billing_postcode').fill('500081');

    await expect(page.locator('#billname')).toHaveValue('John Smith');
    await expect(page.locator('#billing_phone')).toHaveValue('9876543210');
    await expect(page.locator('#billing_email')).toHaveValue('john.smith@test.com');
    await expect(page.locator('#billing_address_1')).toHaveValue('Hitech City, Hyderabad');
    await expect(page.locator('#billing_city')).toHaveValue('Hyderabad');
    await expect(page.locator('#billing_postcode')).toHaveValue('500081');
    await expect(page.locator('#billing_country')).toHaveValue('IN');
    await expect(page.locator('#billing_state')).toHaveValue('TS');

    // 6.Verify Product details table 
    const productName=page.locator('.product-details');
    await expect(productName).toHaveText("Dummy ticket for Visa Application");

    const productPrice=page.locator('.shop_table.woocommerce-checkout-review-order-table tfoot tr:nth-child(2) td');
    await expect(productPrice).toHaveText("₹1,200");

    // 7. Verify order placement controls and submit the form.
    const placeOrderButton = page.locator('#place_order');
    await expect(placeOrderButton).toBeVisible();
    await expect(placeOrderButton).toBeEnabled();
    await placeOrderButton.click();

    // 8. Validate the booking workflow reached Payment page.
      await expect(page).toHaveTitle("Payment Page");

      //await page.close()
  });
});
