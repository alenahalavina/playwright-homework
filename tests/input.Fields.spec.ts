import { test, expect } from '@playwright/test';

test.beforeEach( async({page}) => {
  await page.goto('/')
})

test('Test Case 1: Update pet type', async ({page}) => {
    await page.getByTitle('pettypes').click()
    await expect(page.getByRole('heading')).toHaveText('Pet Types')

    // Edit pet type from 'cat' to 'rabbit'
    await page.getByRole('button', { name: 'Edit' }).first().click(); // Select first pet type (cat)
    await expect(page.getByRole('textbox')).toHaveValue('cat'); // Verify current value is 'cat'
    await page.getByRole('textbox').fill('rabbit'); // Change to 'rabbit'
    await page.getByRole('button', { name: 'Update' }).click(); // Save the update
    await expect(page.locator('[id="0"]')).toHaveValue('rabbit'); // Verify that the pet type has been updated to 'rabbit'

    // Edit pet type back to 'cat'
    await page.getByRole('button', { name: 'Edit' }).first().click(); // Select first pet type (cat)
    await expect(page.getByRole('textbox')).toHaveValue('rabbit'); // Verify current value is 'rabbit'
    await page.getByRole('textbox').fill('cat'); // Change back to 'cat'
    await page.getByRole('button', { name: 'Update' }).click(); // Save the update
    await expect(page.locator('[id="0"]')).toHaveValue('cat'); // Verify that the pet type has been updated to 'cat'
});

test('Test Case 2: Cancel pet type update', async ({page}) => {
    await page.getByTitle('pettypes').click()
    await expect(page.getByRole('heading')).toHaveText('Pet Types') 

    // Edit pet type from 'dog' to 'moose' and cancel
    await page.getByRole('button', { name: 'Edit' }).nth(1).click(); // Select second pet type (dog)
    await expect(page.getByRole('heading')).toHaveText('Edit Pet Type'); 
    await expect(page.getByRole('textbox')).toHaveValue('dog'); // Verify current value is 'dog'
    await page.getByRole('textbox').fill('moose'); // Change to 'moose'
    await expect(page.locator('[id="name"]')).toHaveValue('moose'); // Verify that the input field has 'moose'
    await page.getByRole('button', { name: 'Cancel' }).click(); // Cancel the update
    await expect(page.locator('[id="1"]')).toHaveValue('dog'); // Verify that the pet type remains 'dog'
    
});


test('Test Case 3: Pet type name is required validation', async ({page}) => {

  test.slow();
    await page.getByText('PET TYPES').click()
    await expect(page.getByRole('heading')).toHaveText('Pet Types')
    
    // Edit pet type to empty name to check validation
    await page.getByRole('button', { name: 'Edit' }).nth(2).click(); // Select third pet type (lizard)
    await expect(page.getByRole('textbox')).toHaveValue('lizard');  // Verify current value is 'lizard'
    await page.getByRole('textbox').clear()
    await expect(page.locator('.help-block')).toHaveText('Name is required'); // Verify validation message
    await page.getByRole('button', { name: 'Update' }).click();
    await expect(page.getByRole('heading')).toHaveText('Edit Pet Type');
    await page.getByRole('button', { name: 'Cancel' }).click();
    await expect(page.getByRole('heading')).toHaveText('Pet Types')

});