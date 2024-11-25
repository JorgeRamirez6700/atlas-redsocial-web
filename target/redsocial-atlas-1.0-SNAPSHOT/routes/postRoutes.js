/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */

const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController'); // Asegúrate de que el controlador existe

// Rutas para los posts
router.post('/create', postController.createPost); // Ruta para crear un post
router.get('/', postController.getPosts); // Ruta para obtener todos los posts
router.put('/edit', postController.editPost); // Ruta para editar un post
router.delete('/delete', postController.deletePost); // Ruta para eliminar un post

module.exports = router;


// postRoutes.js (Backend)

import express from 'express';
import { Post } from '../models/Post'; // Asegúrate de que el modelo Post exista en tu backend


// Obtener todos los posts
router.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find(); // Si usas MongoDB con Mongoose
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

export { router };

