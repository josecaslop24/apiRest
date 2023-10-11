const express = require('express');
const app = express();
const port = 80; // Puedes cambiar el puerto si lo deseas

// Middleware para procesar datos JSON
app.use(express.json());

const students = [
    {id: 1, name: 'Jose', age: 27},
    {id: 1, name: 'Mari', age: 25}
]

app.get('/', (req, res) => {
    res.json({ mensaje: 'INICIO' });
  });

// Ruta de ejemplo
app.get('/api/st', (req, res) => {
  res.send(students);
});

app.get('/api/hola', (req, res) => {
    res.json({ mensaje: 'Hola, mundo!' });
  });

// Ruta para manejar solicitudes POST
app.post('/api/ejemplo', (req, res) => {
  const datos = req.body;
  // Realiza alguna lógica con los datos
  res.json({ mensaje: 'Solicitud POST recibida', datos });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
