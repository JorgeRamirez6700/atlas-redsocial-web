/* 
    Created on : Nov 19, 2024, 5:13:39 AM
    Author     : RavenOS
*/

// Importar funciones de autenticación
import { signInGoogle, loginUser, user } from '../../lib/firebase/autenticar';
// Importar función de navegación
import { onNavigate } from '../../lib/router/index';

export function login() {
  // Crear elemento 'main' y asignarlo a la variable loginContainer
  const loginContainer = document.createElement('main');
  // Agregar la clase 'containerL' al elemento loginContainer
  loginContainer.classList = 'containerL';

  // Crear elemento 'img' para la imagen de fondo
  const loginBackgroundImg = document.createElement('img');
  // Agregar la clase 'backgroundImgL' al elemento loginBackgroundImg
  loginBackgroundImg.classList.add('backgroundImgL');
  // Agregar loginBackgroundImg como hijo de loginContainer
  loginContainer.appendChild(loginBackgroundImg);

  // Crear elemento 'img' para el logo
  const loginLogo = document.createElement('img');
  // Agregar la clase 'logoL' al elemento loginLogo
  loginLogo.classList.add('logoL');
  // Establecer la fuente de la imagen del logo
  loginLogo.src = '../imagenes/logo-atlas.png';
  // Agregar loginLogo como hijo de loginContainer

  loginContainer.appendChild(loginLogo);

  // Crear elemento 'label' para el texto "Nombre"
  const loginNameLabel = document.createElement('label');
  // Establecer el texto del elemento loginNameLabel
  loginNameLabel.textContent = 'Nombre:';
  // Establecer el atributo 'for' del elemento loginNameLabel
  loginNameLabel.setAttribute('for', 'nombre-InputL');
  // Establecer el id del elemento loginNameLabel
  loginNameLabel.id = 'nombre-LabelL';
  // Agregar la clase 'nombreLabelL' al elemento loginNameLabel
  loginNameLabel.classList.add('nombreLabelL');
  // Agregar loginNameLabel como hijo de loginContainer
  loginContainer.appendChild(loginNameLabel);

  // Crear elemento 'input' para el campo de nombre
  const loginNameInput = document.createElement('input');
  // Establecer el atributo 'type' del elemento loginNameInput
  loginNameInput.setAttribute('type', 'text');
  // Establecer el atributo 'id' del elemento loginNameInput
  loginNameInput.setAttribute('id', 'nombre-InputL');
  // Agregar la clase 'nombreInputLog' al elemento loginNameInput
  loginNameInput.classList.add('nombreInputLog');
  // Agregar loginNameInput como hijo de loginContainer
  loginContainer.appendChild(loginNameInput);

  // Crear elemento 'label' para el texto "Email"
  const loginEmailLabel = document.createElement('label');
  // Establecer el atributo 'for' del elemento loginEmailLabel
  loginEmailLabel.setAttribute('for', 'email-InputL');
  // Establecer el id del elemento loginEmailLabel
  loginEmailLabel.id = 'email-LabelL';
  // Establecer el texto del elemento loginEmailLabel
  loginEmailLabel.textContent = 'Email:';
  // Agregar la clase 'emailLabelL' al elemento loginEmailLabel
  loginEmailLabel.classList.add('emailLabelL');
  // Agregar loginEmailLabel como hijo de loginContainer
  loginContainer.append(loginEmailLabel);

  // Crear elemento 'input' para el campo de email
  const loginEmailInput = document.createElement('input');
  // Establecer el atributo 'id' del elemento loginEmailInput
  loginEmailInput.setAttribute('id', 'email-InputL');
  // Establecer el atributo 'type' del elemento loginEmailInput
  loginEmailInput.setAttribute('type', 'email');
  // Agregar la clase 'emailInputL' al elemento loginEmailInput
  loginEmailInput.classList.add('emailInputL');
  // Agregar loginEmailInput como hijo de loginContainer
  loginContainer.append(loginEmailInput);

  // Crear elemento 'label' para el texto "Contraseña"
  const loginPasswordLabel = document.createElement('label');
  // Establecer el texto del elemento loginPasswordLabel
  loginPasswordLabel.textContent = 'Contraseña:';
  // Establecer el atributo 'for' del elemento loginPasswordLabel
  loginPasswordLabel.setAttribute('for', 'contraseña-InputL');
  // Establecer el id del elemento loginPasswordLabel
  loginPasswordLabel.id = 'contraseña-LabelL';
  // Agregar la clase 'contraseñaLabelL' al elemento loginPasswordLabel
  loginPasswordLabel.classList.add('contraseñaLabelL');
  // Agregar loginPasswordLabel como hijo de loginContainer
  loginContainer.appendChild(loginPasswordLabel);

  // Crear elemento 'input' para el campo de contraseña
  const loginPasswordInput = document.createElement('input');
  // Establecer el atributo 'type' del elemento loginPasswordInput
  loginPasswordInput.setAttribute('type', 'password');
  // Establecer el atributo 'id' del elemento loginPasswordInput
  loginPasswordInput.setAttribute('id', 'contraseña-InputL');
  // Establecer el atributo 'name' del elemento loginPasswordInput
  loginPasswordInput.setAttribute('name', 'contraseña');
  // Agregar la clase 'contraseñaInputL' al elemento loginPasswordInput
  loginPasswordInput.classList.add('contraseñaInputL');
  // Agregar loginPasswordInput como hijo de loginContainer
  loginContainer.appendChild(loginPasswordInput);

  // Crear elemento 'p' para el párrafo de error
  const errorParagraph = document.createElement('p');
  // Agregar errorParagraph como hijo de loginContainer
  loginContainer.appendChild(errorParagraph);

  // Crear elemento 'button' para el botón "Continuar"
  const loginContinueBtn = document.createElement('button');
  // Agregar la clase 'continuarBtnL' al elemento loginContinueBtn
  loginContinueBtn.classList.add('continuarBtnL');
  // Establecer el texto del elemento loginContinueBtn
  loginContinueBtn.textContent = 'Continuar';
  // Establecer el id del elemento loginContinueBtn
  loginContinueBtn.id = 'continuar-BtnL';
  // Agregar loginContinueBtn como hijo de loginContainer
  loginContainer.appendChild(loginContinueBtn);

  // Crear elemento 'p' para el mensaje de error
  const loginMessage = document.createElement('p');
  // Establecer el texto del elemento loginMessage
  loginMessage.textContent = 'Debes iniciar sesión para continuar';
  // Agregar la clase 'login-mensaje' al elemento loginMessage
  loginMessage.classList.add('login-mensaje');
  // Agregar loginMessage como hijo de loginContainer

  loginContainer.appendChild(loginMessage);
  // Establecer el estilo 'display' del elemento loginMessage a 'none'
  loginMessage.style.display = 'none';

  // Se añade un evento 'click' al botón 'loginContinueBtn'
  loginContinueBtn.addEventListener('click', async (event) => {
    // Previene el comportamiento predeterminado del evento
    event.preventDefault();
    // Obtiene el valor del campo de entrada de correo electrónico
    const email = loginEmailInput.value;
    // Obtiene el valor del campo de entrada de contraseña
    const contrasena = loginPasswordInput.value;
    // Obtiene el valor del campo de entrada de nombre
    const nombre = loginNameInput.value;
    // Verifica si alguno de los campos está vacío
    if (!email || !contrasena || !nombre) {
      // Muestra el mensaje de error
      loginMessage.style.display = 'block';
      // Finaliza la ejecución de la función
      return;
    }
    try {
      // Intenta iniciar sesión del usuario
      await loginUser(email, contrasena);
      if (user) { // Verifica si hay un usuario autenticado
        onNavigate('/feed'); // Navega al feed
      } else {
        // console.log('No hay usuario autenticado');
      }
    } catch (error) {
      const errorCode = error.code; // Obtiene el código de error
      const errorMessage = error.message; // Obtiene el mensaje de error
      // Muestra el mensaje de error en el párrafo correspondiente
      errorParagraph.innerHTML = `Error ${errorCode}: ${errorMessage}`;
    }
  });

  // Crea un elemento 'button' para el botón "Continuar con Google"
  const loginGoogleBtn = document.createElement('button');
  // Agrega la clase 'googleBtnL' al botón
  loginGoogleBtn.classList.add('googleBtnL');
  // Establece el texto del botón como 'Continuar con Google'
  loginGoogleBtn.textContent = 'Continuar con Google';
  // Establece el ID del botón como 'continuar-GoogleBtnL'
  loginGoogleBtn.id = 'continuar-GoogleBtnL';
  // Agrega el botón al contenedor de inicio de sesión
  loginContainer.appendChild(loginGoogleBtn);

  /*
  // Crea un elemento 'img' para el logo de Google
  const loginGoogleLogo = document.createElement('img');
  // Establece la ruta de la imagen del logo de Google
  loginGoogleLogo.src = '../imagenes/logo-google.png';
  // Agrega el logo de Google como hijo del botón
  loginGoogleBtn.appendChild(loginGoogleLogo);
  */

  // Crea un elemento 'p' para el mensaje de error de Google
  const loginGoogleMessage = document.createElement('p');
  // Establece el texto del mensaje de error
  loginGoogleMessage.textContent = 'Debes iniciar sesión para continuar';
  // Agrega la clase 'login-mensaje' al mensaje de error
  loginGoogleMessage.classList.add('login-mensaje');
  // Agrega el mensaje de error al contenedor de inicio de sesión
  loginContainer.appendChild(loginGoogleMessage);
  // Oculta el mensaje de error de Google inicialmente
  loginGoogleMessage.style.display = 'none';

  // Se añade un evento 'click' al botón 'loginGoogleBtn'
  loginGoogleBtn.addEventListener('click', async (event) => {
    // Previene el comportamiento predeterminado del evento
    event.preventDefault();
    try {
      // Intenta iniciar sesión con Google
      await signInGoogle();
      // console.log('Inicio de sesión satisfactorio');
      // Navega al feed
      onNavigate('/feed');
    } catch (error) {
      // console.log('Error al iniciar sesión', error);
      // Obtiene el código de error
      const errorCode = error.code;
      // Obtiene el mensaje de error
      const errorMessage = error.message;
      // Obtiene el elemento con el ID 'error-message'
      const errorDiv = document.getElementById('error-message');
      // Muestra el mensaje de error en el elemento correspondiente
      errorDiv.innerHTML = `Error ${errorCode}: ${errorMessage}`;
    }
  });
  // Agrega el botón de inicio de sesión con Google al contenedor de inicio de sesión
  loginContainer.appendChild(loginGoogleBtn);

  // Retorna el elemento div (con sus elementos hijos dentro)
  return loginContainer;
}