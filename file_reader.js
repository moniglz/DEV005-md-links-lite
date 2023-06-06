const fs = require('fs');
const path = require('path');
const extractLinks = require('./link_extraction');

const readingFile = (route) => {
  return new Promise((resolve, reject) => {
    const fileExt = path.extname(route);
    if (fileExt === '.md') {
      fs.readFile(route, 'utf8', (error, data) => {
        if(error) {
          reject(error);
        } else {
          const links = extractLinks(data, route);
          const result = {
            extension: fileExt,
            links: links,
          };
          resolve(result);
        }
      });
    } else {
      reject(new Error(`It isn't a .md file, it's a: ${fileExt} file`));
    }
  });
};

module.exports = readingFile;
