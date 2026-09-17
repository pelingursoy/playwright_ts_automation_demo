import { test, expect } from '@playwright/test';

test.beforeEach('Navigate to the File Upload page', async ({ page }) => {
  await page.goto('https://sdetqa.vercel.app/autoplay');
  await expect(page).toHaveURL(/autoplay/);
});

test.afterEach('Closing the page', async ({ page }) => {
  await page.close()
});


test('single file upload', async ({ page }) => {

  const singleFileInput = page.locator('#singleFileInput');
  const uploadSingleButton = page.getByRole('button', { name: 'Upload Single File' });
  const uploadStatus = page.locator('#singleFileStatus');

  //upload single file (.txt)
  await singleFileInput.setInputFiles("uploads/Test1.txt")

  await uploadSingleButton.click()
  await expect(uploadStatus).toHaveText(/Single file selected: Test1.txt/)


  //upload single file (.pdf)
  await singleFileInput.setInputFiles("uploads/sample1.pdf")

  await uploadSingleButton.click()
  await expect(uploadStatus).toHaveText(/Single file selected: sample1.pdf/)

  await page.waitForTimeout(5000)

})


test('multiple files upload', async ({ page }) => {

  const multipleFileInput = page.locator('#multipleFilesInput');
  const uploadMultipleButton = page.getByRole('button', { name: 'Upload Multiple Files' });
  const uploadStatus = page.locator('#multipleFilesStatus');

  await page.waitForLoadState('load') // waiting for loading page

  //upload multiple files
  await multipleFileInput.setInputFiles(["uploads/Test1.txt", "uploads/Test2.txt"])

  await uploadMultipleButton.click()

  await expect(uploadStatus).toContainText('Test1.txt');
  await expect(uploadStatus).toContainText('Test2.txt');

  await page.waitForTimeout(5000)

})