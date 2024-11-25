import express from 'express';
import connectDB from './db.js';
import postRoutes from './routes/postRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Permite leer JSON del cuerpo de la solicitud

// Conectar a MongoDB
connectDB();

// Usar las rutas de posts
app.use('/api/posts', postRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
