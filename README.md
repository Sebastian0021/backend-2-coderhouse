# backend-2-coderhouse

Este proyecto es una aplicación backend desarrollada para Coderhouse, actualmente en desarrollo. Incluye autenticación de usuarios con JWT y Passport.js, junto con endpoints de API para gestionar productos y carritos de compra.

### Estado del Proyecto

El proyecto aún está en desarrollo. Las funcionalidades de productos y carritos aún requieren pruebas, y la funcionalidad de tickets aún no se ha desarrollado.

### Problemas Conocidos

La implementación actual enfrenta desafíos con los Objetos de Transferencia de Datos (DTOs) para sesiones y usuarios. Aunque se intentó usar dos DTOs y repositorios separados (uno para datos sensibles como contraseñas y otro sin ellos), surgió un problema al necesitar el ID de usuario para la creación del JWT con Passport.js. Esto dificulta la utilización completa del DTO, ya que el campo `id` no se solicita al registrar un usuario.

También hay un problema conocido con `ValidatorError: Path \`product\` is required` al intentar corregir errores relacionados con las operaciones del carrito.

### Características

- **Gestión de Usuarios**: Registro, inicio de sesión y recuperación de información de usuario.
- **Autenticación**: Implementada con Passport.js usando estrategias Local y JWT. Los JWT se utilizan para la gestión de sesiones.
- **Gestión de Productos**: Operaciones CRUD para productos, incluyendo paginación, ordenación y consulta. Las imágenes de productos se pueden subir.
- **Gestión de Carritos**: Crear, ver, actualizar y eliminar productos dentro de un carrito de compra.
- **Autorización Basada en Roles**: Los endpoints están protegidos según los roles de usuario (por ejemplo, `admin` para la gestión de productos y usuarios).
- **Validación de Entrada**: Middleware para validar datos de registro e inicio de sesión de usuarios.
- **Configuración de Entorno**: Utiliza `dotenv` para gestionar variables de entorno.

### Tecnologías Utilizadas

- **Node.js**
- **Express.js**: Framework web.
- **Mongoose**: Modelado de objetos MongoDB para Node.js.
- **Mongoose-Paginate-V2**: Para paginación en consultas de Mongoose.
- **Passport.js**: Para autenticación.
  - `passport-jwt`: Estrategia de autenticación JWT.
  - `passport-local`: Estrategia de autenticación por nombre de usuario y contraseña.
- **Bcrypt**: Para hashing de contraseñas.
- **JSON Web Token (JWT)**: Para el intercambio seguro de información.
- **Multer**: Para manejar `multipart/form-data`, principalmente para la subida de archivos.
- **Cookie-Parser**: Middleware para parsear cookies.
- **Express-Session**: Middleware para manejar sesiones.

### Instalación

Para configurar el proyecto localmente, sigue estos pasos:

1.  **Clonar el repositorio**:

    ```bash
    git clone [https://github.com/Sebastian0021/backend-2-coderhouse.git](https://github.com/Sebastian0021/backend-2-coderhouse.git)
    cd backend-2-coderhouse
    ```

2.  **Instalar dependencias**:

    ```bash
    npm install
    ```

3.  **Crear un archivo `.env`**:
    Crea un archivo `.env` en el directorio raíz del proyecto y añade las siguientes variables de entorno:

    ```
    PORT=3000
    URL_MONGO="your_mongodb_connection_string"
    JWT_SECRET="your_jwt_secret_key"
    JWT_EXPIRES_IN="1h"
    SESSION_SECRET="your_session_secret_key"
    COOKIE_AGE=3600000
    ```

    - `PORT`: El puerto en el que se ejecutará el servidor.
    - `URL_MONGO`: Tu cadena de conexión de MongoDB.
    - `JWT_SECRET`: Una clave secreta para firmar los JWT.
    - `JWT_EXPIRES_IN`: Tiempo de expiración para los JWT (por ejemplo, '1h', '7d').
    - `SESSION_SECRET`: Una clave secreta para firmar la cookie de ID de sesión.
    - `COOKIE_AGE`: La edad máxima (en milisegundos) de la cookie.

    El archivo `.env` y `node_modules` son ignorados por Git.

4.  **Ejecutar la aplicación**:

    ```bash
    npm run dev
    ```

    Esto iniciará el servidor usando `nodemon` y lo reiniciará automáticamente al detectar cambios en el código. Deberías ver `app listening on port 3000` (o el puerto especificado) y `MongoDB Connected: <host>` en la consola.

### Endpoints de la API

La API está estructurada con las siguientes rutas:

#### Sesiones

- `POST /api/sessions/register`: Registra un nuevo usuario.
  - **Ejemplo de Cuerpo de Solicitud (desde Postman)**:
    ```json
    {
      "first_name": "John",
      "last_name": "Doe",
      "email": "johndoe@example.com",
      "age": 30,
      "password": "hashedpasswordhere"
    }
    ```
- `POST /api/sessions/login`: Autentica un usuario y devuelve un JWT en una cookie.
  - **Ejemplo de Cuerpo de Solicitud (desde Postman)**:
    ```json
    {
      "email": "johndoe@example.com",
      "password": "hashedpasswordhere"
    }
    ```
- `GET /api/sessions/current`: Obtiene la información del usuario autenticado actual. Requiere JWT.
- `GET /api/sessions/logout`: Cierra la sesión del usuario eliminando la cookie JWT.

#### Usuarios

- `GET /api/users`: Obtiene todos los usuarios. (Solo administrador).
- `GET /api/users/current`: Obtiene la información del usuario autenticado actual.
- `GET /api/users/:uid`: Obtiene un usuario por ID. (Solo administrador).

#### Productos

- `GET /api/products`: Obtiene todos los productos. Admite parámetros `limit`, `page`, `sort` (precio asc/desc) y `query` (categoría/disponibilidad). (Solo administrador).
  - **Ejemplo (desde Postman)**: `http://localhost:3000/api/products?limit=5`
- `GET /api/products/:pid`: Obtiene un único producto por ID. (Solo administrador).
  - **Ejemplo (desde Postman)**: `http://localhost:3000/api/products/6852b4e5d7c6053c90d6dedb`
- `POST /api/products`: Agrega un nuevo producto. Admite la subida de archivos `thumbnails`. (Solo administrador).
  - **Ejemplo de Cuerpo de Solicitud (desde Postman)**:
    ```json
    {
      "title": "Laptop Gamer Pro",
      "description": "Laptop de alto rendimiento para gaming.",
      "code": "LP123",
      "price": 1500,
      "stock": 10,
      "category": "Electrónica"
    }
    ```
- `PUT /api/products/:pid`: Actualiza un producto por ID. Admite la subida de archivos `thumbnails`. (Solo administrador).
  - **Ejemplo de Cuerpo de Solicitud (desde Postman)**:
    ```json
    {
      "title": "nashe"
    }
    ```
- `DELETE /api/products/:pid`: Elimina un producto por ID. (Solo administrador).
  - **Ejemplo (desde Postman)**: `http://localhost:3000/api/products/6852b4e5d7c6053c90d6dedb`

#### Carritos

- `POST /api/carts`: Crea un nuevo carrito vacío.
- `GET /api/carts`: Obtiene todos los carritos.
- `GET /api/carts/:cid`: Lista los productos en un carrito específico.
- `PUT /api/carts/:cid`: Actualiza un carrito con un arreglo de productos.
  - **Ejemplo de Cuerpo de Solicitud (desde Postman)**:
    ```json
    [
      {
        "_id": "67e5510d795c2b00d5ac2a45",
        "title": "Monitor 4K",
        "description": "Monitor de 27 pulgadas con resolución 4K.",
        "price": 400,
        "thumbnails": ["images/monitor1.jpg", "images/monitor2.jpg"],
        "code": "MN432",
        "stock": 12,
        "status": true,
        "category": "Electrónica",
        "__v": 0
      }
      // ... más objetos de productos
    ]
    ```
- `PUT /api/carts/:cid/products/:pid`: Actualiza la cantidad de un producto específico en un carrito.
- `DELETE /api/carts/:cid/products/:pid`: Elimina un producto específico de un carrito.
  - **Ejemplo (desde Postman)**: `http://localhost:3000/api/carts/6852b8a164a3b97671cb5242/products/6852bc6cab22cdcec6753adb`
- `DELETE /api/carts/:cid`: Elimina todos los productos de un carrito.
  - **Ejemplo (desde Postman)**: `http://localhost:3000/api/carts/6852b8a164a3b97671cb5242`

### Estructura del Proyecto

backend-2-coderhouse/
├── .gitignore
├── README.md
├── package.json
├── package-lock.json
└── src/
├── app.js
├── config/
│ ├── db.config.js
│ ├── dotenv.config.js
│ ├── multer.config.js
│ └── passport.config.js
├── controllers/
│ ├── cart.controller.js
│ ├── product.controller.js
│ ├── session.controller.js
│ └── user.controller.js
├── dao/
│ ├── dto/
│ │ ├── cart.dto.js
│ │ ├── product.dto.js
│ │ ├── user.dto.js
│ │ └── user.session.dto.js
│ ├── models/
│ │ ├── cart.model.js
│ │ ├── product.model.js
│ │ ├── ticket.model.js
│ │ └── user.model.js
│ ├── cart.dao.js
│ ├── product.dao.js
│ └── user.dao.js
├── middlewares/
│ └── validation.middleware.js
├── repositories/
│ ├── cart.repository.js
│ ├── product.repository.js
│ ├── session.repository.js
│ └── user.repository.js
├── routes/
│ ├── cart.router.js
│ ├── product.router.js
│ ├── session.router.js
│ └── user.router.js
└── utils/
├── \_\_dirname.js
├── bcrypt.js
├── cookieExtractor.js
├── jwt.js
└── passportCall.js

````markdown
# backend-2-coderhouse

Este proyecto es una aplicación backend desarrollada para Coderhouse, actualmente en desarrollo. Incluye autenticación de usuarios con JWT y Passport.js, junto con endpoints de API para gestionar productos y carritos de compra.

### Estado del Proyecto

El proyecto aún está en desarrollo. Las funcionalidades de productos y carritos aún requieren pruebas, y la funcionalidad de tickets aún no se ha desarrollado.

### Problemas Conocidos

La implementación actual enfrenta desafíos con los Objetos de Transferencia de Datos (DTOs) para sesiones y usuarios. Aunque se intentó usar dos DTOs y repositorios separados (uno para datos sensibles como contraseñas y otro sin ellos), surgió un problema al necesitar el ID de usuario para la creación del JWT con Passport.js. Esto dificulta la utilización completa del DTO, ya que el campo `id` no se solicita al registrar un usuario.

También hay un problema conocido con `ValidatorError: Path \`product\` is required` al intentar corregir errores relacionados con las operaciones del carrito.

### Características

- **Gestión de Usuarios**: Registro, inicio de sesión y recuperación de información de usuario.
- **Autenticación**: Implementada con Passport.js usando estrategias Local y JWT. Los JWT se utilizan para la gestión de sesiones.
- **Gestión de Productos**: Operaciones CRUD para productos, incluyendo paginación, ordenación y consulta. Las imágenes de productos se pueden subir.
- **Gestión de Carritos**: Crear, ver, actualizar y eliminar productos dentro de un carrito de compra.
- **Autorización Basada en Roles**: Los endpoints están protegidos según los roles de usuario (por ejemplo, `admin` para la gestión de productos y usuarios).
- **Validación de Entrada**: Middleware para validar datos de registro e inicio de sesión de usuarios.
- **Configuración de Entorno**: Utiliza `dotenv` para gestionar variables de entorno.

### Tecnologías Utilizadas

- **Node.js**
- **Express.js**: Framework web.
- **Mongoose**: Modelado de objetos MongoDB para Node.js.
- **Mongoose-Paginate-V2**: Para paginación en consultas de Mongoose.
- **Passport.js**: Para autenticación.
  - `passport-jwt`: Estrategia de autenticación JWT.
  - `passport-local`: Estrategia de autenticación por nombre de usuario y contraseña.
- **Bcrypt**: Para hashing de contraseñas.
- **JSON Web Token (JWT)**: Para el intercambio seguro de información.
- **Multer**: Para manejar `multipart/form-data`, principalmente para la subida de archivos.
- **Cookie-Parser**: Middleware para parsear cookies.
- **Express-Session**: Middleware para manejar sesiones.

### Instalación

Para configurar el proyecto localmente, sigue estos pasos:

1.  **Clonar el repositorio**:

    ```bash
    git clone [https://github.com/Sebastian0021/backend-2-coderhouse.git](https://github.com/Sebastian0021/backend-2-coderhouse.git)
    cd backend-2-coderhouse
    ```

2.  **Instalar dependencias**:

    ```bash
    npm install
    ```

3.  **Crear un archivo `.env`**:
    Crea un archivo `.env` en el directorio raíz del proyecto y añade las siguientes variables de entorno:

    ```
    PORT=3000
    URL_MONGO="your_mongodb_connection_string"
    JWT_SECRET="your_jwt_secret_key"
    JWT_EXPIRES_IN="1h"
    SESSION_SECRET="your_session_secret_key"
    COOKIE_AGE=3600000
    ```

    - `PORT`: El puerto en el que se ejecutará el servidor.
    - `URL_MONGO`: Tu cadena de conexión de MongoDB.
    - `JWT_SECRET`: Una clave secreta para firmar los JWT.
    - `JWT_EXPIRES_IN`: Tiempo de expiración para los JWT (por ejemplo, '1h', '7d').
    - `SESSION_SECRET`: Una clave secreta para firmar la cookie de ID de sesión.
    - `COOKIE_AGE`: La edad máxima (en milisegundos) de la cookie.

    El archivo `.env` y `node_modules` son ignorados por Git.

4.  **Ejecutar la aplicación**:

    ```bash
    npm run dev
    ```

    Esto iniciará el servidor usando `nodemon` y lo reiniciará automáticamente al detectar cambios en el código. Deberías ver `app listening on port 3000` (o el puerto especificado) y `MongoDB Connected: <host>` en la consola.

### Endpoints de la API

La API está estructurada con las siguientes rutas:

#### Sesiones

- `POST /api/sessions/register`: Registra un nuevo usuario.
  - **Ejemplo de Cuerpo de Solicitud (desde Postman)**:
    ```json
    {
      "first_name": "John",
      "last_name": "Doe",
      "email": "johndoe@example.com",
      "age": 30,
      "password": "hashedpasswordhere"
    }
    ```
- `POST /api/sessions/login`: Autentica un usuario y devuelve un JWT en una cookie.
  - **Ejemplo de Cuerpo de Solicitud (desde Postman)**:
    ```json
    {
      "email": "johndoe@example.com",
      "password": "hashedpasswordhere"
    }
    ```
- `GET /api/sessions/current`: Obtiene la información del usuario autenticado actual. Requiere JWT.
- `GET /api/sessions/logout`: Cierra la sesión del usuario eliminando la cookie JWT.

#### Usuarios

- `GET /api/users`: Obtiene todos los usuarios. (Solo administrador).
- `GET /api/users/current`: Obtiene la información del usuario autenticado actual.
- `GET /api/users/:uid`: Obtiene un usuario por ID. (Solo administrador).

#### Productos

- `GET /api/products`: Obtiene todos los productos. Admite parámetros `limit`, `page`, `sort` (precio asc/desc) y `query` (categoría/disponibilidad). (Solo administrador).
  - **Ejemplo (desde Postman)**: `http://localhost:3000/api/products?limit=5`
- `GET /api/products/:pid`: Obtiene un único producto por ID. (Solo administrador).
  - **Ejemplo (desde Postman)**: `http://localhost:3000/api/products/6852b4e5d7c6053c90d6dedb`
- `POST /api/products`: Agrega un nuevo producto. Admite la subida de archivos `thumbnails`. (Solo administrador).
  - **Ejemplo de Cuerpo de Solicitud (desde Postman)**:
    ```json
    {
      "title": "Laptop Gamer Pro",
      "description": "Laptop de alto rendimiento para gaming.",
      "code": "LP123",
      "price": 1500,
      "stock": 10,
      "category": "Electrónica"
    }
    ```
- `PUT /api/products/:pid`: Actualiza un producto por ID. Admite la subida de archivos `thumbnails`. (Solo administrador).
  - **Ejemplo de Cuerpo de Solicitud (desde Postman)**:
    ```json
    {
      "title": "nashe"
    }
    ```
- `DELETE /api/products/:pid`: Elimina un producto por ID. (Solo administrador).
  - **Ejemplo (desde Postman)**: `http://localhost:3000/api/products/6852b4e5d7c6053c90d6dedb`

#### Carritos

- `POST /api/carts`: Crea un nuevo carrito vacío.
- `GET /api/carts`: Obtiene todos los carritos.
- `GET /api/carts/:cid`: Lista los productos en un carrito específico.
- `PUT /api/carts/:cid`: Actualiza un carrito con un arreglo de productos.
  - **Ejemplo de Cuerpo de Solicitud (desde Postman)**:
    ```json
    [
      {
        "_id": "67e5510d795c2b00d5ac2a45",
        "title": "Monitor 4K",
        "description": "Monitor de 27 pulgadas con resolución 4K.",
        "price": 400,
        "thumbnails": ["images/monitor1.jpg", "images/monitor2.jpg"],
        "code": "MN432",
        "stock": 12,
        "status": true,
        "category": "Electrónica",
        "__v": 0
      }
      // ... más objetos de productos
    ]
    ```
- `PUT /api/carts/:cid/products/:pid`: Actualiza la cantidad de un producto específico en un carrito.
- `DELETE /api/carts/:cid/products/:pid`: Elimina un producto específico de un carrito.
  - **Ejemplo (desde Postman)**: `http://localhost:3000/api/carts/6852b8a164a3b97671cb5242/products/6852bc6cab22cdcec6753adb`
- `DELETE /api/carts/:cid`: Elimina todos los productos de un carrito.
  - **Ejemplo (desde Postman)**: `http://localhost:3000/api/carts/6852b8a164a3b97671cb5242`

### Estructura del Proyecto
````

backend-2-coderhouse/
├── .gitignore
├── README.md
├── package.json
├── package-lock.json
└── src/
├── app.js
├── config/
│ ├── db.config.js
│ ├── dotenv.config.js
│ ├── multer.config.js
│ └── passport.config.js
├── controllers/
│ ├── cart.controller.js
│ ├── product.controller.js
│ ├── session.controller.js
│ └── user.controller.js
├── dao/
│ ├── dto/
│ │ ├── cart.dto.js
│ │ ├── product.dto.js
│ │ ├── user.dto.js
│ │ └── user.session.dto.js
│ ├── models/
│ │ ├── cart.model.js
│ │ ├── product.model.js
│ │ ├── ticket.model.js
│ │ └── user.model.js
│ ├── cart.dao.js
│ ├── product.dao.js
│ └── user.dao.js
├── middlewares/
│ └── validation.middleware.js
├── repositories/
│ ├── cart.repository.js
│ ├── product.repository.js
│ ├── session.repository.js
│ └── user.repository.js
├── routes/
│ ├── cart.router.js
│ ├── product.router.js
│ ├── session.router.js
│ └── user.router.js
└── utils/
├── \_\_dirname.js
├── bcrypt.js
├── cookieExtractor.js
├── jwt.js
└── passportCall.js

```

### Esquema de la Base de Datos

#### Modelo de Usuario (`src/dao/models/user.model.js`)

* `first_name`: String, requerido
* `last_name`: String, requerido
* `email`: String, único
* `age`: Number, requerido
* `password`: String, requerido (hash)
* `cart`: ObjectId (referencia a 'Carts')
* `role`: String (predeterminado: "user")

#### Modelo de Producto (`src/dao/models/product.model.js`)

* `title`: String, requerido
* `description`: String, requerido
* `code`: String, requerido
* `price`: Number, requerido
* `status`: Boolean, requerido
* `stock`: Number, requerido
* `category`: String, requerido
* `thumbnails`: Array de Strings

#### Modelo de Carrito (`src/dao/models/cart.model.js`)

* `products`: Array de objetos
    * `product`: ObjectId (referencia a 'products'), requerido
    * `quantity`: Number (predeterminado: 1)

#### Modelo de Ticket (`src/dao/models/ticket.model.js`)

* `code`: String, único, requerido
* `purchase_datetime`: Date, requerido (predeterminado: fecha/hora actual)
* `amount`: Number, requerido
* `purchaser`: String (referencia a 'User'), requerido

### Cómo Empezar con Postman

Se proporciona una colección de Postman `BE2.postman_collection.json` para ayudarte a probar los endpoints de la API.

1.  **Importar la colección**:
    * Abre Postman.
    * Haz clic en "Importar" y selecciona el archivo `BE2.postman_collection.json`.
2.  **Configurar el entorno**:
    * La colección utiliza `http://localhost:3000` como URL base. Asegúrate de que tu servidor se esté ejecutando en este puerto.
3.  **Enviar solicitudes**:
    * Navega por las carpetas "sessions", "user", "product" y "cart" en la colección importada.
    * Abre cada solicitud y haz clic en "Enviar" para probar los endpoints.
    * Recuerda iniciar sesión primero para obtener un JWT para las rutas autenticadas. El JWT se almacenará como una cookie. Para las rutas `current` y otras rutas protegidas, asegúrate de que el JWT se envíe correctamente (por ejemplo, a través de cookies o el encabezado Authorization con el token "Bearer").
    * Para las rutas que requieren un `_id` (por ejemplo, `getProductById`, `updateProduct`, `deleteProduct`, `updateCart`, `deleteProductFromCart`, `deleteAllProductsFromCart`), deberás reemplazar los IDs de marcador de posición en las URLs de Postman con IDs reales de tu base de datos.
```
