/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */

const Post = require('../models/Post');

// Crear un nuevo post
exports.createPost = async (req, res) => {
  try {
    const { title, content, authorId } = req.body;
    const newPost = new Post({ title, content, authorId });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el post.' });
  }
};

// Obtener todos los posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('authorId', 'username');
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los posts.' });
  }
};

// Editar un post
exports.editPost = async (req, res) => {
  try {
    const { postId, title, content } = req.body;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post no encontrado.' });
    }
    post.title = title || post.title;
    post.content = content || post.content;
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Error al editar el post.' });
  }
};

// Eliminar un post
exports.deletePost = async (req, res) => {
  try {
    const { postId } = req.body;
    const post = await Post.findByIdAndDelete(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post no encontrado.' });
    }
    res.status(200).json({ message: 'Post eliminado.' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el post.' });
  }
};
