const axios = require('axios');

const validateLink = (link) => {
  return axios
    .get(link.href)
    .then((response) => ({
      href: link.href,
      text: link.text,
      file: link.file,
      status: response.status,
      ok: response.status >= 200 && response.status < 400,
    }))
    .catch((error) => ({
      href: link.href,
      text: link.text,
      file: link.file,
      status: 'Error',
      ok: false,
      error: error.message,
    }));
};

const validateLinks = (links) => {
  const linkValidationPromises = links.map((link) => {
    return validateLink(link);
  });

  return Promise.all(linkValidationPromises);
};

module.exports = validateLinks;