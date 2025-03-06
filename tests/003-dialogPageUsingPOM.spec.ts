import { test, expect } from '@playwright/test';
import { NavigationPage } from '../POM/navigationPages';
import { DialogsPage } from '../POM/dialogPage';

test.use({ viewport: { width: 1920, height: 1080 } });

test.describe('Open Dialog Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Dialog With Component', async ({ page }) => {
    // nav to page
    const navigateTo = new NavigationPage(page);
    const onDialogPage = new DialogsPage(page);

    await navigateTo.dialogPage();
    await onDialogPage.openTheDialogWithComponents();
  });

  test('Dialog With Template', async ({ page }) => {
    const navigateTo = new NavigationPage(page);
    const onDialogPage = new DialogsPage(page);

    await navigateTo.dialogPage();
    await onDialogPage.openTheDialogWithTemplate();
    await onDialogPage.closeTheDialogWithTemplate();
  });

  ///test("", async({page}) => {})
});
