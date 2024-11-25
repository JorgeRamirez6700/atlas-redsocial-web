/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */

// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Para encriptar contraseñas

// Esquema de Usuario
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Encriptar la contraseña antes de guardarla en la base de datos
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next(); // Si no se modificó la contraseña, no encriptar
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Método para comparar contraseñas
userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);

