import { initializeApp } from 'firebase/app'; // Importar la función initializeApp de firebase/app
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
} from 'firebase/auth'; // Importar funciones y objetos relacionados con la autenticación de firebase/auth
import {
  addDoc,
  collection,
  getFirestore,
  query,
  onSnapshot,
  Timestamp,
  orderBy,
  doc,
  updateDoc,
  deleteDoc,
  // Importar funciones y objetos relacionados con la base de datos de firestore
} from 'firebase/firestore';
// Importar la configuración de Firebase
import { firebaseConfig } from './firebase';

// Inicializar la aplicación de Firebase con la configuración proporcionada
initializeApp(firebaseConfig);
const auth = getAuth(); // Obtener la instancia del servicio de autenticación

// Función para actualizar el nombre del usuario
async function updateDisplayName(user, nombre) {
  try {
    await updateProfile(user, {
      displayName: nombre,
    });
  } catch (error) {
    // Manejar el error al actualizar el nombre del usuario
    // console.log('Error al actualizar el nombre del usuario:', error);
  }
}

export async function createUser(name, email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    // El usuario se ha registrado exitosamente
    const user = userCredential.user;
    await updateDisplayName(user, name); // Actualizar el nombre del usuario
  } catch (error) {
    // Manejar los errores aquí
  }
}

export async function loginUser() {
  try {
    // El usuario ha iniciado sesión exitosamente
  } catch (error) {
    // Manejar los errores aquí
  }
}

// Configuración para iniciar sesión con cuenta de Google
const provider = new GoogleAuthProvider();
export async function signInGoogle() {
  // Iniciar sesión utilizando una ventana emergente con cuenta de Google
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    // Manejar los errores aquí
  }
}

const firestore = getFirestore(); // Obtener la instancia del servicio de firestore

export function createPost(data) {
  return addDoc(collection(firestore, 'post'), {
    text: data,
    email: auth.currentUser.email,
    date: Timestamp.now(),
    name: auth.currentUser.displayName,
  });
}

export function verPosts(callback) {
  const queryPost = query(collection(firestore, 'post'), orderBy('date', 'desc'));
  onSnapshot(queryPost, callback);
}

// Obtener el usuario actual que ha iniciado sesión
export const user = auth.currentUser;

if (user) {
  // Hay un usuario autenticado
} else {
  // No hay ningún usuario autenticado
}

// EDITAR POST
export async function editPost(postId, newData) {
  const postRef = doc(firestore, 'post', postId);
  await updateDoc(postRef, newData);
}

// BORRAR POST
export async function deletePost(postId) {
  await deleteDoc(doc(firestore, 'post', postId));
}

// Verificar que el usuario actual es el autor del post
export function isAuthor(post) {
  return auth.currentUser && post.email === auth.currentUser.email;
}