import express from 'express';
import path from 'path';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 8080;

// Configuración de middleware
app.use(cors());
app.use(express.json());

// Ruta para servir archivos estáticos de CSS, JS, e imágenes
app.use('/css', express.static(path.resolve('public/css')));
app.use('/js', express.static(path.resolve('public/js')));
app.use('/images', express.static(path.resolve('public/images')));

// Ruta para servir index.html
app.get('*', (req, res) => {
  res.sendFile(path.resolve('public/index.html'));
});

// Conexión a MongoDB (si es necesario)
import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost:27017/atlas', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectado a MongoDB');
    app.listen(port, () => {
      console.log(`Servidor corriendo en http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Error al conectar con MongoDB:', error);
  });

console.log(path.resolve('public/css'));  // Verifica la ruta completa
console.log(path.resolve('public/js'));
console.log(path.resolve('public/images'));
