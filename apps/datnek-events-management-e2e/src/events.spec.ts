import { test, expect } from '@playwright/test';

// Flow to test CRUD operations of events
test.describe("events crud flow", () => {

  test.beforeEach(async ({page}) => {
    // Go to the starting url before each test.
    await page.goto('/');
  });

  test('has card with input `Quoi de neuf ?` and should open modal on click', async ({ page }) => {
    const inputElement = page.locator('.card input[placeholder="Quoi de neuf ?"]');

    await expect(inputElement).toBeVisible();

    // Event Modal should open after click
    await inputElement.click();

    const modalElement = page.locator('#eventModal');
    await expect(modalElement).toBeVisible();
  });



});
