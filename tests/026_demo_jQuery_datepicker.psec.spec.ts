import { test, expect, Page } from '@playwright/test';


async function selectDate(page: Page, targetYear: string, targetMonth: string, targetDay: string, isFuture?: boolean) {

  while (true) {
    const currentMonth = await page.locator('.ui-datepicker-month').innerText();
    const currentYear = await page.locator('.ui-datepicker-year').innerText();

    if (currentMonth === targetMonth && currentYear === targetYear) {
      break;
    }

    if (isFuture) {
      await page.locator('.ui-datepicker-next').click() //Next button
    }
    else {
      await page.locator('.ui-datepicker-prev').click() //Previous button
    }
  }

  //Select the date
  const dates= await page.locator('.ui-datepicker-calendar td').all()

  /*
  for(const date of dates){
    const dayText=await date.innerText()

    if(dayText===targetDay){
      await date.click()
      break
    }
  }
*/
//single statement (alternative)
await page.locator('.ui-datepicker-calendar td',{hasText:targetDay}).first().click()

}

test('Demo jQuery datepicker', async ({ page }) => {

  await page.goto('https://sdetqa.vercel.app/autoplay.html');

  const dateInput = page.locator('#datepicker1')
  await expect(dateInput).toBeVisible()

  //Approach 1: Directly set the date   using fill()
  //await dateInput.fill("08/15/2026") //mm/dd/yyyy foramt

  //Approach2: select date through calender

  //clicking on date picker
  await dateInput.click()

  //Target date (past/future)
  const targetYear = '2026';
  const targetMonth = 'July';
  const targetDay = '15';

  // Select the date from the calendar
  //calling re-usuable function to select date
  
  await selectDate(page, targetYear, targetMonth, targetDay, true) // false = past date, true = future date
  //await selectDate(page, targetYear, targetMonth, targetDay) // for selecting current date, no need to pass flag true/false

  //verify selected date
  await expect(dateInput).toHaveValue("07/15/2026") //mm/dd/yyyy

  await page.waitForTimeout(5000)

})


