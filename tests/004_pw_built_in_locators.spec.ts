import {test, expect} from '@playwright/test';

test('Playwright locators', async ({ page }) => {
    await page.goto('https://sdetqa.vercel.app/pw-locators-demo-app.html');


//getByRole() find by semantic role, accessible name, and other attributes. It is the most reliable way to find elements on the page.
/*role locators include buttons, checkboxes, headings, links, list items, radio buttons, and text boxes and many more
and follow W3C standarts for ARIA roles
Prefered for interactive elements like buttons, checkboxes, links, lists, headings, tables, etc
*/

const projectsLink = page.getByRole('link', { name: 'Projects' });
await expect(projectsLink).toBeVisible();

const signInButton = page.getByRole('button', { name: 'Sign In' });
await expect(signInButton).toBeVisible(); 
await expect(signInButton).toBeEnabled();
await signInButton.click();

//getByText() find by text content. It is the second most reliable way to find elements on the page. It is case-insensitive and ignores leading and trailing whitespace. It can also match substrings, but it is not recommended to use it for interactive elements like buttons, checkboxes, links, lists, headings, tables, etc.
//use this locator to find non-interactive elements like paragraphs, divs, spans, etc
//for example, if you want to find a paragraph with the text "Welcome to Playwright Locators Demo App", you can use the following code:
const welcomeText = page.getByText('Welcome, John! 👋'); //exact match, exact string
await expect(welcomeText).toBeVisible();

//getByLabel() find by label text. It is the third most reliable way to find elements on the page. It is case-insensitive and ignores leading and trailing whitespace. It can also match substrings, but it is not recommended to use it for interactive elements like buttons, checkboxes, links, lists, headings, tables, etc.
//use this locator to find form elements like input, textarea, select, etc
//for example, if you want to find an input with the label "Email", you can use the following code:
const emailInput = page.getByLabel('Email Address');
await expect(emailInput).toBeVisible();

await emailInput.fill('tester@gmail.com');

//getByPlaceholder() find by placeholder text. It is the fourth most reliable way to find elements on the page. It is case-insensitive and ignores leading and trailing whitespace. It can also match substrings, but it is not recommended to use it for interactive elements like buttons, checkboxes, links, lists, headings, tables, etc.
//use this locator to find form elements like input, textarea, select, etc
//for example, if you want to find an input with the placeholder "Enter your email", you can use the following code:
const searchInput = page.getByPlaceholder('Search tests...');
await expect(searchInput).toBeVisible();
await searchInput.fill('Playwright locators');

//getByAltText() find by alt text. It is the fifth most reliable way to find elements on the page. It is case-insensitive and ignores leading and trailing whitespace. It can also match substrings, but it is not recommended to use it for interactive elements like buttons, checkboxes, links, lists, headings, tables, etc.
//use this locator to find images, icons, and other elements with alt text
//for example, if you want to find an image with the alt text "Playwright logo", you can use the following code:
const logoImage = page.getByAltText('Playwright logo');
await expect(logoImage).toBeVisible();

//getByTitle() find by title attribute. It is the sixth most reliable way to find elements on the page. It is case-insensitive and ignores leading and trailing whitespace. It can also match substrings, but it is not recommended to use it for interactive elements like buttons, checkboxes, links, lists, headings, tables, etc.
//use this locator to find elements with title attribute
//for example, if you want to find an element with the title "Playwright logo", you can use the following code:
const totalRunsBox = page.getByTitle('Total test runs');
await expect(totalRunsBox).toBeVisible();
await expect(totalRunsBox).toHaveText('4,821Total Runs');
await expect(totalRunsBox).toContainText('4,821');

//getByTestId() find by data-testid attribute. It is the seventh most reliable way to find elements on the page. It is case-insensitive and ignores leading and trailing whitespace. It can also match substrings, but it is not recommended to use it for interactive elements like buttons, checkboxes, links, lists, headings, tables, etc.
//use this locator to find elements with data-testid attribute
//for example, if you want to find an element with the data-testid "login-button", you can use the following code:
const proPlanButton = page.getByTestId('add-to-cart-pro');
await expect(proPlanButton).toBeVisible();
await proPlanButton.click();


})