import { test, expect } from '@playwright/test';
import { NavigationPage } from '../POM/navigationPages';
import { ToastrPage } from '../POM/toastrPage';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});
//1
// test('shouw define toast', async ({ page }) => {
//   const navigateTo = new NavigationPage(page);

//   await navigateTo.toastrPage();

//   const notificationDropDown = page.locator('nb-select.position-select button.select-button');
//   await notificationDropDown.click();
//   await expect(page.locator('ul.option-list')).toBeVisible();
//   await page.getByText('top-left').click();
//   await expect(notificationDropDown).toHaveText('top-left');

//   await page.locator('[name="title"]').fill('MY 1st title');
//   await expect(page.locator('[name="title"]')).toHaveValue('MY 1st title');

//   await page.locator('input[name="content"]').fill('HELLO WORLD');
//   await expect(page.locator('input[name="content"]')).toHaveValue('HELLO WORLD');

//   await page.locator('input[name="timeout"]').fill('3000');
//   await expect(page.locator('input[name="timeout"]')).toHaveValue('3000');

//   await page.getByRole('button', { name: 'Show Toast' }).click();

//   const toast = page.locator('nb-toastr-container nb-toast');
//   await expect(toast).toBeVisible();
//   await expect(toast.locator('.title')).toContainText('MY 1st title');
//   await expect(toast.locator('.message')).toHaveText('HELLO WORLD');

//   const boundingBox = await toast.boundingBox();
//   expect(boundingBox).not.toBeNull();
//   expect(boundingBox?.x).toBeLessThan(50); // Should be near the left edge
//   expect(boundingBox?.y).toBeLessThan(50); // Should be near the top edge
//   expect(boundingBox?.width).toBeCloseTo(400, 4); // Allowing small variation
//   expect(boundingBox?.height).toBeCloseTo(33.6, 1); // Allowing small variation

//   await page.waitForTimeout(3000);
//   await expect(toast).not.toBeVisible();
// });

// test

test('fill out the form', async ({ page }) => {
  const navigateTo = new NavigationPage(page);
  const onToastrPage = new ToastrPage(page);

  await navigateTo.toastrPage();
  await onToastrPage.showDesiredToastr('top-left', 'TEST TITLE', 'HELLO WORLD', 4000);
});
