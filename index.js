/* eslint-disable no-console */

const validateRoute = require('./validate');
const readingFile = require('./readingFile');

console.log(validateRoute('./sampleFile.md'));
readingFile('C:/Users/Moni/Documents/Laboratoria/Proyectos/MDLinks/DEV005-md-links-lite/sampleFile.md')
  .then((read) => (read)
);