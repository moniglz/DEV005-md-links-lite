const mdLinks = require('./mdLinks');

const filePath = process.argv[2];
const options = {
  validate: true
};

mdLinks(filePath, options)
  .then((results) => {
    console.log('Links found:', results);
  })
  .catch((error) => {
    console.log('An error occurred:', error.message);
  });
