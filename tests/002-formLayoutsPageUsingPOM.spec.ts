import { test, expect } from '@playwright/test';
import { NavigationPage } from '../POM/navigationPages';
import { FormLayoutsPage } from '../POM/formLayoutsPage';
import { faker } from '@faker-js/faker';

// changes browser window resolution for all tests in this file
// test.use({ viewport: { width: 1920, height: 1080 } }); // or run with chromiumFullSize project

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.only('Fill in the "Inline From"', { tag: ['@formsPage', '@inLineForm'] }, async ({ page }) => {
  const navigateTo = new NavigationPage(page);
  const onFormLayoutsPage = new FormLayoutsPage(page);
  const randomFullName = faker.person.fullName();
  const randomUserEmail = `${randomFullName.replace(' ', '')}${faker.number.int({ min: 10, max: 20 })}@test.com`;

  await navigateTo.formLayoutsPage();
  await page.waitForTimeout(500); // need to wait until resources are loaded
  // await page.waitForLoadState('load'); // doesn't work for this app
  await page.screenshot({ path: 'screenshots/FormsPage.png' });
  await onFormLayoutsPage.submitInlineFormWithCreds(randomFullName, randomUserEmail, true);
  await page.locator('nb-card', { hasText: 'Inline form' }).screenshot({ path: 'screenshots/InlineForm.png' });
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

test('Fill in the - Form without Labels - ', { tag: ['@formsPage', '@withoutLabelsForm'] }, async ({ page }) => {
  const navigateTo = new NavigationPage(page);
  const onFormLayoutsPage = new FormLayoutsPage(page);

  await navigateTo.formLayoutsPage();
  await onFormLayoutsPage.submitFormWithoutLabelsWithInfoAndText(
    'Sponsor',
    'TestUserName1',
    'Text generated by lorem ipsum textgen',
    200
  );
});

test('Fill in the "Horizontal form" ', { tag: ['@formsPage', '@horizontalForm'] }, async ({ page }) => {
  const navigateTo = new NavigationPage(page);
  const onFormLayoutsPage = new FormLayoutsPage(page);

  await navigateTo.formLayoutsPage();
  await onFormLayoutsPage.sumbitHorizontalFormWithCreds('TestEmail1@test.com', 'PasswordTest1', false);
});

test('Fill in the "Basic form" ', { tag: ['@formsPage', '@basicForm'] }, async ({ page }) => {
  const navigateTo = new NavigationPage(page);
  const onFormLayoutsPage = new FormLayoutsPage(page);

  await navigateTo.formLayoutsPage();
  await onFormLayoutsPage.submitTheBasicFormWithCreds('TestEmail2@test.com', 'PasswordTest2', true);
});

test('Fill in the "Block form" ', { tag: ['@formsPage', '@blockForm'] }, async ({ page }) => {
  const navigateTo = new NavigationPage(page);
  const onFormLayoutsPage = new FormLayoutsPage(page);

  await navigateTo.formLayoutsPage();
  await onFormLayoutsPage.submitBlockFormWithInfo(
    'John',
    'Doe',
    'TestEmail2@test.com',
    'http://localhost:4200/pages/forms/layouts'
  );
});
