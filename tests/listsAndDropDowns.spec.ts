import { test, expect } from '@playwright/test';
import { type } from 'os';

test.beforeEach( async({page}) => {
  await page.goto('/')
})

test('Test Case 1: Validate selected pet types from the list', async ({page}) => {
    await page.getByText('Owners').click()
    await page.getByText('Search').click()
    await expect(page.getByRole('heading')).toHaveText('Owners')
    await page.getByRole('link', { name: 'George Franklin' }).click();
    await expect(page.locator('.ownerFullName')).toHaveText('George Franklin')
    await page.locator('dl', { hasText: 'Leo' }).getByRole('button', { name: 'Edit Pet' }).click();
    await expect(page.getByRole('heading')).toHaveText('Pet')
    await expect(page.locator('#owner_name')).toHaveValue('George Franklin');
    await expect(page.locator('#type')).toHaveValue('cat');

    const dropDownMenu = page.locator('#type');
    await dropDownMenu.click();
    const petTypeValues = ['cat', 'dog', 'lizard', 'snake', 'bird', 'hamster'];
    for (const value of petTypeValues) {
        await dropDownMenu.selectOption(value);
        await expect(dropDownMenu).toHaveValue(value);
    }

})


test('Test Case 2: Validate the pet type update', async ({page}) => {
    await page.getByText('Owners').click()
    await page.getByText('Search').click()
    await expect(page.getByRole('heading')).toHaveText('Owners')
    await page.getByRole('link', { name: 'Eduardo Rodriquez' }).click();
    await page.locator('dl', { hasText: 'Rosy' }).getByRole('button', { name: 'Edit Pet' }).click();
    await expect(page.getByLabel('name')).toHaveValue('Rosy');
    await expect(page.getByLabel('Type')).toHaveValue('dog');
    const dropDownMenu = page.locator('#type');
    await dropDownMenu.selectOption('bird');
    await expect(page.locator('#type')).toHaveValue('bird');
    const optionList = dropDownMenu.locator('option');
    await expect(optionList).toContainText(["bird"]);
    await page.getByRole('button', { name: 'Update Pet' }).click();
    await page.locator('dl', { hasText: 'Rosy' }).getByRole('button', { name: 'Edit Pet' }).click();
    await expect(page.getByLabel('Type')).toHaveValue('bird');
    await dropDownMenu.selectOption('dog');
    await expect(page.locator('#type')).toHaveValue('dog');
    await page.getByRole('button', { name: 'Update Pet' }).click();

})


