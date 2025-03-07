import { test, expect } from '@playwright/test';
import { NavigationPage } from '../POM/navigationPages';
import { FormLayoutsPage } from '../POM/formLayoutsPage';
import { faker } from '@faker-js/faker';
import { argosScreenshot } from '@argos-ci/playwright';

// changes browser window resolution for all tests in this file
// test.use({ viewport: { width: 1920, height: 1080 } }); // a or run with chromiumFullSize project

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.only('Fill in the "Inline From"', { tag: ['@formsPage', '@inLineForm'] }, async ({ page }) => {
  const navigateTo = new NavigationPage(page);
  const onFormLayoutsPage = new FormLayoutsPage(page);
  const randomFullName = faker.person.fullName();
  const randomUserEmail = `${randomFullName.replace(' ', '')}${faker.number.int({ min: 10, max: 20 })}@test.com`;

  await navigateTo.formLayoutsPage();
  await argosScreenshot(page, 'form Layouts page');

  await onFormLayoutsPage.submitInlineFormWithCreds(randomFullName, randomUserEmail, true);
  await argosScreenshot(page, 'using the Inline form');
});

test('Fill in the "Usinng the Grid" form', { tag: ['@formsPage', '@usingTheGridForm'] }, async ({ page }) => {
  const navigateTo = new NavigationPage(page);
  const onFormLayoutsPage = new FormLayoutsPage(page);

  await navigateTo.formLayoutsPage();
  await onFormLayoutsPage.submitUsingTheGridFormWithCredsAndRadio(
    process.env.USEREMAIL,
    process.env.USERPASSWORD,
    'Option 1'
  );
  //await onFormLayoutsPage.submitUsingTheGridFormWithCredsAndRadio('Test@test2.com', 'Password1234', 'Option 2');
});
