import {
  Given,
  When,
  Then,
  Before,
  After
} from '@cucumber/cucumber';

import { chromium, Browser, Page, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

let browser: Browser;
let page: Page;

// Read JSON data
const filePath = join(__dirname, '..', 'testData', 'googleData.json');

const testData = JSON.parse(
  readFileSync(filePath, 'utf-8')
);

// Launch browser
Before(async function () {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
});

// Close browser
After(async function () {
  await browser?.close();
});

// Navigate to contact page
Given('I navigate to the Contact Us page', async function () {
  await page.goto(
    'https://www.webdriveruniversity.com/Contact-Us/contactus.html'
  );
});

// Fill form using JSON
When(
  'I fill the contact form using {string} data',
  async function (dataKey: string) {

    const data = testData[dataKey];

    if (!data) {
      throw new Error(`Test data not found: ${dataKey}`);
    }

    await page.locator('input[name="first_name"]')
      .fill(data.firstName);

    await page.locator('input[name="last_name"]')
      .fill(data.lastName);

    await page.locator('input[name="email"]')
      .fill(data.email);

    await page.locator('textarea[name="message"]')
      .fill(data.comments);
  }
);

// Submit form
When('I click the Submit button', async function () {
  await page.locator('input[type="submit"]').click();
});

// Validate successful submission
Then(
  'I should see the contact form success message',
  async function () {
    await expect(
      page.getByText('Thank You for your Message!')
    ).toBeVisible();
  }
);

// Validate unsuccessful submission
Then(
  'I should see a contact form validation error',
  async function () {
    await expect(
      page.getByText(/Error:|Invalid email address/i)
    ).toBeVisible();
  }
);