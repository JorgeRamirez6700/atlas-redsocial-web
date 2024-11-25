/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rutas para la autenticación
router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/logout', authController.logout);

// Ruta para verificar si el usuario está autenticado
router.get('/check', authController.checkAuth);

module.exports = router;
