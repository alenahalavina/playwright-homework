import { test, expect } from '@playwright/test';

test.beforeEach( async({page}) => {
  await page.goto('/')
})

test('Test Case 1: Update pet type', async ({page}) => {
    await page.getByText('PET TYPES').click()
    await expect(page.locator('h2')).toHaveText('Pet Types')
    
    // Edit pet type from 'cat' to 'rabbit' and back to 'cat'
    await page.locator('tr').nth(1).getByRole('button', { name: 'Edit' }).click();
    await page.waitForLoadState('networkidle'); 
    await expect(page.locator('h2')).toHaveText('Edit Pet Type');
    await page.locator('#name').fill('rabbit');
    await page.getByRole('button', { name: 'Update' }).click();
    expect(await page.locator('tr input').nth(0).inputValue()).toEqual('rabbit');

    // Edit pet type back to 'cat'
    await page.locator('tr').nth(1).getByRole('button', { name: 'Edit' }).click();
    await page.waitForTimeout(1000)
    await page.waitForLoadState('networkidle'); 
    await page.locator('#name').fill('cat');
    await page.getByRole('button', { name: 'Update' }).click();
    expect(await page.locator('tr input').nth(0).inputValue()).toEqual('cat');

});

test('Test Case 2: Cancel pet type update', async ({page}) => {
    await page.getByText('PET TYPES').click()
    const PetTypes = page.locator('h2')
    await expect(PetTypes).toHaveText('Pet Types')
    
    // Edit pet type from 'dog' to 'moose' and cancel
    await page.locator('tr').nth(2).getByRole('button', { name: 'Edit' }).click();
    await page.waitForLoadState('networkidle'); 
    await expect(page.locator('h2')).toHaveText('Edit Pet Type');
    await page.locator('#name').fill('moose'); 
    expect(await page.locator('#name').inputValue()).toEqual('moose'); // Verify input value before cancelling
    await page.getByRole('button', { name: 'Cancel' }).click(); // Cancel the update
    expect(await page.locator('tr input').nth(1).inputValue()).toEqual('dog'); // Verify that the pet type remains unchanged
    
});


test('Test Case 3: Pet type name is required validation', async ({page}) => {
  await page.getByText('PET TYPES').click()
    const petTypeHeader = page.locator('h2')
    await expect(petTypeHeader).toHaveText('Pet Types')
    
    // Edit pet type to empty name to check validation
    await page.locator('tr').nth(3).getByRole('button', { name: 'Edit' }).click();

    await page.waitForTimeout(1000)  
    await page.waitForLoadState('networkidle');

    await page.locator('#name').clear()
    await page.getByText('Name is required').isVisible();
    await page.getByRole('button', { name: 'Update' }).click();
    await expect(page.locator('h2')).toHaveText('Edit Pet Type');
    await page.getByRole('button', { name: 'Cancel' }).click();
    await expect(page.locator('h2')).toHaveText('Pet Types')

});