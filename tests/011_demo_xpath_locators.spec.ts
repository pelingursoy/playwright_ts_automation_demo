import { test, expect  } from '@playwright/test';


test('XPath demo with playwright', async ({ page }) => {
    await page.goto('https://demowebshop.tricentis.com/');

    // 1. Absolute XPath (Full XPath) - Not recomended
    const logo=page.locator('//html/body/div[4]/div[1]/div[1]/div[1]/a/img')
    await expect(logo).toBeVisible();  // Expect the logo to be visible
 

    // 2. Relative XPath (Partial XPath) // with Single attribute
    //Syntax:    //tagname[@arrt=value]

     const relativeLogo=page.locator("//img[@alt='Tricentis Demo Web Shop']")
    await expect(relativeLogo).toBeVisible();  // Expect the logo to be visible
 
  // 3. XPath with contains() 
  let products=page.locator("//h2//a[contains(@href, 'computer')]")

    const productsCount=await products.count()
    console.log("Number of products:",productsCount)
    expect(productsCount).toBeGreaterThan(0)

    //console.log(products.textContent())

     console.log(await products.nth(1).textContent()) //Build your own computer
      console.log(await products.allTextContents()) //Build your own computer

    //await products.click() // Error: strict mode violation //trying to performn single action on group of elements
    await products.nth(1).click()

    await page.goBack()

     // 4. XPath with starts-with()
     let buildingProducts=page.locator("//h2//a[starts-with(@href,'/build')]")
     const count=await buildingProducts.count()
      expect(count).toBeGreaterThan(0)
      expect(count).toBe(3)  // if you know exact count

      // 5. XPath with text()

      let registerLink=page.locator("//a[text()='Register']")
      await expect(registerLink).toBeVisible()

    // 6. XPath with last()

    //const wishList=page.locator("//div[@class='column my-account']//li").last()
    //const wishList=page.locator("//div[@class='column my-account']//li[last()]")
    const wishListText=await page.locator("//div[@class='column my-account']//li[last()]").textContent()
    expect(wishListText).toBe('Wishlist')

     // 7. XPath with position()
    const addressesText=await page.locator("//div[@class='column my-account']//li[position()=3]").textContent()
    expect(addressesText).toBe('Addresses')

   const twitterText:string = await page.locator('//div[@class="column follow-us"]//li[position()=2]').innerText();
  expect(twitterText).toBe('Twitter'); // Expect the second social media link to be "Twitter"


})