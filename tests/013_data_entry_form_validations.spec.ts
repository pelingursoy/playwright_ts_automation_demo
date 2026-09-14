import { test, expect } from '@playwright/test';


const pageUrl = 'https://sdetqa.vercel.app/autoplay.html';


test.describe('Data Entry Form Validation', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(pageUrl);
    //await expect(page.getByText('AutoPlay')).toBeVisible();
  });


  //1. Page Load Validation

  test('1. Page Load Validation', async ({ page }) => {
    // 1. Open the URL and verify the page loaded
    await expect(page).toHaveURL("https://sdetqa.vercel.app/autoplay.html")
    // 2. Verify the AutoPlay heading is visible
    await expect(page.getByText('AutoPlay')).toBeVisible();
  })


  //2. Input Fields Validation

  test('2. Input Fields Validation', async ({ page }) => {

    const nameField = page.getByLabel('Full name');
    const emailField = page.getByLabel('Email');
    const phoneField = page.getByLabel('Phone');
    const addressField = page.getByLabel('Address');

    // Full name field should be visible and enabled
    await expect(nameField).toBeVisible()
    await expect(nameField).toBeEnabled()

    // Verify 'maxlength' attribute - should be 15
    await expect(nameField).toHaveAttribute('maxlength', '15')

    // Enter and verify full name value
    await nameField.fill("John Canedy")
    await expect(nameField).toHaveValue("John Canedy")

    // Email field should be visible and accept a value
    await expect(emailField).toBeVisible()
    await emailField.fill("tester@example.com")
    await expect(emailField).toHaveValue("tester@example.com")

    // Phone field should be visible and accept a value
    await expect(phoneField).toBeVisible();
    await phoneField.fill('+91 1234567898');
    await expect(phoneField).toHaveValue('+91 1234567898');

    // Address field should be visible and accept multi-line text
    await expect(addressField).toBeVisible()
    await addressField.fill("123 XYZ Lane \n Delhi, India")
    await expect(addressField).toHaveValue("123 XYZ Lane \n Delhi, India")

    //await page.waitForTimeout(2000) // waiting for timeout
  })

  //3. Radio Button (Gender) Validation
  test('3. Radio button validation', async ({ page }) => {
    const maleRadio = page.getByLabel('Male', { exact: true });
    const femaleRadio = page.getByLabel('Female', { exact: true });

    // Locate both radio buttons
    await expect(maleRadio).toBeVisible();
    await expect(femaleRadio).toBeVisible();

    // Select Female and verify
    await femaleRadio.check()
    await expect(femaleRadio).toBeChecked();
    await expect(maleRadio).not.toBeChecked();
  })

  //4. Checkboxes validation
  test.only('4. Checkboxes validation', async ({ page }) => {
    
    // Select Sunday
	  const sundayCheckbox = page.getByLabel('Sun');
    await sundayCheckbox.check() // check checkbox
    sundayCheckbox.setChecked(true)  //sundayCheckbox.setChecked(false)  true- check  false - uncheck

    //Select all checkboxes (Mon–Sun)

  const allDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  //with Map
  
  const allCheckboxes=allDays.map((day)=>{
    return page.getByLabel(day)
  })

  
   for(const checkbox of allCheckboxes){
      await checkbox.check()
      await expect(checkbox).toBeChecked()  // assertion
    }

  //without using map (prefer loop)
    for(const day of allDays){
      const checkbox=page.getByLabel(day)
      await checkbox.check()
      await expect(checkbox).toBeChecked()
    }
   
  // Uncheck Fri, Sat, Sun and verify
 
  for(const day of ['Fri','Sat','Sun']){
      const checkbox=page.getByLabel(day)
      await checkbox.uncheck()
      await expect(checkbox).not.toBeChecked()
    }
 
  //Toggle all checkboxes	Checked → unchecked, unchecked → checked
  
    for(const day of allDays){
      const checkbox=page.getByLabel(day)
      if(await checkbox.isChecked()){
        await checkbox.uncheck()
        await expect(checkbox).not.toBeChecked()
      }
      else{
         await checkbox.check()
        await expect(checkbox).toBeChecked()
      }
    
    }
   
    //Select checkboxes using index (1,3,6 → Tue, Thu, Sun)	
    // Only those indexes should be checked
    const indexes=[1,3,6]
    for(const i of indexes){
      await allCheckboxes[i].check()
      await expect(allCheckboxes[i]).toBeChecked()
    }
  

  //Select checkbox with label "Fri"
  const fridayCheckbox=page.getByLabel('Fri')
  await fridayCheckbox.check()
  await expect(fridayCheckbox).toBeChecked()

  })

  //Submit button validation
  test('5. Submit button validation', async ({ page }) => {
   
    const submitbutton=page.getByRole('button', {name:'Submit'}).first() // capture first Submit button
    
     //visibility
    await expect(submitbutton).toBeVisible()

    //Click on submit button
    await submitbutton.click()

    //enabled/clickable
    await expect(submitbutton).toBeEnabled()

  })

  //Additonal test (field level functional validations)

  //Leave all fields empty and click Submit
  test('Empty form submission should show validation message', async ({ page }) => {
    const nameField = page.getByLabel('Full name');
    const emailField = page.getByLabel('Email');
    const phoneField = page.getByLabel('Phone');
    const addressField = page.getByLabel('Address');
    const submitButton = page.getByRole('button', { name: 'Submit' }).first();
    const errorMessage = page.locator('#formErrors');

    await nameField.fill('');
    await emailField.fill('');
    await phoneField.fill('');
    await addressField.fill('');

    await submitButton.click();

    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Please fix the following:');
  });


//Enter invalid email format	--> Error should be shown
  test('Invalid email format should show an error', async ({ page }) => {
    const emailField = page.getByLabel('Email');
    const submitButton = page.getByRole('button', { name: 'Submit' }).first();
    const errorMessage = page.locator('#formErrors');

    await emailField.fill('xyz.com');  // invalid email id
    await submitButton.click();

    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Please enter a valid email address.');
  });

//Enter more than 15 chars in name	Input should be restricted

test('Full name input should restrict more than 15 characters', async ({ page }) => {
    const nameField = page.getByLabel('Full name');
    await nameField.fill('ABCD12345678907XYZ');
    await expect(nameField).toHaveValue('ABCD12345678907');
    await expect(nameField).toHaveValue(/.{15}/)
  });

  //Enter alphabets in phone field
  test('Phone input should restrict alphabet characters', async ({ page }) => {
    const phoneField = page.getByLabel('Phone');
    await phoneField.fill('123ABC456def789');
    await expect(phoneField).toHaveValue(/^[^A-Za-z]*$/); //maching with 123456789
  });

});


//Regular expresion
/*
1. / ... /
These are just delimiters used in many languages (like JavaScript) to define a regex.

2. ^ (Start anchor) : Ensures the match starts from the beginning of the string

3. [^A-Za-z]
This is a negated character class
A-Za-z → all uppercase and lowercase English letters
[^A-Za-z] → anything that is NOT a letter

✅ Matches:

Digits (0-9)
Symbols (@ # $ %)
Spaces
Special characters

❌ Does NOT match:

A–Z
a–z

*/
