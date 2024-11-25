/* 
    Created on : Nov 19, 2024, 5:13:39 AM
    Author     : RavenOS
*/

// Importo la función onNavigate desde el módulo '../../lib/router/index'
import { onNavigate } from '../../lib/router/index';

// Defino la función home
export function home() {
  // Creo un elemento <main> y lo asigno a la variable containerHome
  const containerHome = document.createElement('main');
  // Agrego la clase 'containerHome' al elemento containerHome
  containerHome.classList.add('containerHome');

  // Creo un elemento <img> y lo asigno a la variable backgroundImgHome
  const backgroundImgHome = document.createElement('img');
  // Agrego la clase 'backgroundImgH' al elemento backgroundImgHome
  backgroundImgHome.classList.add('backgroundImgH');
  // Agrego el elemento backgroundImgHome como hijo del elemento containerHome
  containerHome.appendChild(backgroundImgHome);

  // Creo un elemento <img> y lo asigno a la variable logoHome
  const logoHome = document.createElement('img');
  // Agrego la clase 'logoH' al elemento logoHome
  logoHome.classList.add('logoH');
  // Establezco la ruta de la imagen para el atributo src del elemento logoHome
  logoHome.src = '../imagenes/logo-atlas.png';
  // Agrego el elemento logoHome como hijo del elemento containerHome
  containerHome.appendChild(logoHome);

  // Creo un elemento <button> y lo asigno a la variable loginButtonHome
  const loginButtonHome = document.createElement('button');
  // Agrego la clase 'loginBtnH' al elemento loginButtonHome
  loginButtonHome.classList.add('loginBtnH');
  // Establezco el texto 'Iniciar sesión' como contenido del elemento loginButtonHome
  loginButtonHome.textContent = 'Iniciar sesión';

  // Agrego un evento de clic al elemento loginButtonHome
  loginButtonHome.addEventListener('click', (event) => {
    // Evito el comportamiento predeterminado del evento de clic
    event.preventDefault();
    // Llamo a la función onNavigate con la ruta '/login' como argumento
    onNavigate('/login');
  });
  // Agrego el elemento loginButtonHome como hijo del elemento containerHome
  containerHome.appendChild(loginButtonHome);

  // Creo un elemento <p> y lo asigno a la variable registerLinkHome
  const registerLinkHome = document.createElement('p');
  // Agrego la clase 'registerLinkH' al elemento registerLinkHome
  registerLinkHome.classList.add('registerLinkH');
  // Establezco el contenido HTML del elemento registerLinkHome
  registerLinkHome.innerHTML = '¿No tienes una cuenta? <a href="#">Regístrate</a>.';

  // Agrego un evento de clic al elemento registerLinkHome
  registerLinkHome.addEventListener('click', (event) => {
    // Evito el comportamiento predeterminado del evento de clic
    event.preventDefault();
    // Llamo a la función onNavigate con la ruta '/register' como argumento
    onNavigate('/register');
  });
  // Agrego el elemento registerLinkHome como hijo del elemento containerHome
  containerHome.appendChild(registerLinkHome);
  // Retorno el contenedor principal
  return containerHome;
}