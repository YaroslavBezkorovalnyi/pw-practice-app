import { Page, expect } from '@playwright/test';

export class FormLayoutsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // 1

  /**
   * * This method fill out the "Inline form"
   * @param userName - (String) must contain User's name
   * @param userEmail - (String) must contain User's email
   * @param rememberMe - - (Boolean) must be true/false
   */

  async submitInlineFormWithCreds(userName: string, userEmail: string, rememberMe: boolean) {
    // Variables
    const inlineForm = this.page.locator('nb-card', { hasText: 'Inline form' });

    // Action Logic
    await inlineForm.getByPlaceholder('Jane Doe').fill(userName);
    await inlineForm.getByPlaceholder('Email').fill(userEmail);
    if (rememberMe) await inlineForm.getByRole('checkbox').check({ force: true });
    await inlineForm.getByRole('button').click();

    // Assertions
    await expect(inlineForm.getByPlaceholder('Jane Doe')).toHaveValue(userName);
    await expect(inlineForm.getByPlaceholder('Email')).toHaveValue(userEmail);
    if (rememberMe) {
      await expect(inlineForm.getByRole('checkbox')).toBeChecked();
    } else {
      await expect(inlineForm.getByRole('checkbox')).not.toBeChecked();
    }
  }
  // ? Used in this (above) method:
  // ? getByPlaceholder()
  // ? getByTestId()
  // ? toHaveValue()
  // ? toBeChecked()
  // ? not.toBeChecked()

  // 2

  /**
   * * This method fill out the "Using the Grid" form with User's details
   * @param userEmail - (String) must contain user email
   * @param userPassword - (String) must contain user password
   * @param option - (String) must contain "Option 1" or "Option 2"
   */

  async submitUsingTheGridFormWithCredsAndRadio(userEmail: string, userPassword: string, option: string) {
    // Variables
    const gridForm = this.page.locator('nb-card', { hasText: 'Using the Grid' });

    // Action logic
    await gridForm.getByPlaceholder('Email').fill(userEmail);
    await gridForm.getByPlaceholder('Password').fill(userPassword);
    if (option == 'Option 1') {
      await gridForm.getByLabel('Option 1').check({ force: true });
    } else if (option == 'Option 2') {
      await gridForm.getByLabel('Option 2').check({ force: true });
    }
    await gridForm.getByTestId('SignIn').click();

    // Assertions
    await expect(gridForm.getByPlaceholder('Email')).toHaveValue(userEmail);
    await expect(gridForm.getByPlaceholder('Password')).toHaveValue(userPassword);

    if (option === 'Option 1') {
      await expect(gridForm.getByLabel('Option 1')).toBeChecked();
      await expect(gridForm.getByLabel('Option 2')).not.toBeChecked();
    } else if (option === 'Option 2') {
      await expect(gridForm.getByLabel('Option 2')).toBeChecked();
      await expect(gridForm.getByLabel('Option 1')).not.toBeChecked();
    } // else { throw new Error('Option is not defined')}
  }
  // ? Used in this (above) method:
  // ? getByPlaceholder()
  // ? getByRole()
  // ? getByLabel()
  // ? getByTestId()
  // ? toHaveValue()
  // ? toBeChecked()
  // ? not.toBeChecked()

  // 3

  /**
   * * This method fills out the "Form without labels"
   * @param recepints - (String) must contain recepint
   * @param subject - (String) must contain subject
   * @param messageText - (String) - must contain message text
   * @param messageBoxHeight - (Number) must contain number(px) that will be applied to message window
   */

  async submitFormWithoutLabelsWithInfoAndText(
    recepints: string,
    subject: string,
    messageText: string,
    messageBoxHeight: number
  ) {
    // Variables
    const formWithoutLabels = this.page.locator('nb-card', { hasText: 'Form without labels' });
    const horizontalForm = this.page.locator('nb-card', { hasText: 'Horizontal Form' });

    // Action Logic
    await horizontalForm.scrollIntoViewIfNeeded();
    await formWithoutLabels.getByPlaceholder('Recipients').fill(recepints);
    await formWithoutLabels.getByPlaceholder('Subject').fill(subject);
    await formWithoutLabels.getByPlaceholder('Message').evaluate((el, height) => {
      el.setAttribute('style', `height: ${height}px;`);
    }, messageBoxHeight);
    await formWithoutLabels.getByPlaceholder('Message').fill(messageText);

    // Assertions
    await expect(formWithoutLabels.getByPlaceholder('Recipient')).toHaveValue(recepints);
    await expect(formWithoutLabels.getByPlaceholder('Subject')).toHaveValue(subject);
    await expect(formWithoutLabels.getByPlaceholder('Message')).toHaveCSS('height', `${messageBoxHeight}px`);
    await expect(formWithoutLabels.getByPlaceholder('Message')).toHaveValue(messageText);

    // Final Action
    await formWithoutLabels.getByRole('button').click();
  }
  // ? Used in this (above) method:
  // ? getByPlaceholder()
  // ? scrollIntoViewIfNeeded();
  // ? evaluate()
  // ? setAttribute()
  // ? toHaveValue()
  // ? toHaveCSS()

  // 4
  /**
   * * This method fills out the "Horizontal form"
   * @param userEmail - (String) must containn User's email
   * @param userPassword - (String) must containn User's password
   * @param rememberMe - (Boolean) must be true/false to check/uncheck the checkbox
   */

  async sumbitHorizontalFormWithCreds(userEmail: string, userPassword: string, rememberMe: boolean) {
    // Variables
    const horizontalForm = this.page.locator('nb-card', { hasText: 'Horizontal Form' });

    //Action Logic
    await horizontalForm.scrollIntoViewIfNeeded();
    await horizontalForm.locator('#inputEmail3').fill(userEmail);
    await horizontalForm.locator('#inputPassword3').fill(userPassword);
    if (rememberMe) await horizontalForm.getByLabel('Remember me').check({ force: true });
    await horizontalForm.getByText('Sign in').click();

    //Assetions
    await expect(horizontalForm.locator('#inputEmail3')).toHaveValue(userEmail);
    await expect(horizontalForm.locator('#inputPassword3')).toHaveValue(userPassword);
    if (rememberMe) {
      await expect(horizontalForm.getByRole('checkbox')).toBeChecked();
    } else {
      await expect(horizontalForm.getByRole('checkbox')).not.toBeChecked();
    }
  }
  // ? Used in this (above) method:
  // ? scrollIntoViewIfNeeded()
  // ? getByLabel()
  // ? getByText()

  // 5

  /**
   * * This method fills out the "Basic form"
   * @param userEmail - (String) must contain User's email
   * @param userPassword - (String) must contain User's password
   * @param checkMeOut - (Boolean) must be true/faalse
   */

  async submitTheBasicFormWithCreds(userEmail: string, userPassword: string, checkMeOut: boolean) {
    // Variables
    const basicForm = this.page.locator('nb-card', { hasText: 'Basic form' });
    const emailInBasicForm = basicForm.getByLabel('Email address');
    const passwordInBasicForm = basicForm.getByRole('textbox', { name: 'Password' });
    const checkBoxInBasicForm = basicForm.getByText('Check me out');
    const submitBtnInBasicForm = basicForm.locator('[status="danger"]');

    //Action Logic
    await emailInBasicForm.fill(userEmail);
    await passwordInBasicForm.fill(userPassword);
    if (checkMeOut == true) {
      await checkBoxInBasicForm.check({ force: true });
    } else {
      await checkBoxInBasicForm.uncheck({ force: true });
    }
    await submitBtnInBasicForm.click();

    // Assertions
    await expect(emailInBasicForm).toHaveValue(userEmail);
    await expect(passwordInBasicForm).toHaveValue(userPassword);
    if (checkMeOut) await expect(checkBoxInBasicForm).toBeChecked();
    if (!checkMeOut) await expect(checkBoxInBasicForm).not.toBeChecked();
  }
  // ? Used in this (above) method:
  // ? getByRole()
  // ? getByLabel()
  // ? getByText()
  // ? toHaveValue()
  // ? toBeChecked() / not.toBeChecked()

  // 6

  /**
   * * This method fills out the "Block form"
   * @param firstName - (String) requires the first name
   * @param lastName - (String) requires the last name
   * @param email - (String) requires email
   * @param websiteURL - (String) requires URL
   */

  async submitBlockFormWithInfo(firstName: string, lastName: string, email: string, websiteURL: string) {
    // Variables
    const blockForm = this.page.locator('nb-card', { hasText: 'Block form' });

    //Action Logic
    await blockForm.scrollIntoViewIfNeeded();
    await blockForm.getByLabel('First Name').fill(firstName);
    await blockForm.getByPlaceholder('Last Name').fill(lastName);
    await blockForm.locator('#inputEmail').fill(email);
    await blockForm.getByRole('textbox', { name: 'WebSite' }).fill(websiteURL);
    await blockForm.getByText('Submit').click();

    //Assetions
    await expect(blockForm.getByLabel('First Name')).toHaveValue(firstName);
    await expect(blockForm.getByPlaceholder('Last Name')).toHaveValue(lastName);
    await expect(blockForm.locator('#inputEmail')).toHaveValue(email);
    await expect(blockForm.getByRole('textbox', { name: 'WebSite' })).toHaveValue(websiteURL);
  }
  // ? Used in this (above) method:
  // ? scrollIntoViewIfNeeded();
  // ? getByLabel()
  // ? getByPlaceholder()
  // ? locator(byId)
  // ? getByRole()
  // ? getByRText()
  // ? toHaveValue
}
