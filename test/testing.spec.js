const path = require("path");
const fs = require("fs");
const validateRoute = require("../validate");
const readingFile = require("../file_reader");
const axios = require('axios');
const validateLinks = require('../link_validation');

//Test de validate.js
describe("validateRoute", () => {
  test("its a function", () => {
    expect(typeof validateRoute).toBe("function");
  });

  it("should return an absolute path if route exists and is absolute", () => {
    const route = `C:/Users/Moni/Documents/Laboratoria/Proyectos/MDLinks/DEV005-md-links-lite/thumb.png`;
    const expectedResult = path.resolve(route);
    const result = validateRoute(route);
    expect(result).toBe(expectedResult);
  });

  it("should return a resolved path if route exists and is relative", () => {
    const route = "./thumb.png";
    const expectedResult = path.resolve(route);
    const result = validateRoute(route);
    expect(result).toBe(expectedResult);
  });

  it(`should return undefined if route doesn't exist`, () => {
    const route = "/nonexistent/path/file.txt";
    const result = validateRoute(route);
    expect(result).toBeUndefined();
  });
});

// Test file_reader.js
describe("readingFile", () => {
  test("its a function", () => {
    expect(typeof readingFile).toBe("function");
  });

  it("should return extracted links for a .md file", async () => {
    const route = './otherSample.md';
    const links = [
      {
        href: "https://youtu.be/LlOa6KiiAw0",
        text: "Pájaros - Porter",
        file: route,
      },
      {
        href: "https://agilemanifesto.org/iso/es/manifesto.html",
        text: "Manifiesto Ágil",
        file: route,
      },
      {
        href: "https://flexboxfroggy.com/#es",
        text: "Game flexbox froggy",
        file: route,
      },
      {
        href: "https://www.happyhueees.com",
        text: "Link trampa",
        file: route,
      },
      {
        href: "https://www.happyhues.co/",
        text: "Happy Hues",
        file: route,
      },
      {
        href: "https://youtu.be/q07Gd6Q-7dY",
        text: "Te quiero tanto. Kevin Kaarl",
        file: route,
      },
      {
        href: "https://youtube.com/fiheoahoif",
        text: "Youtube",
        file: route,
      },
    ];

    const expectedResult = {
      extension: '.md',
      links: links,
    };

    const result = await readingFile(route);
    expect(result).toStrictEqual(expectedResult);
  });

  it("should reject the promise for non .md file", () => {
    const route = "./example.txt";

    return expect(readingFile(route)).rejects.toThrowError(
      `It isn't a .md file, it's a: .txt file`
    );
  });
});


// Test link_validation.js
jest.mock('axios');

describe('validateLinks', () => {
  test('its a function', () => {
    expect(typeof validateLinks).toBe('function');
  });

  it('should validate links', async () => {
    const mockResponse = {
      status: 200,
    };

    axios.get.mockResolvedValue(mockResponse);
    const route = 'sampleFile.md';
    const links = [
      {
        href: 'https://nodejs.org/es/',
        text: 'Node.js',
        file: route,
      },
    ];

    const result = await validateLinks(links);

    expect(result).toEqual([
      {
        href: 'https://nodejs.org/es/',
        text: 'Node.js',
        file: route,
        status: 200,
        ok: true,
      },
    ]);
  });
});