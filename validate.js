const path = require('node:path')
const fs = require('fs')

//Verifica que exista la ruta y si es absoluta o no
const validateRoute = (route) => {
  if (fs.existsSync(route)) {
    const validatePath = path.isAbsolute(route)
    if (validatePath) {
      console.log('Its an absolute path')
      return route
    } else {
      return path.resolve(route)
    }
  }
  
  return undefined
}

module.exports = validateRoute;