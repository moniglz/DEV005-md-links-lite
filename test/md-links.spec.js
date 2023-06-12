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
    const path = 'otherSample.md';
    const options = {};

    const expectedResult = [
      {
        href: 'https://youtu.be/LlOa6KiiAw0',
        text: 'Pájaros - Porter',
        file: 'otheSample.md',
      },
      {
        href: 'https://agilemanifesto.org/iso/es/manifesto.html',
        text: 'Manifiesto Ágil',
        file: 'otheSample.md',
      },
      {
        href: 'https://flexboxfroggy.com/#es',
        text: 'Game flexbox froggy',
        file: 'otheSample.md',
      },
      {
        href: 'https://www.happyhueees.com',
        text: 'Link trampa',
        file: 'otheSample.md',
      },
      {
        href: 'https://www.happyhues.co/',
        text: 'Happy Hues',
        file: 'otheSample.md',
      },
      {
        href: 'https://youtu.be/q07Gd6Q-7dY',
        text: 'Te quiero tanto. Kevin Kaarl',
        file: 'otheSample.md',
      },
      {
        href: 'https://youtube.com/fiheoahoif',
        text: 'Youtube',
        file: 'otheSample.md',
      },
    ];
    const mockResult = {
      links: [
        {
          href: 'https://youtu.be/LlOa6KiiAw0',
          text: 'Pájaros - Porter',
          file: 'otheSample.md',
        },
        {
          href: 'https://agilemanifesto.org/iso/es/manifesto.html',
          text: 'Manifiesto Ágil',
          file: 'otheSample.md',
        },
        {
          href: 'https://flexboxfroggy.com/#es',
          text: 'Game flexbox froggy',
          file: 'otheSample.md',
        },
        {
          href: 'https://www.happyhueees.com',
          text: 'Link trampa',
          file: 'otheSample.md',
        },
        {
          href: 'https://www.happyhues.co/',
          text: 'Happy Hues',
          file: 'otheSample.md',
        },
        {
          href: 'https://youtu.be/q07Gd6Q-7dY',
          text: 'Te quiero tanto. Kevin Kaarl',
          file: 'otheSample.md',
        },
        {
          href: 'https://youtube.com/fiheoahoif',
          text: 'Youtube',
          file: 'otheSample.md',
        },
      ],
    };

    validateRoute.mockReturnValue(true);
    readingFile.mockResolvedValue(mockResult);

    return expect(mdLinks(path, options)).resolves.toEqual(expectedResult);
  });

  test('should return an array of validated links if `validate` option is true', () => {
    const path = 'otherSample.md';
    const options = {
      validate: true,
    };

    const expectedResult = [
      {
        href: 'https://youtu.be/LlOa6KiiAw0',
        text: 'Pájaros - Porter',
        file: 'otherSample.md',
        status: 200,
        ok: true,
      },
      {
        href: 'https://agilemanifesto.org/iso/es/manifesto.html',
        text: 'Manifiesto Ágil',
        file: 'otherSample.md',
        status: 200,
        ok: true,
      },
      {
        href: 'https://flexboxfroggy.com/#es',
        text: 'Game flexbox froggy',
        file: 'otherSample.md',
        status: 200,
        ok: true,
      },
      {
        href: 'https://www.happyhueees.com',
        text: 'Link trampa',
        file: 'otherSample.md',
        status: 404,
        ok: false,
      },
      {
        href: 'https://www.happyhues.co/',
        text: 'Happy Hues',
        file: 'otherSample.md',
        status: 200,
        ok: true,
      },
      {
        href: 'https://youtu.be/q07Gd6Q-7dY',
        text: 'Te quiero tanto. Kevin Kaarl',
        file: 'otherSample.md',
        status: 200,
        ok: true,
      },
      {
        href: 'https://youtube.com/fiheoahoif',
        text: 'Youtube',
        file: 'otherSample.md',
        status: 200,
        ok: true,
      },
    ];

    const mockResult = {
      links: [
        {
          href: 'https://youtu.be/LlOa6KiiAw0',
          text: 'Pájaros - Porter',
          file: 'otherSample.md',
        },
        {
          href: 'https://agilemanifesto.org/iso/es/manifesto.html',
          text: 'Manifiesto Ágil',
          file: 'otherSample.md',
        },
        {
          href: 'https://flexboxfroggy.com/#es',
          text: 'Game flexbox froggy',
          file: 'otherSample.md',
        },
        {
          href: 'https://www.happyhueees.com',
          text: 'Link trampa',
          file: 'otherSample.md',
        },
        {
          href: 'https://www.happyhues.co/',
          text: 'Happy Hues',
          file: 'otherSample.md',
        },
        {
          href: 'https://youtu.be/q07Gd6Q-7dY',
          text: 'Te quiero tanto. Kevin Kaarl',
          file: 'otherSample.md',
        },
        {
          href: 'https://youtube.com/fiheoahoif',
          text: 'Youtube',
          file: 'otherSample.md',
        },
      ],
    };

    validateRoute.mockReturnValue(true);
    readingFile.mockResolvedValue(mockResult);
    validateLinks.mockResolvedValue(expectedResult);

    return expect(mdLinks(path, options)).resolves.toEqual(expectedResult);
  });
});
