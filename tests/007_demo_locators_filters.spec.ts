import { test, expect } from '@playwright/test';

/* ======================================================
    Playwright Locator Filters 

    1.Verify "Add to cart" for Product 2   
    2.Count items not having "Out of stock"
    3.Find items with "In stock"
    4.Verify elements using data-testid
    5.Count all elements with test ids
    6.Find "Say goodbye" button for John
    7.Find "Say hello" button for Mary
    8.Find "Subscribe" buttons using multiple conditions
    9.Find "details" buttons for done tasks
    10.Verify stock status counts

======================================================*/


//// Hooks - Runs before each test 

// Open the practice page before every test 
test.beforeEach(async ({ page }) => {
    await page.goto('https://sdetqa.vercel.app/filters_practice.html'); 
})


// Runs after all the tests completed
test.afterAll(async ({ page }) => {
    await page.close()
})



//Filter using hasText - filter by using text  - hasText

test('1.Verify "Add to cart" for Product 2', async ({ page }) => {

    // Step 1: Find all list items
    // Step 2: Filter the item which contains "Product 2"
    // Step 3: From that item, find the button "Add to cart"

    const productButton2 = page
        .getByRole('listitem')
        .filter({ hasText: 'Product 2' })
        .getByRole('button', { name: 'Add to cart' });

    // Verify button is visible
    await expect(productButton2).toBeVisible();

    // click()
    //await productButton2.click()
})


//Filter using hasText - filter by using text  - hasNOtText

test('2.Count items not having "Out of stock" (in Stock)', async ({ page }) => {


    /*  const inStockitems= page.getByRole('listitem')
                        .filter({hasText:'In stock'}) */
    const inStockitems = 
        page.locator(".card").nth(1)   // css locators  go to second card then find list items in it
        .getByRole('listitem')
        .filter({ hasNotText: 'Out of stock' })

    //verify count 3
    await expect(inStockitems).toHaveCount(3)

})


test('3.Find items with "In stock"', async ({ page }) => {

    // Find all items containing "In stock"
    const inStockItems = page
        .getByRole('listitem')
        .filter({ hasText: 'In stock' });

    await expect(inStockItems).toHaveCount(3);
});


//  getByTestId() usage

test('4.Verify elements using data-testid', async ({ page }) => {

    // Locate elements using test id
    const apple = page.getByTestId('apple');
    const banana = page.getByTestId('banana');
    const orange = page.getByTestId('orange');

    // Verify visibility
    await expect(apple).toBeVisible();
    await expect(banana).toBeVisible();
    await expect(orange).toBeVisible();

    // Verify text content
    await expect(apple).toContainText('apple');  //🍏 apple
    await expect(banana).toContainText('banana');
    await expect(orange).toContainText('orange');
});


//  first(), last(), nth()


test('5.Count all elements with test ids', async ({ page }) => {

    // Get all elements having data-testid
    const testIdElements = page.locator('[data-testid]');

      // Access different positions
    const firstElement = testIdElements.first();
    const lastElement = testIdElements.last();
    const fourthElement = testIdElements.nth(3);

  console.log("Fruits......", await firstElement.innerText(), await lastElement.innerText(), await fourthElement.innerText());

  //verify count

  await expect(testIdElements).toHaveCount(5)

});


////  Chaining filters


test('6.Find "Say goodbye" button for John', async ({ page }) => {

// Find "John" → then find "Say goodbye" button inside it   
    const goodbyeButton=page.getByRole('listitem')
    .filter({hasText:'John'})
    .getByRole('button', {name:'Say goodby'})


    await expect(goodbyeButton).toBeVisible();
    await expect(goodbyeButton).toHaveText('Say goodbye');

});


test('7.Find "Say hello" button for Mary', async ({ page }) => {

    const helloButton = page
        .getByRole('listitem')
        .filter({ hasText: 'Mary' })
        .getByRole('button', { name: 'Say hello' });

    await expect(helloButton).toBeVisible();
    await expect(helloButton).toHaveText('Say hello');
});


//  Matching multiple locators using .and()
//Find "Subscribe" buttons using multiple conditions
// role="button" and have title "Subscribe"

test('8.Find "Subscribe" buttons using multiple conditions', async ({ page }) => {
    //Find buttons that are both role="button" and have title "Subscribe"

    const subscribeButtons = page
        .getByRole('button')   // condition1
        .and(page.getByTitle('Subscribe', {exact:true}));     // condition 2

    console.log("Subscribe buttons count:", await subscribeButtons.count());

    await expect(subscribeButtons).toHaveCount(2);
    await expect(subscribeButtons.first()).toBeVisible();
    await expect(subscribeButtons.last()).toBeVisible();
});

//multiple conditions
test('9.Find "details" buttons for done tasks', async ({ page }) => {

    const doneTaskDetails = page
        .getByRole('listitem')
        .filter({ hasText: 'done' })
        .getByRole('button', { name: 'details' });

    //doneTaskDetails.first()  // first details button

    await expect(doneTaskDetails).toHaveCount(2);
});



test('10.Verify stock status counts', async ({ page }) => {

    const inStock = page
        .getByRole('listitem')
        .filter({ hasText: 'In stock' });

    const outOfStock = page
        .getByRole('listitem')
        .filter({ hasText: 'Out of stock' });

    await expect(inStock).toHaveCount(3);
    await expect(outOfStock).toHaveCount(2);
});