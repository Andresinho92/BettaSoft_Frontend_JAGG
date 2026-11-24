DOCUMENTACIÓN TÉCNICA DE LA API – BETTASOFT

1. INFORMACIÓN GENERAL

Proyecto: BettaSoft – Sistema de gestión de acuarios y peces.
Evidencia: GA7-220501096-AA5-EV03 – Diseño y desarrollo de servicios web – proyecto.
Base de datos: db_bettasoft_jagg.
Tablas principales: usuarios_jagg y acuario_jagg.

Tecnologías utilizadas:

Node.js.

Express.

MySQL2.

bcryptjs.

dotenv.

2. SERVICIOS DE AUTENTICACIÓN

2.1. Registrar usuario

Método: POST.

Ruta: /api/auth/register.

Tabla: usuarios_jagg.

Descripción: Registra un usuario nuevo y almacena su contraseña mediante un proceso de hash con bcryptjs.

Cuerpo de la petición:

{
  "usuario": "andres_jagg",
  "password": "mi_password_segura"
}

Respuesta exitosa – 201 Created:

{
  "mensaje": "Usuario registrado exitosamente",
  "id": 1
}

Respuesta de error – 400 Bad Request:

{
  "error": "El usuario ya existe"
}

2.2. Iniciar sesión

Método: POST.

Ruta: /api/auth/login.

Tabla: usuarios_jagg.

Descripción: Valida las credenciales del usuario y compara la contraseña ingresada con el hash almacenado.

Cuerpo de la petición:

{
  "usuario": "andres_jagg",
  "password": "mi_password_segura"
}

Respuesta exitosa – 200 OK:

{
  "mensaje": "Inicio de sesión exitoso",
  "usuario": "andres_jagg"
}

Respuesta de error – 401 Unauthorized:

{
  "error": "Credenciales inválidas"
}

3. SERVICIOS DE GESTIÓN DE ACUARIOS

3.1. Obtener todos los acuarios

Método: GET.

Ruta: /api/acuarios.

Tabla: acuario_jagg.

Descripción: Consulta y devuelve los registros de acuarios almacenados.

Respuesta exitosa – 200 OK:

[
  {
    "id": 1,
    "nombre": "Comunitario 14L",
    "capacidad": 14,
    "tipo": "Comunidad"
  }
]

3.2. Consultar acuario por ID

Método: GET.

Ruta: /api/acuarios/:id.

Tabla: acuario_jagg.

Descripción: Consulta un acuario específico utilizando su identificador.

Respuesta exitosa – 200 OK:

{
  "id": 1,
  "nombre": "Comunitario 14L",
  "capacidad": 14,
  "tipo": "Comunidad"
}

Respuesta de error – 404 Not Found:

{
  "error": "Acuario no encontrado"
}

3.3. Crear un acuario

Método: POST.

Ruta: /api/acuarios.

Tabla: acuario_jagg.

Descripción: Registra un nuevo acuario en la base de datos.

Cuerpo de la petición:

{
  "nombre": "Nano Betta Golfito",
  "capacidad": 6,
  "tipo": "Nano"
}

Respuesta exitosa – 201 Created:

{
  "mensaje": "Acuario creado exitosamente",
  "id": 2
}

3.4. Actualizar un acuario

Método: PUT.

Ruta: /api/acuarios/:id.

Tabla: acuario_jagg.

Descripción: Actualiza los datos de un acuario existente mediante su identificador.

Cuerpo de la petición:

{
  "nombre": "Nano Betta Golfito Actualizado",
  "capacidad": 6,
  "tipo": "Nano"
}

Respuesta exitosa – 200 OK:

{
  "mensaje": "Acuario actualizado exitosamente"
}

3.5. Eliminar un acuario

Método: DELETE.

Ruta: /api/acuarios/:id.

Tabla: acuario_jagg.

Descripción: Elimina el registro del acuario indicado por su identificador.

Respuesta exitosa – 200 OK:

{
  "mensaje": "Acuario eliminado exitosamente"
}

4. MATRIZ DE VERIFICACIÓN DE SERVICIOS

N.º

Método

Endpoint

Escenario

Código HTTP

1

POST

/api/auth/register

Registro exitoso

201

2

POST

/api/auth/register

Usuario duplicado

400

3

POST

/api/auth/login

Inicio de sesión exitoso

200

4

POST

/api/auth/login

Credenciales incorrectas

401

5

GET

/api/acuarios

Consulta de todos los acuarios

200

6

GET

/api/acuarios/:id

Consulta por ID existente

200

7

GET

/api/acuarios/:id

Consulta de ID inexistente

404

8

POST

/api/acuarios

Creación de acuario

201

9

PUT

/api/acuarios/:id

Actualización de acuario

200

10

DELETE

/api/acuarios/:id

Eliminación de acuario

200

5. CONTROL DE VERSIONES

El proyecto BettaSoft utiliza Git y GitHub para el control de versiones y el seguimiento de los cambios realizados durante su desarrollo.

Repositorio:
https://github.com/Andresinho92/BettaSoft_Frontend_JAGG

6. CONCLUSIÓN

La API de BettaSoft integra servicios web RESTful para la autenticación de usuarios y la gestión de acuarios mediante operaciones CRUD. La conexión con MySQL permite almacenar y consultar la información del sistema, mientras que Express facilita la organización y exposición de los endpoints.

La documentación describe los servicios implementados, sus métodos HTTP, rutas, estructuras de petición y respuestas, así como los escenarios contemplados en la matriz de verificación.