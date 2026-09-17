import { test, expect } from '@playwright/test';

test.beforeEach('Navigate to the File Upload page', async ({ page }) => {
  await page.goto('https://sdetqa.vercel.app/autoplay');
  await expect(page).toHaveURL(/autoplay/);
});


// 1. Toggle button test (START / STOP)
test('1.Toggle button changes state when clicked', async ({ page }) => {

  const toggleButton = page.locator('#toggleBtn');
  const originalToggleText = await toggleButton.textContent();

   await toggleButton.click();  // locator based   // Prefered
  //await page.mouse.click(X, Y)  // Coordinates based  //Not recommended

  const toggledText = await toggleButton.textContent();
  expect(toggledText).not.toBe(originalToggleText);
});


// 2. Right click test
test('2.Right click/context click ', async ({ page }) => {

  const rightClickButton = page.locator('button', { hasText: 'Right Click Me' })
  
  // Rick click action/ context click  --> opens the context menu
  await rightClickButton.click({ button: 'right' });  // this will perform the right click action. Other options: "left" | "right" | "middle" (optional)
  
  await page.waitForTimeout(3000);

  //capture options and verify them if needed
  const allOptions = await page.locator('#customContextMenu button').allInnerTexts();
  console.log(allOptions);
  expect(allOptions).toEqual(['Edit', 'Cut', 'Copy', 'Paste', 'Delete', 'Quit'])

  let quitOption = page.locator('button', { hasText: 'Quit' })
  await expect(quitOption).toBeVisible()

  
  //Handle dialog is optional, but if you want to verify the dialog message, you can uncomment the following code:
 page.on('dialog', (dialog) => {
          expect(dialog.message()).toContain('Quit');
          dialog.accept();
      });

   await quitOption.click() // Click action Triggers a Dialog

})


// 3. Hover interaction test - Hover Me button/Interactive Tooltip
test('3.Mouse Hover interaction & tooltip', async ({ page }) => {
  const hoverButton = page.locator('span:has-text("Hover me")')
  await hoverButton.hover();  //Mouse hover
  await expect(hoverButton).toBeVisible(); 

  console.log("attribute value:",await hoverButton.getAttribute('title'))
  expect(await hoverButton.getAttribute('title')).toBe("This is a tooltip"); // Tool tip verification

});


//4. Double click test
test('Double-click button triggers the expected action', async ({ page }) => {
  page.once('dialog', dialog => {
    expect(dialog.message()).toContain('Double clicked');
    dialog.accept();
  });
  await page.getByRole('button', { name: 'Double click' }).dblclick(); // double click

});

//5. Copy text test -Double click 
test('Copy Text button transfers value from field1 to field2', async ({ page }) => {
  
  const field1 = page.locator('#field1')
  const field2 = page.locator('#field2');
  const copyTextButton = page.locator('button', { hasText: 'Copy Text' });

  await field1.fill('Welcome');
  await copyTextButton.dblclick(); // double click action
  await page.waitForTimeout(3000);

  await expect(field2).toHaveValue('Welcome');
});


//6. Drang and Drop
test('6. Drag and drop the draggable element into the drop zone', async ({ page }) => {

  let sourceItem = page.getByText('Drag me', { exact: true })
  let targetItem = page.getByText('Drop zone', { exact: true })

 page.once('dialog', dialog => {
    expect(dialog.message()).toContain('Dropped!');
    dialog.accept();
  });

  await sourceItem.dragTo(targetItem) // Drag drop event triggers Dialog
  
  await page.waitForTimeout(3000);

});




//7. Slider
test('Range slider', async ({ page }) => {

   const slider = page.locator('#priceSlider');
   await slider.focus()

   await page.keyboard.press('Home') // go to initial point '0'
   //await page.keyboard.press('End') // go to end point '100'
   
   // Move the slider till 50
   for(let i=0;i<50;i++){
       await page.keyboard.press('ArrowRight')
   }
   
   //assertion
   await expect(slider).toHaveValue('50')

   await page.waitForTimeout(5000)


});
