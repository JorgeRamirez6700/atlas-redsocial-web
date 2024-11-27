/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */

<<<<<<< HEAD
export function login() {
  const loginContainer = document.createElement('main');
  loginContainer.classList = 'containerL';

  const loginBackgroundImg = document.createElement('img');
  loginBackgroundImg.classList.add('backgroundImgL');
  loginContainer.appendChild(loginBackgroundImg);

  const loginLogo = document.createElement('img');
  loginLogo.classList.add('logoL');
  loginLogo.src = '../imagenes/logo-atlas.png';
  loginContainer.appendChild(loginLogo);

  const loginNameLabel = document.createElement('label');
  loginNameLabel.textContent = 'Nombre:';
  loginNameLabel.setAttribute('for', 'nombre-InputL');
  loginNameLabel.id = 'nombre-LabelL';
  loginNameLabel.classList.add('nombreLabelL');
  loginContainer.appendChild(loginNameLabel);

  const loginNameInput = document.createElement('input');
  loginNameInput.setAttribute('type', 'text');
  loginNameInput.setAttribute('id', 'nombre-InputL');
  loginNameInput.classList.add('nombreInputLog');
  loginContainer.appendChild(loginNameInput);

  const loginEmailLabel = document.createElement('label');
  loginEmailLabel.setAttribute('for', 'email-InputL');
  loginEmailLabel.id = 'email-LabelL';
  loginEmailLabel.textContent = 'Email:';
  loginEmailLabel.classList.add('emailLabelL');
  loginContainer.append(loginEmailLabel);

  const loginEmailInput = document.createElement('input');
  loginEmailInput.setAttribute('id', 'email-InputL');
  loginEmailInput.setAttribute('type', 'email');
  loginEmailInput.classList.add('emailInputL');
  loginContainer.append(loginEmailInput);

  const loginPasswordLabel = document.createElement('label');
  loginPasswordLabel.textContent = 'Contraseña:';
  loginPasswordLabel.setAttribute('for', 'contraseña-InputL');
  loginPasswordLabel.id = 'contraseña-LabelL';
  loginPasswordLabel.classList.add('contraseñaLabelL');
  loginContainer.appendChild(loginPasswordLabel);

  const loginPasswordInput = document.createElement('input');
  loginPasswordInput.setAttribute('type', 'password');
  loginPasswordInput.setAttribute('id', 'contraseña-InputL');
  loginPasswordInput.setAttribute('name', 'contraseña');
  loginPasswordInput.classList.add('contraseñaInputL');
  loginContainer.appendChild(loginPasswordInput);

  const errorParagraph = document.createElement('p');
  loginContainer.appendChild(errorParagraph);

  const loginContinueBtn = document.createElement('button');
  loginContinueBtn.classList.add('continuarBtnL');
  loginContinueBtn.textContent = 'Continuar';
  loginContinueBtn.id = 'continuar-BtnL';
  loginContainer.appendChild(loginContinueBtn);

  const loginMessage = document.createElement('p');
  loginMessage.textContent = 'Debes iniciar sesión para continuar';
  loginMessage.classList.add('login-mensaje');
  loginContainer.appendChild(loginMessage);
  loginMessage.style.display = 'none';

  loginContinueBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    const email = loginEmailInput.value;
    const contrasena = loginPasswordInput.value;
    const nombre = loginNameInput.value;
    if (!email || !contrasena || !nombre) {
      loginMessage.style.display = 'block';
      return;
    }

    try {
      // Realiza una solicitud de inicio de sesión a tu API de autenticación
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: contrasena,
        }),
      });
      const data = await response.json();
      if (data.success) {
        onNavigate('/feed'); // Navega al feed
      } else {
        errorParagraph.innerHTML = `Error: ${data.message}`;
      }
    } catch (error) {
      errorParagraph.innerHTML = `Error: ${error.message}`;
    }
  });

  return loginContainer;
}
=======

>>>>>>> parent of 6d8b8bd (Agregadas vistas y CSS, Deberia Funcionar.)
