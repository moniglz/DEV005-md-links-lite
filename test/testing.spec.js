const path = require('path');
const validateRoute = require('../validate');
const readingFile = require('../file_reader');
const fs = require('fs');

//Test de validate.js
describe('validateRoute', () => {
  test('its a function', () => {
    expect(typeof validateRoute).toBe('function');
  });

  test('should return an absolute path if route exists and is absolute', () => {
    const route = 'C:/Users/Moni/Documents/Laboratoria/Proyectos/MDLinks/DEV005-md-links-lite/thumb.png';
    const expectedResult = path.normalize(route); // Normaliza la ruta (`\` to `/`)
    const result = validateRoute(route);
    expect(result).toBe(expectedResult);
  });

  it('should return a resolved path if route exists and is relative', () => {
    const route = './thumb.png';
    const expectedResult = path.resolve(route);
    const result = validateRoute(route);
    expect(result).toBe(expectedResult);
  });

  it('should return undefined if route doesn\'t exists', () => {
    const route = './thumb.txt';
    const result = validateRoute(route);
    expect(result).toBeUndefined();
  });
});

// Test file_reader.js
describe('readingFile', () => {
  test('its a function', () => {
    expect(typeof readingFile).toBe('function');
  });

  it('should return extracted links for a .md file', async () => {
    const route = './example.md';

    const expectedLinks = [
      {
        file: './example.md',
        href: 'https://curriculum.laboratoria.la/es/topics/javascript/02-flow-control/03-functions',
        text: 'Funciones (control de flujo)',
      },
      {
        file: './example.md',
        href: 'https://jestjs.io/docs/es-ES/getting-started',
        text: 'Empezando con Jest - Documentación oficial',
      },
    ];

    const result = await readingFile(route);
    expect(result).toBe(expectedLinks);
  });

  it('should reject the promise for non .md file', () => {
    const route = './example.txt';

    return expect(readingFile(route)).rejects.toThrowError(`It isn't a .md file, it's a: .txt file`);
  });
});