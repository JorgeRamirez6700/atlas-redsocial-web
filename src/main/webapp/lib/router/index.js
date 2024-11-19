const ROUTES = {}; // Objeto para almacenar las rutas

// HISTORIAL
export const onNavigate = (pathname) => {
  // Si no hay una función asociada a la ruta, se establece la ruta actual como '/'
  const path = typeof ROUTES[pathname] !== 'function' ? pathname : '/';
  // Agrega la ruta al historial de navegación
  window.history.pushState({}, path, window.location.origin + pathname);
  const rootSection = document.getElementById('root');
  // Borra el contenido del elemento con id 'root'
  rootSection.innerHTML = '';
  // Agrega el componente correspondiente a la ruta en el elemento 'root'
  rootSection.append(ROUTES[pathname]());
};

export const addRoutes = (routes) => {
  Object.keys(routes).reduce((currentRoutes, pathname) => {
    // Agrega la ruta y su componente correspondiente al objeto ROUTES
    currentRoutes[pathname] = routes[pathname];
    return currentRoutes;
  }, ROUTES);
};