const fs = require('fs');
const path = require('path');

const readingFile = (route) => {
  const fileExt = path.extname(route);
  if (fileExt === '.md') {
    return fs.promises.readFile(route, 'utf8');
  } else {
  throw new Error(`It isn\'t valid: ${fileExt}`);
  }
};

module.exports = readingFile;