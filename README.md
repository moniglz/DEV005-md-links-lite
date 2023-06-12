# Markdown Links

## 1. Preámbulo

[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado
ligero muy popular entre developers. Es usado en muchísimas plataformas que
manejan texto plano (GitHub, foros, blogs, ...) y es muy común
encontrar varios archivos en ese formato en cualquier tipo de repositorio
(empezando por el tradicional `README.md`).

Estos archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que
muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de
la información que se quiere compartir.

Dentro de una comunidad de código abierto, nos han propuesto crear una
herramienta usando [Node.js](https://nodejs.org/), que lea y analice archivos
en formato `Markdown`, para verificar los links que contengan y reportar
algunas estadísticas.

## 2. Resumen del proyecto

"MD-links", es una herramienta que permite extraer y validar links dentro de un archivo '.md', el objetivo de este proyecto es ayudar en la verificación de enlaces proporcionando la URL, el texto relacionado al link y la ruta del archivo .md donde está el enlace.

## 3. ¿Cómo ejecutar?

* Cuando se elige no validar: node index.js <ruta-archivo.md>

![example_without_validation](https://raw.githubusercontent.com/moniglz/DEV005-md-links-lite/main/src/no-validation.png)

* Cuando se elige validar: node index.js <ruta-archivo.md> --validate

![example_with_validation](https://raw.githubusercontent.com/moniglz/DEV005-md-links-lite/main/src/validation.png)

## 4. Diagrama de flujo para el desarrollo del proyecto

![md-links_diagrama-flujo](https://raw.githubusercontent.com/moniglz/DEV005-md-links-lite/main/src/diagrama-flujo.png)