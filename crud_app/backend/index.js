
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 3001;
const FILE = './db.json';

app.use(cors());
app.use(express.json());

// Leer tareas
app.get('/api/tareas', (req, res) => {
  const data = JSON.parse(fs.readFileSync(FILE));
  res.json(data);
});

// Agregar tarea
app.post('/api/tareas', (req, res) => {
  const tareas = JSON.parse(fs.readFileSync(FILE));
  tareas.push(req.body);
  fs.writeFileSync(FILE, JSON.stringify(tareas, null, 2));
  res.status(201).json({ message: 'Tarea agregada' });
});

// Eliminar tarea
app.delete('/api/tareas/:id', (req, res) => {
  let tareas = JSON.parse(fs.readFileSync(FILE));
  tareas = tareas.filter(t => t.id !== parseInt(req.params.id));
  fs.writeFileSync(FILE, JSON.stringify(tareas, null, 2));
  res.json({ message: 'Tarea eliminada' });
});

app.listen(PORT, () => {
  console.log(`Servidor backend en http://localhost:${PORT}`);
});
