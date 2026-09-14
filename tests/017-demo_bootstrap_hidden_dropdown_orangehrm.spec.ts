import { test, expect } from '@playwright/test';

test('Bootstrap dropdown', async({page})=>{

    // 1. Open the browser and navigate to OrangeHRM Demo Application
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();

    // 2. Enter username as Admin
    await page.locator('input[name="username"]').fill('Admin');
    await expect(page.locator('input[name="username"]')).toHaveValue('Admin');

    // 3. Enter password as admin123
    await page.locator('input[name="password"]').fill('admin123');
    await expect(page.locator('input[name="password"]')).toHaveValue('admin123');

    // 4. Click on Login button
    await page.locator('button[type="submit"]').click();
    await expect(page.getByRole('link', { name: 'PIM' })).toBeVisible();

    //5. Click on PIM Menu
    await page.getByRole('link',{name:'PIM'}).click()

   // 6. Click on Job Title dropdown (hidden/bootstrap dropdown)
   const jobTitleDropDown=page.locator('form i').nth(2)
    await jobTitleDropDown.click()

//7. check dropdown options are visible
const options=page.locator("div[role='listbox'] span") //capturing the options
await expect(options.first()).toBeVisible()


// 8. Count number of options
const count=await options.count()
console.log("Number of options in a dropdown:",count )

//9. Get text of all the options
const optionTexts=await options.allTextContents()
console.log("Dropdown options:",optionTexts)

 // 10. Iterate through options and print each one

 for(let i=0;i<count;i++){
    const option= options.nth(i)
     const optionText=await option.textContent()
    console.log(optionText)

    if(optionText==='Automaton Tester'){
            option.click()
            break
    }
  }
  //verification selected value in teh dropdown
  await expect(page.locator('.oxd-select-text-input').nth(2)).toHaveText("Automaton Tester")

})