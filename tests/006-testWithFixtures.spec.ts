import { test } from '../test-options';
import { FormLayoutsPage } from '../POM/formLayoutsPage';
import { faker, tr } from '@faker-js/faker';

// test.use({ viewport: { width: 1920, height: 1080 } });

// here I use :
// fixture that havigate user to a certain page
// methods created using POM
// faker lib that allows to generate random data

test('Fill in the "Inline From"', async ({ page, formLayoutPageFixture }) => {
  const onFormLayoutsPage = new FormLayoutsPage(page);

  const randomFullName = faker.person.fullName();
  const randomUserEmail = `${randomFullName.replace(' ', '')}${faker.number.int({ min: 10, max: 20 })}@test.com`;

  // fill out form using random data
  await onFormLayoutsPage.submitInlineFormWithCreds(randomFullName, randomUserEmail, true);
  // fill out form using typed data
  await onFormLayoutsPage.submitUsingTheGridFormWithCredsAndRadio('Test@test.com', 'PassW1', 'Option 1');
  //fill out form using process env variables
  await onFormLayoutsPage.submitTheBasicFormWithCreds(process.env.USEREMAIL, process.env.USERPASSWORD, true);
});
