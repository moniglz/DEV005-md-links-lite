const mdLinks = require('../mdLinks');
const validateRoute = require('../validate');
const readingFile = require('../file_reader');
const validateLinks = require('../link_validation');

jest.mock('../validate');
jest.mock('../file_reader');
jest.mock('../link_validation');

describe('mdLinks', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should reject with an error if the file path doesn\'t exist', () => {
    const path = 'nonexistent/file.md';
    const options = {};

    validateRoute.mockReturnValue(false);

    return expect(mdLinks(path, options)).rejects.toThrow("The file path doesn't exist.");
  });

  test('should return an array of links if `validate` option is not provided', () => {
    const path = 'existing/file.md';
    const options = {};

    const expectedResult = [
      {
        href: 'https://example.com',
        text: 'Example',
        file: 'existing/file.md',
      },
      // Add more expected link objects here if necessary
    ];

    const mockResult = {
      links: [
        {
          href: 'https://example.com',
          text: 'Example',
          file: 'existing/file.md',
        },
        // Add more mock link objects here if necessary
      ],
    };

    validateRoute.mockReturnValue(true);
    readingFile.mockResolvedValue(mockResult);

    return expect(mdLinks(path, options)).resolves.toEqual(expectedResult);
  });

  test('should return an array of validated links if `validate` option is true', () => {
    const path = 'existing/file.md';
    const options = {
      validate: true,
    };

    const expectedResult = [
      {
        href: 'https://example.com',
        text: 'Example',
        file: 'existing/file.md',
        status: 200,
        ok: true,
      },
      // Add more expected validated link objects here if necessary
    ];

    const mockResult = {
      links: [
        {
          href: 'https://example.com',
          text: 'Example',
          file: 'existing/file.md',
        },
        // Add more mock link objects here if necessary
      ],
    };

    validateRoute.mockReturnValue(true);
    readingFile.mockResolvedValue(mockResult);
    validateLinks.mockResolvedValue(expectedResult);

    return expect(mdLinks(path, options)).resolves.toEqual(expectedResult);
  });
});





// describe('mdLinks', () => {
//   it('should return an array', () => {
//     console.log('FIX ME!');
//   });
// });
