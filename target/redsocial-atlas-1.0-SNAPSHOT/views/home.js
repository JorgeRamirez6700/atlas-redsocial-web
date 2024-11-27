/* 
<<<<<<< HEAD
    Created on : Nov 19, 2024, 5:13:39 AM
    Author     : RavenOS
*/
// home.js

import { createButton, createRegisterLink } from './utils';

const containerHome = document.getElementById('homeContainer');
const loginButtonHome = createButton(['loginBtnH'], 'Iniciar sesión', (event) => {
  event.preventDefault();
  onNavigate('/login');
});
const registerLinkHome = createRegisterLink();

// Agregar los elementos al contenedor
containerHome.appendChild(loginButtonHome);
containerHome.appendChild(registerLinkHome);

const goToLogin = () => {
  window.location.href = '/login';
};

const goToRegister = () => {
  window.location.href = '/register';
};

document.getElementById('login-btn').addEventListener('click', goToLogin);
document.getElementById('register-btn').addEventListener('click', goToRegister);

=======
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */


>>>>>>> parent of 6d8b8bd (Agregadas vistas y CSS, Deberia Funcionar.)
