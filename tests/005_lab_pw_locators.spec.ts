// Locators Practice 
// This test script is designed to verify the functionality of various Playwright locators on a sample HTML page.

import{test,expect} from "@playwright/test"  ;

test( "Verify Playwright Locators on HTML Page", async ({page})=>{

await page.goto("https://sdetqa.vercel.app/pw-locators-practice-app.html") ;

// 1. page.getByRole() to locate by explicit and implicit accessibility attributes.
// This is useful for locating elements based on their ARIA roles, such as buttons, links, checkboxes, etc.

await expect(page.getByText("Locate elements by their explicit or implicit ARIA roles. ")).toBeVisible(); // Verify that the descriptive text is visible on the page
await expect(page.getByRole("button", {name: 'Primary Action'})).toBeVisible(); // Verify that the button with the role "button" and name "Primary Action" is visible on the page
await expect(page.getByRole("button", {name: 'Toggle Button'})).toBeVisible(); // Verify that the button with the role "button" and name "Toggle Button" is visible on the page
await expect(page.getByRole("button", {name: 'Div with button role'})).toBeVisible(); // Verify that the div with the role "button" and name "Div with button role" is visible on the page
await expect(page.getByRole("textbox", {name : 'username'})).toBeVisible(); // Verify that the textbox with the role "textbox" and name "username" is visible on the page
await expect(page.getByRole("checkbox", {name :' Accept terms'})).toBeEditable(); // Verify that the checkbox with the role "checkbox" and name "Accept terms" is editable on the page


//await page.getByRole("link", {name: 'Home'}).click(); // This is matching with multiple elements. so cannot perfoem click. You need to take the first matched element.


await page.getByRole("link", {name: 'Home'}).first().click();
await page.getByRole("link", {name:'Products'}).first().click();
await page.getByRole("link", {name:'Contact'}).first().click();


// 2. page.getByText() to locate by text content (non interactive element)
// This is useful for locating elements that contain specific text, such as headings, paragraphs, or list items.

await expect(page.getByText("List item 1")).toBeVisible();
await expect(page.getByText("List item 2 with ")).toBeVisible();
await expect(page.getByText("Special: Unique text identifier")).toBeVisible();


//3. page.getByLabel() to locate a form control by associated label's text.
// This is useful for input fields, checkboxes, radio buttons, etc.

await page.getByLabel('Email Address:').fill("abc@gmail.com");
await page.getByLabel('password').fill("testing");
await page.getByLabel('Your Age:').fill("20"); 
await page.getByLabel(' Standard').check(); 
await page.getByLabel(' Express').check(); 


//4. page.getByPlaceholder() to locate an input by placeholder.

// This is useful for input fields that have placeholder text, which can provide hints to users about what to enter.

await page.getByPlaceholder("Enter your full name").fill("John Smith");
await page.getByPlaceholder("Phone number (xxx-xxx-xxxx)").fill("123-456-7890");
await page.getByPlaceholder("Type your message here...").fill("this is playwrigth automation");
await page.getByPlaceholder("Search products...").fill("PW Book");
await page.getByRole("button", {name:'Search'}).click();


// 5.page.getByAltText() to locate an element, usually image, by its text alternative. 
//  This is useful for images that have alt text, which can provide descriptions for users who cannot see the images.
const logo = page.getByAltText("logo image");
await expect(logo).toBeVisible();


// 6. page.getByTitle() to locate an element by its title attribute. 
// This is useful for elements that have a title attribute, which can provide additional information when hovered over.

await expect(page.getByTitle("Home page link")).toHaveText("Home");
await expect(page.getByTitle("HyperText Markup Language")).toHaveText("HTML");
await expect(page.getByTitle("Tooltip text")).toHaveText("This text has a tooltip");

// 7. page.getByTestId() to locate an element based on its data-testid attribute (other attributes can be configured)
// This is useful for elements that have a data-testid attribute, which can be used for testing purposes without affecting the user experience.
 
await expect(page.getByTestId("profile-name")).toHaveText("John Doe");
await expect(page.getByTestId("profile-email")).toHaveText("john.doe@example.com");
await page.getByTestId("edit-profile-btn").click();
await page.getByTestId("nav-home").click();
await page.getByTestId("nav-products").click();
await page.getByTestId("nav-contact").click();

await page.close() 
// Closing the page after the test is complete

})

