import { test, expect } from '@playwright/test';

test('1. Verificar que existan 9 input text, 8 visibles y 1 oculto', async ({ page }) => {
  await page.goto('https://eviltester.github.io/TestingApp/games/buggygames/the_one_to_nine_calculator/calc1to9.html', { waitUntil: 'networkidle' });

  const inputs = page.locator('table input');

  // Verificar que hay exactamente 9 inputs
  await expect(inputs).toHaveCount(9);

  // Verificar que los primeros 8 inputs son visibles
  for (let i = 0; i < 8; i++) {
    await expect(inputs.nth(i)).toBeVisible();
  }

  // Verificar que el noveno input está oculto
  await expect(inputs.nth(8)).toBeHidden();
  await expect(inputs.nth(8)).toHaveAttribute('style', 'visibility: hidden');
});

test('2. Verificar que se acepten caracteres no permitidos (bug)', async ({ page }) => {
  await page.goto('https://eviltester.github.io/TestingApp/games/buggygames/the_one_to_nine_calculator/calc1to9.html', { waitUntil: 'networkidle' });

  const inputs = page.locator('table input:visible');
  const caracteresNoPermitidos = ['a', '1', 'd', '@', '&', ' '];

  for (let i = 0; i < await inputs.count(); i++) {
    const input = inputs.nth(i);

    for (const caracter of caracteresNoPermitidos) {
      await input.fill(caracter);
      await expect(input).toHaveValue(caracter, `El input ${i + 1} no debería aceptar '${caracter}', pero lo hace (bug)`);
    }
  }
});

test('3. Verificar que no se maneje adecuadamente el input inválido (bug)', async ({ page }) => {
  await page.goto('https://eviltester.github.io/TestingApp/games/buggygames/the_one_to_nine_calculator/calc1to9.html', { waitUntil: 'networkidle' });

  const inputs = page.locator('table input:visible');

  // Ingresar un caracter inválido
  await inputs.nth(6).fill('d');

  // Hacer clic en el botón Calculate
  await page.click('button:has-text("Calculate")');

  // Verificar que el estado sigue siendo "Losing..." (lo cual es incorrecto, debería haber un manejo de error)
  await expect(page.locator('#status')).toContainText('Losing...');

  // Verificar que no hay mensaje de error visible para el usuario (lo cual es un bug)
  const errorMessages = page.locator('text="Invalid input"');
  await expect(errorMessages).toHaveCount(0, 'Debería haber un mensaje de error visible, pero no lo hay (bug)');
});