import { getAuth, signOut } from 'firebase/auth';
import { onNavigate } from '../../lib/router/index';
import {
  createPost,
  verPosts,
  editPost,
  deletePost,
  isAuthor,
} from '../../lib/firebase/autenticar';

export function feed() {
  // Creamos un elemento <main> y le asignamos el id 'container-feed' y la clase 'containerF'
  const containerFeed = document.createElement('main');
  containerFeed.id = 'container-feed';
  containerFeed.classList.add('containerF');

  // Creamos un elemento <img> y le asignamos la clase 'backgroundImgF'
  const backgroundImgFeed = document.createElement('img');
  backgroundImgFeed.classList.add('backgroundImgF');
  containerFeed.appendChild(backgroundImgFeed);

  // Creamos un elemento <img> y le asignamos la clase 'logoF'
  const logoFeed = document.createElement('img');
  logoFeed.classList.add('logoF');
  logoFeed.src = '../imagenes/logo-marchantes-feed.png';
  containerFeed.appendChild(logoFeed);

  // Creamos un elemento <div> y le asignamos la clase 'compose-container'
  const container = document.createElement('div');
  container.classList.add('compose-container');

  /*
  Creamos un elemento <textarea> y le asignamos la clase
  'compose-text' y el placeholder '¿Qué hay de nuevo?'
  */
  const textBox = document.createElement('textarea');
  textBox.classList.add('compose-text');
  textBox.placeholder = '¿Qué hay de nuevo?';
  container.appendChild(textBox);

  // Creamos un elemento <div> y le asignamos la clase 'compose-options'
  const optionsBox = document.createElement('div');
  optionsBox.classList.add('compose-options');
  container.appendChild(optionsBox);

  /*
  Creamos un elemento <label> y le asignamos la clase 'compose-option' y
  el atributo 'for' con el valor 'compose-image-upload'
  */
  const imageButton = document.createElement('label');
  imageButton.classList.add('compose-option');
  imageButton.htmlFor = 'compose-image-upload';

  /*
  // Creamos un elemento <i> y le asignamos las clases 'fas' y 'fa-image'
  const imageIcon = document.createElement('i');
  imageIcon.classList.add('fas', 'fa-image');
  imageButton.appendChild(imageIcon);
  optionsBox.appendChild(imageButton);
  */

  const imageUpload = document.createElement('input');
  imageUpload.type = 'file';
  imageUpload.id = 'compose-image-upload';
  imageUpload.multiple = true;
  imageUpload.accept = 'image/';
  optionsBox.appendChild(imageUpload);

  const sendButton = document.createElement('button');
  sendButton.classList.add('compose-option', 'compose-send');
  sendButton.textContent = 'Publicar';
  optionsBox.appendChild(sendButton);

  // Añadimos un evento 'click' al botón 'sendButton'
  sendButton.addEventListener('click', async () => {
    const postData = textBox.value; // Obtenemos el valor del campo de texto 'textBox'

    try {
      // Llamamos a la función 'createPost' pasando el contenido del post como argumento
      await createPost(postData);
      // console.log('Post creado exitosamente');
      textBox.value = ''; // Vaciamos el campo de texto 'textBox'
    } catch (error) {
      // console.error('Error al crear el post:', error);
    }
  });

  // Añadimos el elemento 'container' al 'containerFeed'
  containerFeed.appendChild(container);

  // Creamos un botón de cerrar sesión
  const logoutButton = document.createElement('button'); // Creamos un elemento de botón
  logoutButton.id = 'logout-button'; // Asignamos el ID 'logout-button' al botón
  logoutButton.classList.add('logout-button'); // Añadimos la clase 'logout-button' al botón
  logoutButton.textContent = 'Salir'; // Establecemos el texto del botón como 'Salir'

  // Añadimos un evento 'click' al botón 'logoutButton'
  logoutButton.addEventListener('click', async () => {
    try {
      const auth = getAuth(); // Obtenemos la instancia de autenticación
      await signOut(auth); // Llamamos a la función 'signOut' para cerrar la sesión
      // console.log('Cierre de sesión exitoso');
      onNavigate('/'); // Navegamos al inicio después del cierre de sesión
    } catch (error) {
      // console.error('Error durante el cierre de sesión:', error);
    }
  });

  // Añadimos el botón 'logoutButton' al 'containerFeed'
  containerFeed.appendChild(logoutButton);

  // Creamos un elemento <section> y le asignamos el id 'posts-container'
  const postsContainer = document.createElement('section');
  postsContainer.id = 'posts-container';

  // Añadimos el 'postsContainer' al 'containerFeed'
  containerFeed.appendChild(postsContainer);
  // console.log(getAuth().currentUser);

  // Definimos una función asíncrona llamada 'updatePost' que recibe un parámetro 'snapshot'
  async function updatePost(snapshot) {
    // Limpiamos el contenido del 'postsContainer'
    postsContainer.innerHTML = '';

    try {
      // Iteramos sobre cada documento en 'snapshot'
      snapshot.forEach((doc, index) => {
        const post = doc.data();

        // Creamos un elemento <article>
        const listItem = document.createElement('article');
        const postContent = `${post.name == null ? post.email : post.name}: ${post.text}`;
        listItem.textContent = postContent;

        // Creamos un elemento <textarea> para editar el campo de texto
        const editField = document.createElement('textarea');
        editField.classList.add('edit-field');
        editField.value = post.text;
        editField.style.display = 'none';
        listItem.appendChild(editField);

        // Creamos un botón de edición
        const editButton = document.createElement('button');
        editButton.id = 'edit-button';
        editButton.classList.add('edit-button');
        editButton.textContent = 'Editar';
        editButton.dataset.id = doc.id;

        // Creamos un contenedor para el botón de edición
        const editButtonContainer = document.createElement('div');
        editButtonContainer.appendChild(editButton);

        // Si el usuario es el autor del post, mostramos el botón de edición
        if (isAuthor(post)) {
          editButtonContainer.style.display = 'block';
        } else {
          editButtonContainer.style.display = 'none';
        }

        // Añadimos un evento 'click' al botón de edición para mostrar el campo de edición
        editButton.addEventListener('click', () => {
          listItem.removeChild(listItem.firstChild);
          editField.style.display = 'block';
          listItem.insertBefore(editField, listItem.firstChild);
        });

        listItem.appendChild(editButtonContainer);

        // Añadimos otro evento 'click' al botón de edición para mostrar el campo de edición
        editButton.addEventListener('click', () => {
          listItem.removeChild(listItem.firstChild);
          editField.style.display = 'block';
          listItem.insertBefore(editField, listItem.firstChild);
        });
        // Creamos un botón de guardar
        const saveButton = document.createElement('button');
        saveButton.id = 'save-button';
        saveButton.classList.add('save-button');
        saveButton.textContent = 'Guardar';

        // Creamos un contenedor para el botón de guardar
        const saveButtonContainer = document.createElement('div');
        saveButtonContainer.appendChild(saveButton);

        // Si el usuario es el autor del post, mostramos el botón de guardar
        if (isAuthor(post)) {
          saveButton.style.display = 'block';
        } else {
          saveButton.style.display = 'none';
        }

        // Añadimos un evento 'click' al botón de guardar
        saveButton.addEventListener('click', async () => {
          const newPostData = editField.value;
          try {
            await editPost(doc.id, { text: newPostData });
            // console.log('Post editado exitosamente');
            listItem.removeChild(listItem.firstChild);
            listItem.textContent = `${post.name == null ? post.email : post.name}: ${newPostData}`;
          } catch (error) {
            // console.error('Error al editar el post:', error);
          }
        });

        listItem.appendChild(saveButton);
        listItem.appendChild(saveButtonContainer);

        // Creamos un botón de eliminar post
        const deleteButton = document.createElement('button');
        deleteButton.id = 'delete-button';
        deleteButton.classList.add('delete-button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.dataset.id = doc.id;

        // Creamos un contenedor para el botón de eliminar post
        const deleteButtonContainer = document.createElement('div');
        deleteButtonContainer.appendChild(deleteButton);

        // Si el usuario es el autor del post, mostramos el botón de eliminar post
        if (isAuthor(post)) {
          deleteButton.style.display = 'block';
        } else {
          deleteButton.style.display = 'none';
        }

        // Añadimos un evento 'click' al botón de eliminar post
        deleteButton.addEventListener('click', async (event) => {
          const postId = event.target.dataset.id;
          try {
            await deletePost(postId);
            // console.log('Post eliminado exitosamente');
          } catch (error) {
            // console.error('Error al eliminar el post:', error);
          }
        });

        listItem.appendChild(deleteButton);
        postsContainer.appendChild(listItem);
        listItem.appendChild(deleteButtonContainer);

        // Separador
        if (index !== snapshot.size - 1) {
          const separator = document.createElement('hr');
          separator.classList.add('post-separator');
          postsContainer.appendChild(separator);
        }
      });
    } catch (error) {
      // console.error('Error al obtener los posts:', error);
    }
  }

  // Llamamos a la función 'verPosts' pasando como argumento la función 'updatePost'
  verPosts(updatePost);

  // Retornamos el elemento 'containerFeed'
  return containerFeed;
}