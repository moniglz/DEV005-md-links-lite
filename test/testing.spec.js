const path = require('path');
const fs = {
  existsSync: jest.fn(),
  readFileSync: jest.fn(),
  readFile: jest.fn(),
};

const validateRoute = require('../validate');
const readingFile = require('../file_reader');
const extractLinks = require('../link_extraction');


// Test de validate.js
jest.mock('fs', () => ({
  existsSync: jest.fn(),
}));

describe('validateRoute', () => {
  test('its a function', () => {
    expect(typeof validateRoute).toBe('function');
  });

  it('should return an absolute path if route exists and is absolute', () => {
    fs.existsSync.mockReturnValue(true);
    const route = './thumb.png';
    const expectedResult = path.resolve(route);
    const result = validateRoute(route);
    
    expect(result).toBe(expectedResult);
  });

  it(`should return undefined if route doesn't exists`, () => {
    fs.existsSync.mockReturnValue(false);
    const result = validateRoute('./thumb.jpeg');
    expect(result).toBeUndefined();
  });
});

// Test file_reader.js
describe('readingFile', () => {
  test('its a function', () => {
    expect(typeof readingFile).toBe('function');
  });
  
  it('should return extracted links for a .md file', async () => {
    const route = './otherSample.md';

    fs.existsSync.mockReturnValue(true);
    const data = fs.readFileSync(route, 'utf8');
    const expectedResult = {
      extension: '.md',
      links: [
        {
          href: 'https://youtu.be/LlOa6KiiAw0',
          text: 'Pájaros - Porter',
          file: path.resolve(route),
        },
        {
          href: 'https://agilemanifesto.org/iso/es/manifesto.html',
          text: 'Manifiesto Ágil',
          file: path.resolve(route),
        },
        {
          href: 'https://flexboxfroggy.com/#es',
          text: 'Game flexbox froggy',
          file: path.resolve(route),
        },
        {
          href: 'https://www.happyhueees.com',
          text: 'Link trampa',
          file: path.resolve(route),
        },
        {
          href: 'https://www.happyhues.co/',
          text: 'Happy Hues',
          file: path.resolve(route),
        }
      ].map(link => {
        return {
          ...link,
          file: path.normalize(link.file)
        };
      })
    };

    const result = await readingFile(route);
    expect(result).toEqual(expectedResult)
  });

  it('should return an empty array of links if there are no links in the file', async () => {
    const route = './emptySample.md';
    const data = 'This is a sample file without links';
    
    fs.readFile.mockImplementation((path, options, callback) => {
      callback(null, data);
    });
  
    extractLinks.mockReturnValue([]);
  
    const result = await readingFile(route);  
    expect(result.extension).toBe('.md');
    expect(result.links).toEqual([]);
  });

  it('should reject if the file extension is not a .md', async () => {
    const route = './file.txt';

    fs.existsSync.mockReturnValue(true);
    const error = new Error(`It isn't a .md file, it's a: .txt file`);
    readingFile.mockRejectedValue(error);

    await expect(readingFile(route)).rejects.toThrowError(error);
  });
});
