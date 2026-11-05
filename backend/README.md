# BettaSoft - Módulo de Autenticación y Backend
## Evidencia GA7-220501096-AA5-EV01

### Requisitos Previos
1. Node.js instalado en el equipo.
2. Servidor MySQL activo (XAMPP / phpMyAdmin).

### Instrucciones de Configuración y Ejecución

1. **Configurar la Base de Datos:**
   - Importa el archivo `database.sql` incluido en esta carpeta dentro de tu servidor MySQL local para crear la base de datos `db_bettasoft_jagg` con sus respectivas tablas (`acuario_jagg` y `usuarios_jagg`).

2. **Configurar las Variables de Entorno:**
   - Dentro de la carpeta `backend/`, crea un archivo llamado `.env`.
   - Define las siguientes variables con tus credenciales locales:
     ```env
     PORT=3000
     DB_HOST=localhost
     DB_USER=root
     DB_PASSWORD=
     DB_NAME=db_bettasoft_jagg
     ```

3. **Instalar Dependencias:**
   - Abre tu terminal, ubícate en la carpeta `backend` y ejecuta:
     ```bash
     npm install
     ```

4. **Ejecutar el Servidor:**
   - Inicia el servidor backend ejecutando:
     ```bash
     node index.js
     ```
   - El servidor se iniciará correctamente en `http://localhost:3000` y confirmará la conexión a MySQL.

5. **Pruebas de la API:**
   - Puedes utilizar la extensión **REST Client** de VS Code abriendo el archivo `pruebas.http` para validar las peticiones del CRUD (`/api/acuarios`) y los endpoints de autenticación (`/api/auth/register` y `/api/auth/login`).