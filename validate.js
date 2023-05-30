const path = require('node:path');
const fs = require('fs');

// Verifica que exista la ruta y si es absoluta o no
const validateRoute = (route) => {
  if (!fs.existsSync(route)) {
    return undefined;
  }
  return path.resolve(route);
}

module.exports = validateRoute;
