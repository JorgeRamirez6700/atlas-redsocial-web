<%-- 
    Document   : index
    Created on : Dec 6, 2024, 10:55:47 PM
    Author     : RavenOS
--%>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Muro de Publicaciones</title>
    <link rel="stylesheet" href="/estilos.css">
</head>
<body>
    <header>
        <h1>Muro de Publicaciones</h1>
        <p>Bienvenido, ${usuario.nombre}</p>
        <a href="logout">Cerrar sesión</a>
    </header>

 <main>
    <section>
        <h2>Publicaciones</h2>
        <c:choose>
            <c:when test="${not empty publicaciones}">
                <ul>
                    <c:forEach var="publicacion" items="${publicaciones}">
                        <li>
                            <h3>${publicacion.titulo}</h3>
                            <p>${publicacion.contenido}</p>
                            <small>Publicado por: ${publicacion.autor} el ${publicacion.fechaPublicacion}</small>
                            
                            <!-- Sección de comentarios -->
                            <div class="comentarios">
                                <h4>Comentarios:</h4>
                                <c:choose>
                                    <c:when test="${not empty publicacion.comentarios}">
                                        <ul>
                                            <c:forEach var="comentario" items="${publicacion.comentarios}">
                                                <li>
                                                    <p>${comentario.texto}</p>
                                                    <small>Por: ${comentario.autor} el ${comentario.fechaComentario}</small>
                                                </li>
                                            </c:forEach>
                                        </ul>
                                    </c:when>
                                    <c:otherwise>
                                        <p>No hay comentarios.</p>
                                    </c:otherwise>
                                </c:choose>
                            </div>

                            <!-- Formulario para agregar un comentario -->
                            <form action="comentario" method="post">
                                <input type="hidden" name="idPublicacion" value="${publicacion.id}">
                                <textarea name="texto" placeholder="Escribe tu comentario aquí..." required></textarea>
                                <button type="submit">Comentar</button>
                            </form>
                        </li>
                    </c:forEach>
                </ul>
            </c:when>
            <c:otherwise>
                <p>No hay publicaciones disponibles.</p>
            </c:otherwise>
        </c:choose>
    </section>
</main>

</body>
</html>
