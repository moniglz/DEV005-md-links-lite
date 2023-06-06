const validateRoute = require('./validate');
const readingFile = require('./file_reader');
const validateLinks = require('./link_validation');

const mdLinks = (path, options) => {
  const { validate } = options;

  const validatedPath = validateRoute(path);
  if (!validatedPath) {
    return Promise.reject(new Error('The file path doesn\'t exist.'));
  }

  return readingFile(validatedPath)
    .then((result) => {
      const { extension, links } = result;

      if (!validate) {
        return links.map((link) => ({
          href: link.href,
          text: link.text,
          file: link.file,
        }));
      }

      return validateLinks(links);
    });
};

module.exports = mdLinks;