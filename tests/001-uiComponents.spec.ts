import { core } from '@angular/compiler';
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200/');
});

test.describe('Work with Input field & Radio button', () => {
  test.beforeEach(async ({ page }) => {
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();
  });
  //8
  test('Work with Input Field-', async ({ page }) => {
    const gridEmailInput = page.locator('nb-card', { hasText: 'Using the Grid' }).getByPlaceholder('Email');

    await gridEmailInput.fill('test@test.com');
    await gridEmailInput.clear();
    await gridEmailInput.pressSequentially('test@2test.com', { delay: 250 });

    // generic assertion
    const inputValue = await gridEmailInput.inputValue();
    expect(inputValue).toEqual('test@2test.com');

    // locator assetion
    await expect(gridEmailInput).toHaveValue('test@2test.com');
  });

  test('Work with Radio Button', async ({ page }) => {
    const theGridForm = page.locator('nb-card', { hasText: 'Using the Grid' });

    // * Option 1 - getByText

    // await theGridForm.getByText("Option 1").check();

    // * Option 2 - getByLabel

    // await theGridForm.getByLabel("Option 1").check({ force: true });

    // * Option 3 - getByRole
    await theGridForm.getByRole('radio', { name: 'Option 1' }).check({ force: true });

    // ? Assertion (generic)
    const radioButtonStatus = await theGridForm.getByRole('radio', { name: 'Option 1' }).isChecked(); // returns boolean

    expect(radioButtonStatus).toBeTruthy();

    // ? Asserion (locator)
    await expect(theGridForm.getByRole('radio', { name: 'Option 1' })).toBeChecked();

    // check 2nd radio and verify the status of the 1st one

    await theGridForm.getByRole('radio', { name: 'Option 2' }).check({ force: true });
    expect(await theGridForm.getByRole('radio', { name: 'Option 1' }).isChecked()).toBeFalsy();
    expect(await theGridForm.getByRole('radio', { name: 'Option 2' }).isChecked()).toBeTruthy();
  });
});

test('Work With Checkbox', async ({ page }) => {
  // nav to page
  await page.getByText('Modal & Overlays').click();
  await page.getByText('Toastr').click();

  //single check box check/uncheck
  await page.getByRole('checkbox', { name: 'Hide on click' }).uncheck({ force: true });
  await page.getByRole('checkbox', { name: 'Prevent arising of duplicate toast' }).check({ force: true });

  //multiple checkboxes check/uncheck
  const allCheckBoxes = page.getByRole('checkbox');
  for (const box of await allCheckBoxes.all()) {
    await box.uncheck({ force: true });
    expect(await box.isChecked()).toBeFalsy();
  }
});

test('Work with List and DropDown', async ({ page }) => {
  // * Expand Theme drop down
  const dropDownMenu = page.locator('ngx-header nb-select');
  await dropDownMenu.click();

  // page.getByRole("list"); // if list has a UL tag
  // page.getByRole("listitem"); // if list has LI tag

  // * Get theme list
  const optionList = page.locator('nb-option-list nb-option');
  await expect(optionList).toHaveText(['Light', 'Dark', 'Cosmic', 'Corporate']);

  // * Get page header
  const header = page.locator('nb-layout-header');

  // * check 1 theme
  // await optionList.filter({ hasText: "Cosmic" }).click();
  // await expect(header).toHaveCSS("background-color", "rgb(50, 50, 89)");

  // * check all themes 1 by 1
  const colors = {
    Light: 'rgb(255, 255, 255)',
    Dark: 'rgb(34, 43, 69)',
    Cosmic: 'rgb(50, 50, 89)',
    Corporate: 'rgb(255, 255, 255)',
  };

  for (const color in colors) {
    await optionList.filter({ hasText: color }).click();
    await expect(header).toHaveCSS('background-color', colors[color]);
    if (color != 'Corporate') await dropDownMenu.click();
  }
});

test('Work with Tooltip', async ({ page }) => {
  // * nav to page
  await page.getByText('Modal & Overlays').click();
  await page.getByText('Tooltip').click();

  // * get form containing buttons with tooltip
  const tooltipCard = page.locator('nb-card', { hasText: 'Tooltip Placements' });

  // * get button and hover to invoke tooltip

  // option 1
  // await tooltipCard.getByRole("button", { name: "TOP" }).hover();

  // option 2
  await tooltipCard.getByText('TOP').hover();

  // option 3
  // page.getByRole("tooltip"); // works if there is an appropriate role

  // * Assertion
  const toolTip = await page.locator('nb-tooltip').textContent();
  expect(toolTip).toEqual('This is a tooltip');
});

test('Work with Browser Dialog Box', async ({ page }) => {
  // nav to page
  await page.getByText('Tables & Data').click();
  await page.getByText('Smart Table').click();

  // catch browser dialog box
  page.on('dialog', (dialog) => {
    expect(dialog.message()).toEqual('Are you sure you want to delete?');
    dialog.accept();
  });

  // select row and click delete
  await page.getByRole('table').locator('tr', { hasText: 'mdo@gmail.com' }).locator('.nb-trash').click();

  // Assertion
  await expect(page.locator('table tr').first()).not.toHaveText('mdo@gmail.com');
});

test.describe('Work with Table', () => {
  test.beforeEach(async ({ page }) => {
    // nav to page
    await page.getByText('Tables & Data').click();
    await page.getByText('Smart Table').click();
  });

  test('Edit Value of the parameter in the table 1', async ({ page }) => {
    //Get the row by any text in that row and edit the value in one of the columns
    const targetRow = page.getByRole('row', { name: 'twitter@outlook.com' });
    await targetRow.locator('.nb-edit').click();

    await page.locator('input-editor').getByPlaceholder('Age').clear();
    await page.locator('input-editor').getByPlaceholder('Age').fill('35');
    await page.locator('.nb-checkmark').click();
  });

  test('Edit Value of a parameter in the table 2', async ({ page }) => {
    //Get the row by the value in a specific column
    await page.locator('.ng2-smart-pagination-nav').getByText('2').click();

    const targetRowById = page
      .getByRole('row', { name: '11' })
      .filter({ has: page.locator('td').nth(1).getByText('11') });
    await targetRowById.locator('.nb-edit').click();
    await page.locator('input-editor').getByPlaceholder('E-mail').clear();
    await page.locator('input-editor').getByPlaceholder('E-mail').fill('test@test.com');
    await page.locator('.nb-checkmark').click();

    await expect(targetRowById.locator('td').nth(5)).toHaveText('test@test.com');
  });

  test('Filter elements in the table using own dataset', async ({ page }) => {
    const ages = ['20', '30', '40', '200'];

    for (let age of ages) {
      await page.locator('input-filter').getByPlaceholder('Age').clear();
      await page.locator('input-filter').getByPlaceholder('Age').fill(age);
      await page.waitForTimeout(500);

      const ageRows = page.locator('tbody tr');
      for (let row of await ageRows.all()) {
        const cellValue = await row.locator('td').last().textContent();

        if (age == '200') {
          expect(await page.getByRole('table').textContent()).toContain('No data found');
        } else {
          expect(cellValue).toEqual(age);
        }
      }
    }
  });
});

test('Work with Datepicker', async ({ page }) => {
  // nav to page
  await page.getByText('Forms').click();
  await page.getByText('Datepicker').click();

  // expand calendar
  const calendarInputField = page.getByPlaceholder('Form Picker');
  await calendarInputField.click();

  // select a date
  let date = new Date();
  date.setDate(date.getDate() + 7);
  const expectedDate = date.getDate().toString();

  const expectedMonthShort = date.toLocaleString('En-US', { month: 'short' });
  const expectedMonthLong = date.toLocaleString('En-US', { month: 'long' });
  const expectedYear = date.getFullYear();
  const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`;

  let calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent();
  const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}`;

  while (!calendarMonthAndYear.includes(expectedMonthAndYear)) {
    await page.locator("nb-calendar-pageable-navigation [data-name='chevron-right']").click();
    calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent();
  }

  const currentMonthInCalendar = page.locator('[class="day-cell ng-star-inserted"]');
  await currentMonthInCalendar.getByText(expectedDate, { exact: true }).click();

  // Assertion
  await expect(calendarInputField).toHaveValue(dateToAssert);
});

test.describe('Work with Slider', () => {
  test('Option1: Update attribute', async ({ page }) => {
    const tempGauge = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle');
    await tempGauge.evaluate((node) => {
      node.setAttribute('cx', '9');
      node.setAttribute('cy', '140');
    });
    await tempGauge.click();
    await expect(page.locator('.slider-value-container .value.temperature.h1')).toHaveText('15');
  });

  test('Option2: Mouse movement', async ({ page }) => {
    // get form
    const tempBox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger');
    await tempBox.scrollIntoViewIfNeeded();

    // move mause
    const box = await tempBox.boundingBox();
    const x = box.x + box.width / 2;
    const y = box.y + box.height / 2;
    await page.mouse.move(x, y);
    await page.mouse.down();
    await page.mouse.move(x + 100, y);
    await page.mouse.move(x + 100, y + 120);
    await page.mouse.up();

    // Assetion
    await expect(tempBox).toContainText('30');
  });
});
