// Importar las funciones necesarias y vistas
import { addRoutes, onNavigate } from './lib/router/index.js';
import { home } from '../views/home.js';
import { login } from '../views/login.js';
import { register } from '../views/register.js';
import { feed } from '../views/feed.js';

// Definir las rutas y asignar las vistas correspondientes a cada ruta
addRoutes({
  '/': home, // Ruta principal: página de inicio
  '/login': login, // Ruta de inicio de sesión
  '/register': register, // Ruta de registro
  '/feed': feed, // Ruta del feed
});

// Cuando la ventana se ha cargado completamente, llamar a la función onNavigate
// para cargar la vista correspondiente según la ruta actual
window.onload = () => {
  onNavigate(window.location.pathname);
};

// Manejar el evento de navegación cuando se realiza el historial de retroceso o avance en el navegador
window.onpopstate = () => {
  onNavigate(window.location.pathname);
};

// Verificar si hay un usuario autenticado (sin Firebase, usando cookies o sesiones del backend)
const checkAuth = async () => {
  try {
    // Hacer una solicitud al servidor para verificar si el usuario está autenticado
    const response = await fetch('/api/auth/check', { method: 'GET', credentials: 'same-origin' });

    if (response.ok) {
      const user = await response.json();
      // Si el usuario está autenticado, navegar al feed
      onNavigate('/feed');
    } else {
      // Si no hay usuario autenticado, navegar a la página de inicio
      onNavigate('/');
    }
  } catch (error) {
    console.error('Error al verificar autenticación:', error);
    // Si hay error en la verificación, navegar a la página de inicio
    onNavigate('/');
  }
};

// Llamar a checkAuth cuando la página cargue para verificar si el usuario está autenticado
checkAuth();
