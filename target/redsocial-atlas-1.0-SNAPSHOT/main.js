// Importar las funciones necesarias de Firebase y otros archivos
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { addRoutes, onNavigate } from './lib/router/index.js';
import { home } from './components/views/home.js';
import { login } from './components/views/login.js';
import { register } from './components/views/register.js';
import { feed } from './components/views/feed.js';

// Definir las rutas y asignar las vistas correspondientes a cada ruta
addRoutes({
  '/': home, // Ruta principal: página de inicio
  '/login': login, // Ruta de inicio de sesión
  '/register': register, // Ruta de registro
  '/feed': feed, // Ruta del feed
});

/* Cuando la ventana se ha cargado completamente, llamar a la función
onNavigate para cargar la vista correspondiente según la ruta actual */
window.onload = () => {
  onNavigate(window.location.pathname);
};

/* Manejar el evento de navegación cuando se realiza
el historial de retroceso o avance en el navegador */
window.onpopstate = () => {
  onNavigate(window.location.pathname);
};

// Verificar si hay un usuario autenticado mediante Firebase
onAuthStateChanged(getAuth(), (user) => {
  if (user) {
    // Si hay un usuario autenticado, navegar a la página de feed
    onNavigate('/feed');
  } else {
    // Si no hay un usuario autenticado, navegar a la página de inicio
    onNavigate('/');
  }
});

// Asegurarse de que el código anterior se ejecute después de que el DOM haya cargado completamente
// document.addEventListener('DOMContentLoaded', () => {
//   ...
// });