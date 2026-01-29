import { test, expect } from '@playwright/test';

const BASE_URL = 'https://kin-maya.vercel.app';

// Datos de prueba conocidos
const TEST_CASES = [
  { date: { day: 26, month: 6, year: 1987 }, expectedKin: 1, sello: 'Dragón', tono: 'Magnético' },
  { date: { day: 15, month: 0, year: 1990 }, expectedKin: 125, sello: 'Serpiente', tono: 'Galáctico' },
  { date: { day: 25, month: 0, year: 2026 }, expectedKin: 24, sello: 'Semilla', tono: 'Espectral' }, // Hoy
];

test.describe('KIN Maya App', () => {
  
  test.beforeEach(async ({ page }) => {
    // Limpiar localStorage antes de cada test
    await page.goto(BASE_URL);
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('Onboarding - muestra pantalla inicial', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Verificar elementos de onboarding
    await expect(page.locator('text=KIN')).toBeVisible();
    await expect(page.locator('text=Tu Guía Maya Diaria')).toBeVisible();
    await expect(page.locator('text=¿Cuándo naciste?')).toBeVisible();
    await expect(page.locator('text=Descubrir mi Kin')).toBeVisible();
  });

  test('Calcula Kin correctamente - caso base (26 julio 1987 = Kin 1)', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Seleccionar fecha: 26 julio 1987
    await page.selectOption('select >> nth=0', '26');  // Día
    await page.selectOption('select >> nth=1', '6');   // Julio (0-indexed)
    await page.selectOption('select >> nth=2', '1987'); // Año
    
    // Click en descubrir
    await page.click('text=Descubrir mi Kin');
    
    // Verificar que muestra Kin 1
    await expect(page.locator('text=Kin 1')).toBeVisible();
    await expect(page.locator('text=Magnético Dragón')).toBeVisible();
  });

  test('Muestra energía del día correctamente', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Entrar con cualquier fecha
    await page.selectOption('select >> nth=0', '1');
    await page.selectOption('select >> nth=1', '0');
    await page.selectOption('select >> nth=2', '1990');
    await page.click('text=Descubrir mi Kin');
    
    // Verificar header con fecha de hoy
    const today = new Date();
    const dayName = today.toLocaleDateString('es-MX', { weekday: 'long' });
    await expect(page.locator(`text=${dayName}`)).toBeVisible();
    
    // Verificar que muestra Kin del día
    await expect(page.locator('text=Kin').first()).toBeVisible();
    
    // Verificar oráculo del día
    await expect(page.locator('text=Oráculo del Día')).toBeVisible();
    await expect(page.locator('text=Guía')).toBeVisible();
    await expect(page.locator('text=Desafío')).toBeVisible();
    await expect(page.locator('text=Soporte')).toBeVisible();
    await expect(page.locator('text=Oculto')).toBeVisible();
  });

  test('Navegación entre tabs funciona', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Entrar primero
    await page.selectOption('select >> nth=0', '15');
    await page.selectOption('select >> nth=1', '5');
    await page.selectOption('select >> nth=2', '1985');
    await page.click('text=Descubrir mi Kin');
    
    // Tab Hoy (default)
    await expect(page.locator('text=Tu Conexión Hoy')).toBeVisible();
    
    // Tab Mi Kin
    await page.click('text=Mi Kin');
    await expect(page.locator('text=Tu Firma Galáctica')).toBeVisible();
    await expect(page.locator('text=Tu Oráculo de Nacimiento')).toBeVisible();
    
    // Tab Explorar
    await page.click('text=Explorar');
    await expect(page.locator('text=Compatibilidad de Kins')).toBeVisible();
    await expect(page.locator('text=Los 20 Sellos Solares')).toBeVisible();
    await expect(page.locator('text=Los 13 Tonos Galácticos')).toBeVisible();
  });

  test('Interpretación AI funciona', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Entrar
    await page.selectOption('select >> nth=0', '10');
    await page.selectOption('select >> nth=1', '3');
    await page.selectOption('select >> nth=2', '1992');
    await page.click('text=Descubrir mi Kin');
    
    // Click en pedir interpretación
    await page.click('text=Pedir interpretación personalizada');
    
    // Esperar respuesta (máx 15 segundos)
    await expect(page.locator('text=Cerrar interpretación')).toBeVisible({ timeout: 15000 });
    
    // Verificar que hay texto de interpretación
    const interpretation = page.locator('.bg-maya-jade\\/10 p');
    await expect(interpretation).not.toBeEmpty();
  });

  test('Compatibilidad funciona', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Entrar con fecha propia
    await page.selectOption('select >> nth=0', '1');
    await page.selectOption('select >> nth=1', '0');
    await page.selectOption('select >> nth=2', '1990');
    await page.click('text=Descubrir mi Kin');
    
    // Ir a Explorar
    await page.click('text=Explorar');
    
    // Seleccionar fecha de otra persona
    await page.selectOption('select >> nth=0', '15');
    await page.selectOption('select >> nth=1', '6');
    await page.selectOption('select >> nth=2', '1988');
    
    // Click en ver compatibilidad
    await page.click('text=Ver compatibilidad');
    
    // Esperar resultado
    await expect(page.locator('text=Nueva consulta')).toBeVisible({ timeout: 15000 });
    
    // Verificar que muestra Kin combinado
    await expect(page.locator('text=💕')).toBeVisible();
  });

  test('Botón cerrar funciona en interpretación', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Entrar
    await page.selectOption('select >> nth=0', '5');
    await page.selectOption('select >> nth=1', '8');
    await page.selectOption('select >> nth=2', '1995');
    await page.click('text=Descubrir mi Kin');
    
    // Pedir interpretación
    await page.click('text=Pedir interpretación personalizada');
    await expect(page.locator('text=Cerrar interpretación')).toBeVisible({ timeout: 15000 });
    
    // Cerrar
    await page.click('text=Cerrar interpretación');
    
    // Verificar que vuelve el botón de pedir
    await expect(page.locator('text=Pedir interpretación personalizada')).toBeVisible();
  });

  test('Cambiar fecha de nacimiento funciona', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Entrar con primera fecha
    await page.selectOption('select >> nth=0', '1');
    await page.selectOption('select >> nth=1', '0');
    await page.selectOption('select >> nth=2', '1990');
    await page.click('text=Descubrir mi Kin');
    
    // Ir a Mi Kin
    await page.click('text=Mi Kin');
    
    // Click en cambiar fecha
    await page.click('text=Cambiar fecha de nacimiento');
    
    // Debe volver al onboarding
    await expect(page.locator('text=¿Cuándo naciste?')).toBeVisible();
  });

  test('Los 20 sellos se muestran correctamente', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Entrar
    await page.selectOption('select >> nth=0', '1');
    await page.selectOption('select >> nth=1', '0');
    await page.selectOption('select >> nth=2', '1990');
    await page.click('text=Descubrir mi Kin');
    
    // Ir a Explorar
    await page.click('text=Explorar');
    
    // Verificar algunos sellos
    const sellos = ['Dragón', 'Viento', 'Noche', 'Semilla', 'Serpiente', 'Sol'];
    for (const sello of sellos) {
      await expect(page.locator(`text=${sello}`).first()).toBeVisible();
    }
  });

  test('Los 13 tonos se muestran correctamente', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Entrar
    await page.selectOption('select >> nth=0', '1');
    await page.selectOption('select >> nth=1', '0');
    await page.selectOption('select >> nth=2', '1990');
    await page.click('text=Descubrir mi Kin');
    
    // Ir a Explorar
    await page.click('text=Explorar');
    
    // Scroll down para ver tonos
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    // Verificar algunos tonos
    const tonos = ['Magnético', 'Lunar', 'Eléctrico', 'Cósmico'];
    for (const tono of tonos) {
      await expect(page.locator(`text=${tono}`).first()).toBeVisible();
    }
  });

});

