const mdLinks = require('./mdLinks');

const filePath = process.argv[2];
const validating =  process.argv[3];

const validateOption = validating === '--validate';

const options = {
  validate: validateOption
};

mdLinks(filePath, options)
  .then((results) => {
    console.log('Links found:', results);
  })
  .catch((error) => {
    console.log('An error occurred:', error.message);
  });
