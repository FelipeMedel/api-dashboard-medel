# Requerimientos del Proyecto

- Ejecutar `npm i` para instalar las dependencias del proyecto.
- La configuración de la base de datos se hace en el archivo `ormconfig.json`.
- Ejecutar `npm run start:dev` para correr un proyecto en modo debug.

# Generar migración

- npx ts-node ./node_modules/typeorm/cli.js migration:generate -n nombre_migracion

# Ejecutar migración

- npx ts-node ./node_modules/typeorm/cli.js migration:run

# Generar documentación

Se debe tener instalado apidoc en el equipo de manera global, y ejecutar en la raiz del proyecto cualquiera
de los siguientes comandos:

- npm run start:doc
- apidoc -i documentation/api -o documentation/doc

# Datos de Contacto

- Autor: Felipe Medel
- Perfil: Desarrollador de software
