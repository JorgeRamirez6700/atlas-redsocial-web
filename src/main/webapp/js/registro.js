document.getElementById('formRegistro').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevenir el envío si hay errores

  const username = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const avatar = document.getElementById('avatar').files[0];
  const errorMsg = document.getElementById('errorMsg');
  
  // Limpieza de mensajes previos
  errorMsg.textContent = '';

  // Validaciones personalizadas
  if (username.length < 4 || username.length > 20) {
    errorMsg.textContent = 'El nombre de usuario debe tener entre 4 y 20 caracteres.';
    return;
  }

  if (!/^[a-zA-Z0-9]+$/.test(username)) {
    errorMsg.textContent = 'El nombre de usuario solo puede contener caracteres alfanuméricos.';
    return;
  }

  if (password.length < 6) {
    errorMsg.textContent = 'La contraseña debe tener al menos 6 caracteres.';
    return;
  }

  if (avatar && avatar.size > 2 * 1024 * 1024) { // Tamaño máximo 2 MB
    errorMsg.textContent = 'El archivo de avatar no debe exceder los 2 MB.';
    return;
  }

  // Si todas las validaciones pasan, enviar el formulario
  this.submit();
});
