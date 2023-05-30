const path = require('node:path');
const validateRoute = require('../validate');
const readingFile = require('../readingFile');
const fs = require('fs');

//Test de validate.js
describe('validateRoute', () => {
  test('its a function', () => {
    expect(typeof validateRoute).toBe('function');
  });

  test('should return an absolute path if route exists and is absolute', () => {
    const route = 'C:/Users/Moni/Documents/Laboratoria/Proyectos/MDLinks/DEV005-md-links-lite/thumb.png';
    const expectedResult = path.normalize(route); //Normaliza la ruta (\ to /)
    const result = validateRoute(route);
    expect(result).toBe(expectedResult);
  });

  test('should return a resolved path if route exists and is relative', () => {
    const route = './thumb.png';
    const expectedResult = path.resolve(route);
    const result = validateRoute(route);
    expect(result).toBe(expectedResult);
  });

  test('should return undefined if route doesn\'t exists', () => {
    const route = './thumb.txt';
    const result = validateRoute(route);
    expect(result).toBeUndefined;
  });
});

//Test readingFile.js
describe('readingFile', () => {
  test('its a function', () => {
    expect(typeof readingFile).toBe('function');
  });

  test('should read the file and return its contents', () => {
    const filePath = 'C:/Users/Moni/Documents/Laboratoria/Proyectos/MDLinks/DEV005-md-links-lite/sampleFile.md';
    const expectedContent = fs.readFileSync(filePath, 'utf-8');
    return readingFile(filePath).then((result) => {
      expect(result).toBe(expectedContent);
    });
  });

  test('should throw Error for an invalid file extension', () => {
    const filePath = 'C:/Users/Moni/Documents/Laboratoria/Proyectos/MDLinks/DEV005-md-links-lite/text.txt';
    expect(() => { 
      readingFile(filePath);
    }).toThrow('It isn\'t valid');
  });
});