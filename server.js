const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Almacenamiento en memoria: se pierde al reiniciar el servidor.
let tasks = [];
let nextId = 1;

// GET /health - confirma que el servicio está activo.
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// POST /tasks - crea una tarea a partir de title.
app.post('/tasks', (req, res) => {
  const { title } = req.body;

  if (typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ error: 'title es requerido y debe ser un string no vacío' });
  }

  const task = { id: nextId++, title, completed: false };
  tasks.push(task);

  res.status(201).json(task);
});

// GET /tasks - lista todas las tareas.
app.get('/tasks', (req, res) => {
  res.status(200).json(tasks);
});

// PUT /tasks/:id - actualiza title y/o completed de una tarea existente.
app.put('/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }

  const { title, completed } = req.body;

  if (title !== undefined) {
    if (typeof title !== 'string' || title.trim() === '') {
      return res.status(400).json({ error: 'title debe ser un string no vacío' });
    }
    task.title = title;
  }

  if (completed !== undefined) {
    if (typeof completed !== 'boolean') {
      return res.status(400).json({ error: 'completed debe ser un booleano' });
    }
    task.completed = completed;
  }

  res.status(200).json(task);
});

// DELETE /tasks/:id - elimina una tarea existente.
app.delete('/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }

  tasks.splice(index, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
