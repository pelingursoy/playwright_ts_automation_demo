import { test, expect } from '@playwright/test';

const pageUrl = 'https://sdetqa.vercel.app/autoplay.html';

test.describe('CRUD Web Table', () => {

    test('Validate CRUD table operations', async ({ page }) => {

        // ==========================================================
        // Test Step 1:
        // Open the CRUD Web Table page.
        // Expected Result:
        // The page opens successfully and the "Web Table with CRUD"
        // section is displayed.
        // ==========================================================
        await page.goto(pageUrl);

        const crudHeading = page.locator('h3', { hasText: 'Web Table with CRUD' });
        await expect(crudHeading).toBeVisible();

        // ==========================================================
        // Test Step 2:
        // Verify the CRUD table is displayed.
        // Expected Result:
        // The table is visible with the headers:
        // #, Name, Role, Action.
        // ==========================================================
        
        const crudTable = page.locator('#dynamicTable');

        await expect(crudTable).toBeVisible();
        await expect(crudTable.locator('thead th')).toHaveText([
            '#',
            'Name',
            'Role',
            'Action'
        ]);

        // ==========================================================
        // Test Step 3:
        // Verify the input fields and buttons.
        // Expected Result:
        // Name, Role, Add, + Dynamic and Search controls are visible
        // and enabled.
        // ==========================================================
        const nameInput = page.locator('#newName');
        const roleInput = page.locator('#newRole');
        const addButton = page.locator('button', { hasText: 'Add' });
        const dynamicButton = page.locator('button', { hasText: '+ Dynamic' });
        const searchInput = page.locator('input[placeholder="Search table..."]');

        await expect(nameInput).toBeVisible();
        await expect(roleInput).toBeVisible();

        await expect(addButton).toBeVisible();
        await expect(addButton).toBeEnabled();

        await expect(dynamicButton).toBeVisible();
        await expect(dynamicButton).toBeEnabled();

        await expect(searchInput).toBeVisible();

        // ==========================================================
        // Test Step 4:
        // Verify the default table data.
        // Expected Result:
        // The table contains Alice and Bob records.
        // ==========================================================
        const aliceRow = crudTable.locator('tbody tr', { hasText: 'Alice' });
        const bobRow = crudTable.locator('tbody tr', { hasText: 'Bob' });

        await expect(aliceRow).toBeVisible();
        await expect(bobRow).toBeVisible();
        await expect(crudTable.locator('tbody tr')).toHaveCount(2);

        // ==========================================================
        // Test Step 5:
        // Enter "Sam Tester" as Name and "QA Lead" as Role.
        // Click the Add button.
        // Expected Result:
        // A new row is added with the entered details.
        // ==========================================================
        await nameInput.fill('Sam Tester');
        await roleInput.fill('QA Lead');

        await expect(nameInput).toHaveValue('Sam Tester');
        await expect(roleInput).toHaveValue('QA Lead');

        await addButton.click();

        await expect(
            crudTable.locator('tbody tr', { hasText: 'Sam Tester' })
        ).toBeVisible();

        // ==========================================================
        // Test Step 6:
        // Verify the total number of rows.
        // Expected Result:
        // The table now contains 3 rows.
        // ==========================================================
        await expect(crudTable.locator('tbody tr')).toHaveCount(3);

        // ==========================================================
        // Test Step 7:
        // Search for "Alice".
        // Expected Result:
        // Only the Alice record is visible.
        // ==========================================================
        await searchInput.fill('Alice');
        await expect(searchInput).toHaveValue('Alice');

        await expect(
            crudTable.locator('tbody tr', { hasText: 'Alice' })
        ).toHaveCount(1);

        await expect(crudTable.locator('tbody tr:visible')).toHaveCount(1);
        await expect(bobRow).toBeHidden();

        // ==========================================================
        // Test Step 8:
        // Clear the search box.
        // Expected Result:
        // All table rows become visible again.
        // ==========================================================
        await searchInput.fill('');
        await expect(searchInput).toHaveValue('');

        await expect(crudTable.locator('tbody tr:visible')).toHaveCount(3);
        await expect(aliceRow).toBeVisible();
        await expect(bobRow).toBeVisible();

        // ==========================================================
        // Test Step 9:
        // Delete the Bob record and accept the confirmation dialog.
        // Expected Result:
        // Bob is removed and the table contains 2 rows.
        // ==========================================================
        page.once('dialog', dialog => dialog.accept()); //This will accept the confirmation dialog after clicking on 'Delete' button.

        await bobRow.locator('button', { hasText: 'Delete' }).click();

        await expect(
            crudTable.locator('tbody tr', { hasText: 'Bob' })
        ).toHaveCount(0);

        await expect(crudTable.locator('tbody tr')).toHaveCount(2);

        // ==========================================================
        // Test Step 10:
        // Click the + Dynamic button.
        // Expected Result:
        // A new dynamic record is added to the table.
        // ==========================================================
        await dynamicButton.click();

        await expect(dynamicButton).toBeEnabled();
        await expect(
            crudTable.locator('tbody tr', { hasText: 'New' })
        ).toBeVisible();

        await expect(
            crudTable.locator('tbody tr', { hasText: 'Dev' })
        ).toBeVisible();

        await page.close();
    });

});