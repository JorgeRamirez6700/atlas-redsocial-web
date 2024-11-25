/* 
    Created on : Nov 19, 2024, 5:13:39 AM
    Author     : RavenOS
*/

// feed.js
import { createButton, createImage, createTextArea } from './utils';
import { createNewPost, editExistingPost, deleteExistingPost } from './postHandler';
import { logOut } from './auth';

// Elementos de la interfaz de usuario
const containerFeed = document.getElementById('feedContainer');
const textBox = createTextArea('Escribe algo...', ['text-box']);
const sendButton = createButton(['compose-option', 'compose-send'], 'Publicar', async () => {
  const postData = textBox.value;
  if (postData.trim() !== '') {
    await createNewPost(postData);
    textBox.value = ''; // Limpiar el textarea después de publicar
    loadPosts(); // Recargar los posts después de publicar
  }
});
const backgroundImgFeed = createImage(['backgroundImgF'], '../imagenes/background.png');
const logoutButton = createButton(['logoutBtn'], 'Cerrar sesión', logOut);

// Agregar los elementos al contenedor
containerFeed.appendChild(backgroundImgFeed);
containerFeed.appendChild(textBox);
containerFeed.appendChild(sendButton);
containerFeed.appendChild(logoutButton);

// Función para cargar y mostrar los posts
async function loadPosts() {
  try {
    const posts = await getPosts();
    containerFeed.innerHTML = ''; // Limpiar el contenedor de posts para evitar duplicados

    // Mostrar los posts existentes
    posts.forEach(post => {
      const postElement = document.createElement('div');
      postElement.classList.add('post');

      // Aquí agregas el contenido del post (puedes agregar más detalles como autor, fecha, etc.)
      const postText = document.createElement('p');
      postText.textContent = post.text;
      postElement.appendChild(postText);

      // Botón de editar
      const editButton = createButton([], 'Editar', () => editExistingPost(post._id));
      postElement.appendChild(editButton);

      // Botón de eliminar
      const deleteButton = createButton([], 'Eliminar', async () => {
        await deleteExistingPost(post._id);
        loadPosts(); // Recargar los posts después de eliminar
      });
      postElement.appendChild(deleteButton);

      containerFeed.appendChild(postElement);
    });
  } catch (error) {
    console.error('Error al obtener los posts:', error);
  }
}

// Función para obtener los posts desde el backend
async function getPosts() {
  try {
    const response = await fetch('/api/posts'); // Ruta que definiste en postRoutes.js
    const posts = await response.json();
    return posts;
  } catch (error) {
    console.error('Error al obtener los posts:', error);
  }
}

// Cargar los posts al cargar la página
window.onload = () => {
  loadPosts();
};
