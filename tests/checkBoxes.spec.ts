import { test, expect } from '@playwright/test';

test.beforeEach( async({page}) => {
  await page.goto('/')
})

test('Test Case 1: Validate selected specialties', async ({page}) => {
    await page.getByText('Veterinarians').click()
    await page.getByText('All').click()
    await expect(page.getByRole('heading')).toHaveText('Veterinarians')
    await page.getByRole('row', { name: 'Helen Leary' }).getByRole('button', { name: 'Edit Vet' }).click();
    const selectedSpecialties = page.locator('.selected-specialties');
    await expect(selectedSpecialties).toHaveText('radiology');
    await page.locator('.dropdown-arrow').click();
    expect(await page.getByRole('checkbox', {name: 'radiology'}).isChecked()).toBeTruthy();
    expect(await page.getByRole('checkbox', {name: 'surgery'}).isChecked()).toBeFalsy();
    expect(await page.getByRole('checkbox', {name: 'dentistry'}).isChecked()).toBeFalsy();
    expect(await page.getByRole('checkbox', {name: 'surgery'}).check());
    expect(await page.getByRole('checkbox', {name: 'radiology'}).uncheck());
    await expect(page.locator('.selected-specialties')).toHaveText('surgery');
    expect(await page.getByRole('checkbox', {name: 'dentistry'}).check());
    await expect(page.locator('.selected-specialties')).toHaveText('surgery, dentistry');
})

test('Test Case 2: Select all specialties', async ({page}) => {
    await page.getByText('Veterinarians').click()
    await page.getByText('All').click()
    await page.getByRole('row', { name: 'Rafael Ortega' }).getByRole('button', { name: 'Edit Vet' }).click();
    const selectedSpecialties = page.locator('.selected-specialties');
    await expect(selectedSpecialties).toHaveText('surgery');
    await page.locator('.dropdown-arrow').click();
    const allBoxes = page.getByRole('checkbox')
    for(const box of await allBoxes.all()){
        await box.check({force: true})
        expect(await box.isChecked()).toBeTruthy()
    }
    await expect(selectedSpecialties).toHaveText('surgery, radiology, dentistry');

})

test('Test Case 3: Unselect all specialties', async ({page}) => {
    await page.getByText('Veterinarians').click()
    await page.getByText('All').click()
    await page.getByRole('row', { name: 'Linda Douglas' }).getByRole('button', { name: 'Edit Vet' }).click();
    const selectedSpecialties = page.locator('.selected-specialties');
    await expect(selectedSpecialties).toHaveText('dentistry, surgery');
    await page.locator('.dropdown-arrow').click();
    const allBoxes = page.getByRole('checkbox')
    for(const box of await allBoxes.all()){
        await box.uncheck({force: true})
        expect(await box.isChecked()).toBeFalsy()
    }
    await expect(selectedSpecialties).toBeEmpty();

})
