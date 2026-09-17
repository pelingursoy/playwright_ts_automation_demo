import { test, expect } from '@playwright/test';

const URL = 'https://sdetqa.vercel.app/autoplay.html'; // replace with target page

test.describe('SVG handling', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(URL);
    });
    
    test.afterEach(async ({ page }) => {
        await page.close();
    });
    

    test('shape tests', async ({ page }) => {

        //1.Click on an SVG circle Icon
        let circle = page.locator('svg circle'); // Locate SVG circle
        await expect(circle).toBeVisible();
        await circle.click();

        //2.Locate SVG rectangle by ID
        const rect = page.locator('#rect-shape');
        await rect.click();

        //3.Locate SVG circle using Attributes
        circle = page.locator('circle[fill="DeepSkyBlue"]');
        await expect(circle).toBeVisible();

        //4.Verify SVG Color
        const fill = await page.locator('svg circle').getAttribute('fill');
        expect(fill).toBe('DeepSkyBlue');

        // 5.Count Multiple SVG Icons
        const shapes_count = page.locator('.shape');
        console.log(await shapes_count.count())
        expect(shapes_count).toHaveCount(4)
    });


  test('handle SVG Bar chart', async ({ page }) => {

        //1. Click a Specific Bar
        await page.locator('svg rect').nth(1).click();

        //2. bars & labels counts validations
      const bars = page.locator('svg').nth(1).locator('rect')
      expect(await bars.count()).toBe(5);
      const bars_count = await bars.count(); //Count Bars

      const labels = page.locator('svg').nth(1).locator('text')
      expect(await labels.count()).toBe(5);
      const labels_count = await labels.count(); //Count labels

       expect(bars_count).toEqual(labels_count) // check bars === labels

          //3. Print Label along with Heights
        for (let i = 0; i < bars_count; i++) {
            const label = await labels.nth(i).textContent()
            const height = await bars.nth(i).getAttribute('height');
            console.log(`${label} : ${height}`);
        }

           //4. Verify Highest Bar - expe 70
          let maxHeight=0
        for (let i = 0; i < bars_count; i++) {
             const height = Number(await bars.nth(i).getAttribute('height'));

             if(height>maxHeight){
                            maxHeight=height
             }   
         }
        expect(maxHeight).toBe(70);
    });



});