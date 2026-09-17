/* annotations
-----------------
Playwright includes five core built-in annotations that natively control test runner behavior

test.skip(): Marks the test as irrelevant and prevents Playwright from running it.
test.fail(): Informs Playwright that the test is expected to fail. If the test actually passes, the runner will throw an error.
test.fixme(): Bypasses execution because the test is known to be broken, crashing, or unstable.
test.slow(): Triples the default test timeout for resource-heavy operations.
test.only(): Focuses execution exclusively on this test, ignoring all other tests in the project
test.describe()
test.step()

*/

import { test, expect } from '@playwright/test';

const URL = 'https://playwright.dev';


//1. test.skip() - Skip using test() annotation

test.skip('Skip Example - Using test.skip()', async ({ page }) => {
    await page.goto(URL);
    await expect(page).toHaveTitle(/Playwright/);
});


test('Runtime Skip Example', async ({ page, browserName }) => {

    console.log(`Running test in ${browserName}`);
    test.skip(browserName !== 'firefox', 'Runs only in Firefox');

    await page.goto(URL);

    await expect(page).toHaveTitle(/Playwright/);
});


//2.test.fail() - Expected to fail
test.fail('Fail Example - Using test.fail()', async ({ page }) => {
    await page.goto(URL);

    // Incorrect assertion (expected failure)
    await expect(page).toHaveTitle('Wrong Title');
    //await expect(page).toHaveTitle(/Playwright/);
});


//3  test.fixme() - Test is not ready

test.fixme('Fixme Example - Using test.fixme()', async ({ page }) => {
    await page.goto(URL);

    //await expect(page).toHaveTitle(/Playwright/);
    await expect(page).toHaveTitle("wrong title");
});


//test.slow() - Increase timeout
//Marks a test as "slow". Slow test will be given triple the default timeout. 
// default timeout is 30 seconds, so slow test will have 90 seconds timeout.

test('Slow Example - Using test.slow()', async ({ page }) => {
    test.slow();   // make test wait for 90 secs
    await page.goto(URL);
    await page.waitForTimeout(5000);
    await expect(page).toHaveTitle(/Playwright/);
});



test('Runtime Slow Example', async ({ page }) => {

    const runLongScenario = true;

    if (runLongScenario) {
        test.slow();
    }

    await page.goto(URL);
    await expect(page).toHaveTitle(/Playwright/);
});


//test.only():

test.only('Only Example - Using test.only()', async ({ page }) => {
    await page.goto(URL);
    await expect(page).toHaveTitle(/Playwright/);
});
