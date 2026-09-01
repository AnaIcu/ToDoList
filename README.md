# ToDo API

API REST mínima de tareas almacenadas en memoria, construida con Node.js y Express. Sin base de datos, sin autenticación. 

## Requisitos

- Node.js 22+ (LTS)
- npm

## Instalación y ejecución local

```powershell
npm install
npm start
```

El servidor arranca en `http://localhost:3000` (o el puerto definido en la variable de entorno `PORT`).

## Endpoints

| Método | Ruta          | Descripción                              |
|--------|---------------|-------------------------------------------|
| GET    | `/health`     | Verifica que el servicio está activo      |
| POST   | `/tasks`      | Crea una tarea                            |
| GET    | `/tasks`      | Lista todas las tareas                    |
| PUT    | `/tasks/:id`  | Actualiza `title` y/o `completed`         |
| DELETE | `/tasks/:id`  | Elimina una tarea                         |

### GET /health

```powershell
curl.exe http://localhost:3000/health
```

Respuesta `200`:
```json
{ "status": "ok" }
```

### POST /tasks

```powershell
curl.exe -X POST http://localhost:3000/tasks -H "Content-Type: application/json" -d '{\"title\":\"Comprar leche\"}'
```

Respuesta `201`:
```json
{ "id": 1, "title": "Comprar leche", "completed": false }
```

Respuesta `400` si `title` falta o está vacío.

### GET /tasks

```powershell
curl.exe http://localhost:3000/tasks
```

Respuesta `200`:
```json
[{ "id": 1, "title": "Comprar leche", "completed": false }]
```

### PUT /tasks/:id

```powershell
curl.exe -X PUT http://localhost:3000/tasks/1 -H "Content-Type: application/json" -d '{\"completed\":true}'
```

Respuesta `200` con la tarea actualizada, `404` si el id no existe, `400` si los datos son inválidos.

### DELETE /tasks/:id

```powershell
curl.exe -i -X DELETE http://localhost:3000/tasks/1
```

Respuesta `204` sin cuerpo, `404` si el id no existe.

## Docker

### Construir la imagen

```powershell
docker build -t anaicust/todo-api:1.0 .
```

> El build usa `npm ci`, por lo que requiere que `package-lock.json` esté presente y sincronizado con `package.json`.

### Ejecutar el contenedor

```powershell
docker run -p 3000:3000 anaicust/todo-api:1.0
```

La API queda disponible en `http://localhost:3000`, igual que en ejecución local.

### Publicar en Docker Hub (opcional)

```powershell
docker login
docker push anaicust/todo-api:1.0
```

## Uso de inteligencia artificial

| Prompt utilizado | Aporte de la IA |
|---|---|
| "Quiero crear una aplicación mínima para una actividad académica de DevSecOps. Usa Node.js con Express y JavaScript común. La aplicación será una API REST de tareas almacenadas en memoria, con crear, listar, actualizar, eliminar y un endpoint `/health`. Antes de generar código, explícame la estructura de archivos más simple y espera mi confirmación." | Propuso una estructura mínima de dos archivos (`package.json` y `server.js`, todo en un único archivo por el tamaño reducido de la API) y esperó confirmación antes de generar código. |
| "La estructura está aprobada. Genera `package.json` y `server.js` para la API. Usa Express, validación básica de datos, códigos HTTP adecuados y no agregues dependencias adicionales. Al terminar, explícame cómo probar cada endpoint manualmente." | Generó `package.json` (con Express como única dependencia) y `server.js` con los cinco endpoints, validación de `title`/`completed` y códigos HTTP 200/201/204/400/404. Explicó cómo probar cada endpoint con `curl.exe` en PowerShell. |
| "Genera un Dockerfile sencillo y seguro para esta aplicación, además de `.dockerignore` y README. Debe usar una imagen ligera de Node.js, instalar solo dependencias de producción, exponer el puerto 3000 y ejecutar `npm start`. Explica brevemente cada archivo." | Generó un `Dockerfile` inicial basado en `node:20-alpine` con instalación de solo dependencias de producción, un `.dockerignore` (excluyendo `node_modules`, `.env`, logs y `.git`) y un `README.md` con instrucciones de instalación, documentación de endpoints y uso de Docker. Explicó el propósito de cada archivo antes de crearlo. |
| "SonarQube Cloud detectó problemas de seguridad en el Dockerfile. Explica qué riesgo representa cada hallazgo y propone únicamente cambios mínimos para corregirlos, sin modificar la lógica de la aplicación." | Explicó los riesgos de usar `npm install` (builds no reproducibles) y de ejecutar scripts de dependencias de terceros sin restricción, y de copiar todo el contexto de build con `COPY . .` (superficie de imagen innecesaria). Aplicó únicamente los cambios mínimos correspondientes: `RUN npm ci --omit=dev --ignore-scripts` y `COPY server.js ./`, sin alterar la lógica de la aplicación. |

Todo el código y la configuración generados por la IA fueron revisados y probados manualmente antes de incorporarse al proyecto.
