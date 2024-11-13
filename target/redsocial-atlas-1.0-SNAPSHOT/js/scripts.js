// Variables y elementos de la página
document.addEventListener('DOMContentLoaded', () => {
  // Manejo de modales
  const modalBtns = document.querySelectorAll('.crear-publicacion-btn, #login-link, #register-link');
  const modals = document.querySelectorAll('.modal');
  const closeBtns = document.querySelectorAll('.close');

  // Abrir modales
  modalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetModal = e.target.dataset.modal;
      document.getElementById(targetModal).style.display = 'flex';
    });
  });

  // Cerrar modales
  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modals.forEach(modal => modal.style.display = 'none');
    });
  });

  // Creación de publicación
  const crearPostForm = document.getElementById('crear-post-form');
  if (crearPostForm) {
    crearPostForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const contenido = e.target.contenido.value;
      crearPost(contenido);
      e.target.reset(); // Limpiar formulario
      document.getElementById('crear-post-modal').style.display = 'none'; // Cerrar modal
    });
  }
});

// Función para crear publicación (ejemplo básico)
function crearPost(contenido) {
  const feed = document.querySelector('.feed');
  const post = document.createElement('section');
  post.classList.add('post');
  post.innerHTML = `
    <div class="post-header">
      <img src="img/avatar.png" alt="Avatar" class="avatar">
      <h3>Usuario Anónimo</h3>
    </div>
    <p>${contenido}</p>
    <div class="post-actions">
      <button class="like-btn">❤️ 0 Likes</button>
      <button class="comment-btn">💬 Comentar</button>
    </div>
  `;
  feed.insertBefore(post, feed.firstChild);
}

// Manejo de "likes"
document.addEventListener('click', (e) => {
  if (e.target && e.target.classList.contains('like-btn')) {
    let likesCount = parseInt(e.target.textContent.split(' ')[1]);
    likesCount++;
    e.target.textContent = `❤️ ${likesCount} Likes`;
  }
});

async function login(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const response = await fetch('/login', {
    method: 'POST',
    body: formData
  });
  const result = await response.json();
  if (result.success) {
    alert('Login exitoso');
    // Manejar redirección o sesión
  } else {
    alert('Credenciales incorrectas');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = e.target.username.value.trim();
      const password = e.target.password.value.trim();

      if (username === '' || password === '') {
        alert('Por favor, completa todos los campos.');
        return;
      }

      // Aquí podrías agregar la lógica para autenticar al usuario con tu backend
      alert(`Usuario ${username} autenticado (ficticio).`);
      window.location.href = 'index.html'; // Redirige al index tras autenticarse
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('register-form');

  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = e.target.username.value.trim();
      const email = e.target.email.value.trim();
      const password = e.target.password.value;
      const confirmPassword = e.target['confirm-password'].value;

      if (username === '' || email === '' || password === '' || confirmPassword === '') {
        alert('Por favor, completa todos los campos.');
        return;
      }

      if (password.length < 6) {
        alert('La contraseña debe tener al menos 6 caracteres.');
        return;
      }

      if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden.');
        return;
      }

      // Aquí puedes agregar lógica para enviar los datos al backend
      alert(`Usuario ${username} registrado correctamente (ficticio).`);
      window.location.href = 'login.html'; // Redirige al login tras registrarse
    });
  }
});
