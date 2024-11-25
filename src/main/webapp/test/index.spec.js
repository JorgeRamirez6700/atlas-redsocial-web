/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */


// Importo la función addRoutes desde el archivo '../src/lib/router/index.js'
import { addRoutes } from '../src/lib/router/index.js';
// Importar la función home desde el archivo '../src/components/views/home.js'
import { home } from '../src/components/views/home.js';



// Comentario para describir la prueba
// home
test('La función home debe retornar un contenedor con sus elementos', () => {
  // Crear un elemento div y asignarlo a la variable 'container'
  const container = document.createElement('div');

  // Agregar el resultado de la función home como hijo del contenedor
  container.appendChild(home());

  // Comprobar si el contenedor contiene un elemento con la clase 'backgroundImgH'
  expect(container.querySelector('.backgroundImgH')).toBeTruthy();
  // Comprobar si el contenedor contiene un elemento con la clase 'logoH'
  expect(container.querySelector('.logoH')).toBeTruthy();
  // Comprobar si el contenedor contiene un elemento con la clase 'loginBtnH'
  expect(container.querySelector('.loginBtnH')).toBeTruthy();
  // Comprobar si el contenedor contiene un elemento con la clase 'registerLinkH'
  expect(container.querySelector('.registerLinkH')).toBeTruthy();

  // Crear una función simulada 'onNavigateMock' utilizando jest.fn()
  const onNavigateMock = jest.fn();

  // Guardar el valor original de addRoutes.onNavigate en la variable 'originalOnNavigate'
  const originalOnNavigate = addRoutes.onNavigate;
  // Asignar la función simulada 'onNavigateMock' a addRoutes.onNavigate
  addRoutes.onNavigate = onNavigateMock;

  // Hacer clic en el elemento con la clase 'loginBtnH'
  container.querySelector('.loginBtnH').click();
  // Comprobar si la función simulada 'onNavigateMock' fue llamada con el argumento '/login'
  expect(onNavigateMock).toHaveBeenCalledWith('/login');

  // Hacer clic en el elemento con la clase 'registerLinkH'
  container.querySelector('.registerLinkH').click();
  // Comprobar si la función simulada 'onNavigateMock' fue llamada con el argumento '/register'
  expect(onNavigateMock).toHaveBeenCalledWith('/register');

  // Borrar el contenido HTML del contenedor
  container.innerHTML = '';

  // Restaurar el valor original de addRoutes.onNavigate
  addRoutes.onNavigate = originalOnNavigate;
});
