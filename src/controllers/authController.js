/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */

// controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Registrar nuevo usuario
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Verificar si el usuario ya existe
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'El usuario ya existe' });

    // Crear nuevo usuario
    const newUser = new User({ username, email, password });
    await newUser.save();

    // Generar token JWT
    const token = jwt.sign({ userId: newUser._id }, 'secretkey', { expiresIn: '1h' });

    res.status(201).json({ token, message: 'Usuario registrado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};

// Iniciar sesión de usuario
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Usuario no encontrado' });

    // Verificar la contraseña
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Contraseña incorrecta' });

    // Generar token JWT
    const token = jwt.sign({ userId: user._id }, 'secretkey', { expiresIn: '1h' });

    res.status(200).json({ token, message: 'Login exitoso' });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};

// Endpoint para verificar si el usuario está autenticado
exports.checkAuth = (req, res) => {
  if (req.session && req.session.userId) {
    // Si hay una sesión activa, el usuario está autenticado
    res.status(200).json({ authenticated: true, user: req.session.userId });
  } else {
    // Si no hay sesión, el usuario no está autenticado
    res.status(401).json({ authenticated: false });
  }
};

module.exports = { registerUser, loginUser };

