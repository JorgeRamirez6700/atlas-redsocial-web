<<<<<<< HEAD
<<<<<<< HEAD
/* 
    Created on : Nov 19, 2024, 5:13:39 AM
    Author     : RavenOS
*/

=======
=======
>>>>>>> parent of 6d8b8bd (Agregadas vistas y CSS, Deberia Funcionar.)
import { createUser, signInGoogle } from '../../lib/firebase/autenticar';
import { onNavigate } from '../../lib/router/index';
>>>>>>> parent of 6d8b8bd (Agregadas vistas y CSS, Deberia Funcionar.)

export function register() {
  const registerContainer = document.createElement('main');
  registerContainer.classList.add('containerR');

  const registerBackgroundImg = document.createElement('img');
  registerBackgroundImg.classList.add('backgroundImgR');
  registerContainer.appendChild(registerBackgroundImg);

  const registerLogo = document.createElement('img');
  registerLogo.classList.add('logoR');
  registerLogo.src = '../imagenes/logo-marchantes.png';
  registerContainer.appendChild(registerLogo);

  const registerForm = document.createElement('form');
  registerForm.id = 'formulario-Register';
  registerForm.classList.add('formularioR');
  registerContainer.appendChild(registerForm);

  const NameLabelRegister = document.createElement('label');
  NameLabelRegister.textContent = 'Nombre completo:';
  NameLabelRegister.setAttribute('for', 'nombre-InputR');

  const nameInputRegister = document.createElement('input');
  nameInputRegister.type = 'text';
  nameInputRegister.id = 'nombre-InputR';
  nameInputRegister.required = true;
  nameInputRegister.classList.add('nombreInputR');

  registerForm.append(NameLabelRegister, nameInputRegister);

  const emailLabelRegister = document.createElement('label');
  emailLabelRegister.textContent = 'Correo electrónico:';
  emailLabelRegister.setAttribute('for', 'email-InputR');

  const registerEmailInput = document.createElement('input');
  registerEmailInput.type = 'email';
  registerEmailInput.id = 'email-InputR';
  registerEmailInput.required = true;
  registerEmailInput.classList.add('emailInputR');

  registerForm.append(emailLabelRegister, registerEmailInput);

  const registerPasswordLabel = document.createElement('label');
  registerPasswordLabel.textContent = 'Contraseña:';
  registerPasswordLabel.setAttribute('for', 'contrasena');

  const registerPasswordInput = document.createElement('input');
  registerPasswordInput.type = 'password';
  registerPasswordInput.id = 'contrasena-InputR';
  registerPasswordInput.required = true;
  registerPasswordInput.classList.add('contrasenaInputR');

  registerForm.append(registerPasswordLabel, registerPasswordInput);

  registerContainer.append(registerForm);

  const registerContinueButton = document.createElement('button');
  registerContinueButton.classList.add('continuarBtnR');
  registerContinueButton.textContent = 'Continuar';
  registerContainer.appendChild(registerContinueButton);

  const registerMessage = document.createElement('p');
  registerMessage.textContent = 'Debes registrarte para continuar';
  registerMessage.classList.add('registro-mensaje');
  registerForm.appendChild(registerMessage);

  registerMessage.style.display = 'none';

  registerContinueButton.addEventListener('click', async (event) => {
    event.preventDefault();
    const name = nameInputRegister.value;
    const email = registerEmailInput.value;
    const password = registerPasswordInput.value;
    if (!name || !email || !password) {
      registerMessage.style.display = 'block';
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      });
      const data = await response.json();
      if (data.success) {
        onNavigate('/feed');
      } else {
        registerMessage.textContent = `Error: ${data.message}`;
        registerMessage.style.display = 'block';
      }
    } catch (error) {
      registerMessage.textContent = `Error: ${error.message}`;
      registerMessage.style.display = 'block';
    }
  });
}
