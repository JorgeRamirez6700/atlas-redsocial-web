import express from 'express';
import Post from '../models/Post.js'; 

const router = express.Router();

// Obtener todos los posts
router.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find(); 
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los posts' });
  }
});

// Crear un nuevo post
router.post('/api/posts', async (req, res) => {
  try {
    const { text } = req.body;
    const newPost = new Post({ text });
    await newPost.save();
    res.json(newPost);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el post' });
  }
});

// Editar un post existente
router.put('/api/posts/:id', async (req, res) => {
  try {
    const { text } = req.body;
    const post = await Post.findByIdAndUpdate(req.params.id, { text }, { new: true });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Error al editar el post' });
  }
});

// Eliminar un post
router.delete('/api/posts/:id', async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: 'Post eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el post' });
  }
});

export default router;
