const path = require('node:path');
const fs = require('fs');
const error = require('node:console');

// Verifica que exista la ruta y si es absoluta o no
const validateRoute = (route) => {
  if (!fs.existsSync(route)) {
    console.log('Invalid route or route doesn\'t exist');
    return undefined;
  }
  return path.resolve(route);
}

module.exports = validateRoute;
