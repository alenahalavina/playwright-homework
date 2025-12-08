import { test, expect } from '@playwright/test';
import { type } from 'os';

test.beforeEach( async({page}) => {
  await page.goto('/')
})

test('Test Case: Add and delete pet type', async ({page}) => {
await page.getByText('PET TYPES').click()
await expect(page.getByRole('heading')).toHaveText('Pet Types')
await page.getByRole('button', { name: 'Add' }).click();
await expect(page.getByRole('heading', { name: 'New Pet Type' })).toBeVisible();
await expect(page.locator('form').locator('label').filter({ hasText: 'Name' })).toBeVisible();
await expect(page.locator('#name')).toBeVisible();
await page.locator('#name').fill('pig');
await page.getByRole('button', { name: 'Save' }).click();
const petTypes = page.locator('input[name="pettype_name"]');
await expect(petTypes.last()).toHaveValue('pig');

page.on('dialog', dialog => {
    dialog.accept()
});

await page.locator('table tr').last().getByRole('button', { name: 'Delete' }).click();
await expect(petTypes.last()).not.toHaveValue('pig');

})


