/* 
    Created on : Nov 19, 2024, 5:13:39 AM
    Author     : RavenOS
*/

import { createUser, signInGoogle } from '../../lib/firebase/autenticar';
import { onNavigate } from '../../lib/router/index';

export function register() {
  // Creación de div y asignación a variable container
  const registerContainer = document.createElement('main');
  registerContainer.classList.add('containerR');

  // Imagen de fondo
  const registerBackgroundImg = document.createElement('img');
  registerBackgroundImg.classList.add('backgroundImgR');
  registerContainer.appendChild(registerBackgroundImg);

  // Logo
  const registerLogo = document.createElement('img');
  registerLogo.classList.add('logoR');
  registerLogo.src = '../imagenes/logo-atlas.png';
  registerContainer.appendChild(registerLogo);

  // Formulario
  const registerForm = document.createElement('form');
  registerForm.id = 'formulario-Register';
  registerForm.classList.add('formularioR');
  registerContainer.appendChild(registerForm);

  // Nombre label e input
  const NameLabelRegister = document.createElement('label');
  NameLabelRegister.textContent = 'Nombre completo:';
  NameLabelRegister.setAttribute('for', 'nombre-InputR');

  const nameInputRegister = document.createElement('input');
  nameInputRegister.type = 'text';
  nameInputRegister.id = 'nombre-InputR';
  nameInputRegister.required = true;
  nameInputRegister.classList.add('nombreInputR');

  registerForm.append(NameLabelRegister, nameInputRegister);

  // Email label e input
  const emailLabelRegister = document.createElement('label');
  emailLabelRegister.textContent = 'Correo electrónico:';
  emailLabelRegister.setAttribute('for', 'email-InputR');

  const registerEmailInput = document.createElement('input');
  registerEmailInput.type = 'email';
  registerEmailInput.id = 'email-InputR';
  registerEmailInput.required = true;
  registerEmailInput.classList.add('emailInputR');

  registerForm.append(emailLabelRegister, registerEmailInput);

  // Contraseña
  const registerPasswordLabel = document.createElement('label');
  registerPasswordLabel.textContent = 'Contraseña:';
  registerPasswordLabel.setAttribute('for', 'contrasena');

  const registerPasswordInput = document.createElement('input');
  registerPasswordInput.type = 'password';
  registerPasswordInput.id = 'contrasena-InputR';
  registerPasswordInput.required = true;
  registerPasswordInput.classList.add('contrasenaInputR');

  registerForm.append(registerPasswordLabel, registerPasswordInput);

  // Agregar el formulario al body del documento
  registerContainer.append(registerForm);

  // Botón 'Continuar'

  const registerContinueButton = document.createElement('button');
  registerContinueButton.classList.add('continuarBtnR');
  registerContinueButton.textContent = 'Continuar';
  registerContainer.appendChild(registerContinueButton);

  // Click y mensaje de error
  // console.log('Se crea msj de error');
  const registerMessage = document.createElement('p');
  registerMessage.textContent = 'Debes registrarte para continuar';
  registerMessage.classList.add('registro-mensaje');
  registerForm.appendChild(registerMessage);

  registerMessage.style.display = 'none';

  registerContinueButton.addEventListener('click', async (event) => {
    // console.log('Click en btn Continuar');
    event.preventDefault();
    const name = nameInputRegister.value; // Obtener el valor del nombre
    const email = registerEmailInput.value;
    const password = registerPasswordInput.value;
    if (!name || !email || !password) {
      // console.log('Nombre, email o contraseña vacíos, se muestra msj de error');
      registerMessage.style.display = 'block';
      return;
    }
    try {
      await createUser(name, email, password);
      // console.log('Usuario creado satisfactoriamente');
      onNavigate('/feed');
    } catch (error) {
      // console.log('Error al crear usuario:', error);
      const errorCode = error.code;
      const errorMessage = error.message;
      const errorDiv = document.getElementById('error-message');
      errorDiv.innerHTML = `Error ${errorCode}: ${errorMessage}`;
    }
  });

  // Botón 'Continuar con Google'
  const registerGoogleButton = document.createElement('button');
  registerGoogleButton.classList.add('googleBtnR');
  registerGoogleButton.textContent = 'Continuar con Google';

  /*
  // Logo de Google
  const logoGoogleRegister = document.createElement('img');
  logoGoogleRegister.src = '../imagenes/logo-google.png';
  // logoGoogleRegister.alt = 'Iniciar sesión con Google';
  registerGoogleButton.appendChild(logoGoogleRegister);
*/

  // Click y mensaje de error Google
  const registerGoogleMessage = document.createElement('p');
  registerGoogleMessage.textContent = 'Debes registrarte para continuar';
  registerGoogleMessage.classList.add('registro-mensaje');
  registerForm.appendChild(registerGoogleMessage);

  registerGoogleMessage.style.display = 'none';

  registerGoogleButton.addEventListener('click', async (event) => {
    // console.log('Click en btn Continuar con Google');
    event.preventDefault();
    try {
      await signInGoogle();
      // console.log('Registro satisfactorio');
      onNavigate('/feed');
    } catch (error) {
      // console.log('Error al registrarse', error);
      const errorCode = error.code;
      const errorMessage = error.message;
      const errorDiv = document.getElementById('error-message');
      errorDiv.innerHTML = `Error ${errorCode}: ${errorMessage}`;
    }
  });

  registerContainer.appendChild(registerGoogleButton);
  return registerContainer;
}