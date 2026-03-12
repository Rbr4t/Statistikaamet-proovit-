import { test, expect } from '@playwright/test';

test('leht on tehtud Statistikaameti jaoks', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.locator('div').filter({ hasText: 'EESTISTATISTIKA' }).nth(2).click();
  await expect(page.getByRole('banner')).toContainText('EESTISTATISTIKA');
});

test('Vale vastuse testimine', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await expect(page.getByRole('heading', { name: 'Mis on Eesti pealinn?' })).toBeVisible();
  await page.getByRole('button', { name: 'Tartu' }).click();
  await page.getByRole('button', { name: 'Vasta' }).click();
  await expect(page.getByRole('main')).toContainText('Vale. Õige vastus: Tallinn');
});

test('Õige vastuse testimine', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await expect(page.getByRole('button', { name: 'Tallinn' })).toBeVisible();
  await page.getByRole('button', { name: 'Tallinn' }).click();
  await page.getByRole('button', { name: 'Vasta' }).click();
  await page.getByText('Õige vastus!').click();
  await expect(page.getByRole('main')).toContainText('Õige vastus!');
});

test('Küsimustele õigesti vastamine ja sellele vastav tulemus', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await expect(page.getByRole('button', { name: 'Tallinn' })).toBeVisible();
  await page.getByRole('button', { name: 'Tallinn' }).click();
  await page.getByRole('button', { name: 'Vasta' }).click();
  await page.getByText('Õige vastus!').click();
  await expect(page.getByRole('main')).toContainText('Õige vastus!');
  await page.getByRole('button', { name: 'Järgmine' }).click();
  await page.getByRole('button', { name: '75.1' }).click();
  await page.getByRole('button', { name: 'Vasta' }).click();
  await expect(page.getByRole('main')).toContainText('Õige vastus!');
  await page.getByRole('button', { name: 'Järgmine' }).click();
  await page.getByRole('button', { name: '879' }).click();
  await page.getByRole('button', { name: 'Vasta' }).click();
  await expect(page.getByRole('main')).toContainText('Õige vastus!');
  await page.getByRole('button', { name: 'Järgmine' }).click();
  await page.getByRole('button', { name: 'Vormsi vald' }).click();
  await page.getByRole('button', { name: 'Vasta' }).click();
  await expect(page.getByRole('main')).toContainText('Õige vastus!');
  await page.getByRole('button', { name: 'Vaata tulemusi' }).click();
  await expect(page.getByRole('main')).toContainText('4 / 4');
});

test('Ühele küsimusele valesti vastamine ja sellele vastav tulemus', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await expect(page.getByRole('button', { name: 'Tallinn' })).toBeVisible();
  await page.getByRole('button', { name: 'Tartu' }).click();
  await page.getByRole('button', { name: 'Vasta' }).click();
  await expect(page.getByRole('main')).toContainText('Vale. Õige vastus: Tallinn');
  await page.getByRole('button', { name: 'Järgmine' }).click();
  await page.getByRole('button', { name: '75.1' }).click();
  await page.getByRole('button', { name: 'Vasta' }).click();
  await expect(page.getByRole('main')).toContainText('Õige vastus!');
  await page.getByRole('button', { name: 'Järgmine' }).click();
  await page.getByRole('button', { name: '879' }).click();
  await page.getByRole('button', { name: 'Vasta' }).click();
  await expect(page.getByRole('main')).toContainText('Õige vastus!');
  await page.getByRole('button', { name: 'Järgmine' }).click();
  await page.getByRole('button', { name: 'Vormsi vald' }).click();
  await page.getByRole('button', { name: 'Vasta' }).click();
  await expect(page.getByRole('main')).toContainText('Õige vastus!');
  await page.getByRole('button', { name: 'Vaata tulemusi' }).click();
  await expect(page.getByRole('main')).toContainText('3 / 4');
});

test('Küsimustele õigesti vastamine ja counteri tulemuse muutumine', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await expect(page.getByText('1 / 4')).toBeVisible();
  await page.getByRole('button', { name: 'Tallinn' }).click();
  await page.getByRole('button', { name: 'Vasta' }).click();
  await page.getByText('Õige vastus!').click();
  await expect(page.getByRole('main')).toContainText('Õige vastus!');
  await page.getByRole('button', { name: 'Järgmine' }).click();
  await expect(page.getByText('2 / 4')).toBeVisible();
  await page.getByRole('button', { name: '75.1' }).click();
  await page.getByRole('button', { name: 'Vasta' }).click();
  await expect(page.getByRole('main')).toContainText('Õige vastus!');
  await page.getByRole('button', { name: 'Järgmine' }).click();
  await expect(page.getByText('3 / 4')).toBeVisible();
  await page.getByRole('button', { name: '879' }).click();
  await page.getByRole('button', { name: 'Vasta' }).click();
  await expect(page.getByRole('main')).toContainText('Õige vastus!');
  await page.getByRole('button', { name: 'Järgmine' }).click();
  await expect(page.getByText('4 / 4')).toBeVisible();
  await page.getByRole('button', { name: 'Vormsi vald' }).click();
  await page.getByRole('button', { name: 'Vasta' }).click();
  await expect(page.getByRole('main')).toContainText('Õige vastus!');
  await page.getByRole('button', { name: 'Vaata tulemusi' }).click();
  await expect(page.getByRole('main')).toContainText('4 / 4');
});