import { test, expect } from '@playwright/test';

test.beforeEach( async({page}) => {
  await page.goto('/')
})

test('Test Case 1: Validate selected pet types from the list', async ({page}) => {
    await page.getByText('Owners').click()
    await page.getByText('Search').click()
    await expect(page.getByRole('heading')).toHaveText('Owners')
    await page.getByRole('link', { name: 'George Franklin' }).click();
    await expect(page.locator('.ownerFullName')).toHaveText('George Franklin')
    await page.locator('app-pet-list', { hasText: 'Leo' }).getByRole('button', { name: 'Edit Pet' }).click();
    await expect(page.getByRole('heading')).toHaveText('Pet')
    await expect(page.locator('#owner_name')).toHaveValue('George Franklin');
    await expect(page.locator('#type1')).toHaveValue('cat');

    const petTypeDropDown = page.locator('#type');
    await petTypeDropDown.click();
    
    const petTypeValues = await petTypeDropDown.locator('option').allTextContents();
    for (const value of petTypeValues) {
    await petTypeDropDown.selectOption(value);
    await expect(page.locator('#type1')).toHaveValue(value);
}

})


test('Test Case 2: Validate the pet type update', async ({page}) => {
    await page.getByText('Owners').click()
    await page.getByText('Search').click()
    await expect(page.getByRole('heading')).toHaveText('Owners')
    await page.getByRole('link', { name: 'Eduardo Rodriquez' }).click();
    await page.locator('app-pet-list', { hasText: 'Rosy' }).getByRole('button', { name: 'Edit Pet' }).click();
    await expect(page.getByLabel('name')).toHaveValue('Rosy');
    await expect(page.getByLabel('type')).toHaveValue('dog');
    const dropDownMenu = page.locator('#type');
    await dropDownMenu.selectOption('bird');
    await expect(page.locator('#type1')).toHaveValue('bird');
    await expect(page.locator('#type')).toHaveValue('bird');
    await page.getByRole('button', { name: 'Update Pet' }).click();
    await expect(page.locator('app-pet-list', { hasText: 'Rosy' }).locator('dd').last()).toHaveText('bird');
    await page.locator('app-pet-list', { hasText: 'Rosy' }).getByRole('button', { name: 'Edit Pet' }).click();
    await expect(page.getByLabel('type')).toHaveValue('bird');
    await dropDownMenu.selectOption('dog');
    await expect(page.locator('#type')).toHaveValue('dog');
    await page.getByRole('button', { name: 'Update Pet' }).click();
    

})


