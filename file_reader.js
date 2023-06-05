const fs = require('fs');
const path = require('path');
const extractLinks = require('./link_extraction');

const readingFile = (route) => {
  return new Promise((resolve, reject) => {
    const fileExt = path.extname(route);
    if (fileExt === '.md') {
      const mdContent = fs.readFileSync(route, 'utf8');
      resolve(extractLinks(mdContent));
    } else {
      reject(new Error(`It isn't a .md file, it\'s a: ${fileExt} file`));
    }
  });
};

module.exports = readingFile;
