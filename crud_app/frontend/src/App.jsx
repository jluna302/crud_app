import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState('');

  const obtenerTareas = async () => {
    const res = await axios.get('http://localhost:3001/api/tareas');
    setTareas(res.data);
  };

  const agregarTarea = async () => {
    const nueva = { id: Date.now(), texto: nuevaTarea };
    await axios.post('http://localhost:3001/api/tareas', nueva);
    setNuevaTarea('');
    obtenerTareas();
  };

  const eliminarTarea = async (id) => {
    await axios.delete(`http://localhost:3001/api/tareas/${id}`);
    obtenerTareas();
  };

  useEffect(() => {
    obtenerTareas();
  }, []);

  return (
    <div>
      <h1>Lista de Tareas</h1>
      <input
        type="text"
        value={nuevaTarea}
        onChange={(e) => setNuevaTarea(e.target.value)}
      />
      <button onClick={agregarTarea}>Agregar</button>
      <ul>
        {tareas.map((tarea) => (
          <li key={tarea.id}>
            {tarea.texto}
            <button onClick={() => eliminarTarea(tarea.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
