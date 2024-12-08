<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%-- Página para ver publicaciones con comentarios --%>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Publicaciones</title>
    <link rel="stylesheet" href="/estilos.css">
</head>
<body>
    <header>
        <h1>Blog - Publicaciones</h1>
        <nav>
            <a href="index.jsp">Inicio</a>
            <a href="login.jsp">Iniciar Sesión</a>
        </nav>
    </header>
    <main>
        <h2>Publicaciones Recientes</h2>
        <div id="publicaciones">
            <c:forEach var="publicacion" items="${publicaciones}">
               <article>
    <h3>${publicacion.titulo}</h3>
    <p>${publicacion.contenido}</p>
    <p><strong>Autor:</strong> ${publicacion.autor}</p>
    <p><strong>Fecha:</strong> ${publicacion.fechaPublicacion}</p>

    <h4>Comentarios</h4>
    <ul>
        <c:forEach var="comentario" items="${publicacion.comentarios}">
            <li><strong>${comentario.autor}:</strong> ${comentario.texto}</li>
        </c:forEach>
    </ul>
    <c:forEach var="publicacion" items="${publicaciones}">
  <div>
    <h3>${fn:escapeXml(publicacion.titulo)}</h3>
    <p>${fn:escapeXml(publicacion.contenido)}</p>
  </div>
</c:forEach>

    <h4>Agregar Comentario</h4>
    <form action="comentario" method="post">
        <input type="hidden" name="publicacionId" value="${publicacion.id}">
        <label for="autor">Autor:</label>
        <input type="text" id="autor" name="autor" required>
        <label for="texto">Comentario:</label>
        <textarea id="texto" name="texto" required></textarea>
        <button type="submit">Enviar</button>
    </form>
</article>

            </c:forEach>
        </div>
    </main>
</body>
</html>
