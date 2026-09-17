import { test, expect } from '@playwright/test';

test('Select Item 50 from dropdown', async ({ page }) => {

  // 1. Open the application
  await page.goto('https://sdetqa.vercel.app/autoplay.html');

  // 2. Locate the dropdown
  const dropdown = page.locator('#scrollable');

 
 // keep scrolling drowpdown till item is visible
 
 await dropdown.evaluate(async (select:HTMLSelectElement)=>{

    while(true){
          // Check whether Item 100 is available
           const itemFound = Array.from(select.options).some(option => option.text === 'Item 200');
            if (itemFound) {
                break
            }

              // Scroll to the bottom to load more items
            select.scrollTop = select.scrollHeight;

            // Wait for new items to load
            await new Promise((resolve) => setTimeout(resolve, 100));
           
    }

   })


  // 3. Select the option (Playwright handles scrolling automatically)
  await dropdown.selectOption({ label: 'Item 200' });

  // 4. Verify the selected value
  await expect(dropdown).toHaveValue('Item 200');

  await page.waitForTimeout(5000);

  await page.close()

});