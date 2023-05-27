const path = require('node:path');
const validateRoute = require('../validate');
const { error } = require('node:console');

describe('validateRoute', () => {
  test('its a function', () => {
    expect(typeof validateRoute).toBe('function');
  });

  test('should return an absolute path if route exists and is absolute', () => {
    const route = 'C:/Users/Moni/Documents/Laboratoria/Proyectos/MDLinks/DEV005-md-links-lite/thumb.png';
    const expectedResult = path.normalize(route); //función para normalizar la ruta (\ to /)
    const result = validateRoute(route);
    expect(result).toBe(expectedResult);
  });

  test('should return a resolved path if route exists and is relative', () => {
    const route = './thumb.png';
    const expectedResult = path.resolve(route);
    const result = validateRoute(route);
    expect(result).toEqual(expectedResult);
  });

  test('should return undefined if route doesn\'t exists', () => {
    const route = './thumb.txt';
    const result = validateRoute(route);
    expect(result).toBeUndefined();
  });
});
