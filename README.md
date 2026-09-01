# ToDo API

API REST mínima de tareas almacenadas en memoria, construida con Node.js y Express. Sin base de datos, sin autenticación. 

## Requisitos

- Node.js 20+ (LTS)
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
docker build -t TU_USUARIO_DOCKERHUB/todo-api:1.0 .
```

### Ejecutar el contenedor

```powershell
docker run -p 3000:3000 TU_USUARIO_DOCKERHUB/todo-api:1.0
```

La API queda disponible en `http://localhost:3000`, igual que en ejecución local.

### Publicar en Docker Hub (opcional)

```powershell
docker login
docker push TU_USUARIO_DOCKERHUB/todo-api:1.0
```
