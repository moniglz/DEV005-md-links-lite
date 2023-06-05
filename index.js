const validateRoute = require('./validate');
const readingFile = require('./file_reader');

const filePath = process.argv[2];

// Se valida ruta
const validatedPath = validateRoute(filePath);
if (!validatedPath) {
  console.log('file path doesn\'t exist');
} else {
  //Se lee el archivo
  readingFile(validatedPath)
    .then((links) => {
      const results = [];
      links.forEach((link, index) => {
        const result = {
          Link: index + 1,          
          Text: link.text,
          URL: link.href,
        };
        results.push(result);
      });
      console.log('Links found:', results);
    })
    .catch((error) => {
      console.log('An error ocurred while reading the file: ', error.message);
    });
}
