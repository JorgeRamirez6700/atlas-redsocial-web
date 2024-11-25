/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */

const express = require('express');
const authRoutes = require('../routes/authRoutes');
const postRoutes = require('../routes/postRoutes');

const router = express.Router();

// Definir las rutas de la API
router.use('/api/auth', authRoutes);
router.use('/api/posts', postRoutes);

module.exports = router;

