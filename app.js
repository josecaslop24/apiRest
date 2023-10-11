const express = require('express');
const jwt = require("jsonwebtoken")

const secret = "hola"
const app = express();
const port = 80; // Puedes cambiar el puerto si lo deseas

// Middleware para procesar datos JSON
app.use(express.json());

const students = [
    {id: 1, name: 'Jose', age: 27},
    {id: 1, name: 'Mari', age: 25}
]

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});

app.post('/api/token', (req, res) => {

  const {id: sub,name} = {id: req.body.id, name: req.body.name}

  const token = jwt.sign({
    sub,
    name,
    exp: Date.now() + 60 * 1000
  }, secret);

  res.send({ token });

});

app.get('/', (req, res) => {
  try {

    const token = req.headers.authorization.split(" ")[1]
    const paylod = jwt.verify(token, secret)

    if(Date.now() > paylod.exp){
      return res.status(401).send({error: "TOKE EXPIRADO"})
    }

    res.json({ mensaje: 'INICIO API REST V 1.0.2' });
  } catch (error) {
    res.status(401).send({error: error.mensaje})
  }
    
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

