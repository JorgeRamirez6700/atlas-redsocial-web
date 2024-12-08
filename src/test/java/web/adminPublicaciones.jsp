<%-- 
    Document   : adminPublicaciones
    Created on : Dec 7, 2024, 12:31:09 AM
    Author     : RavenOS
--%>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Administrar Publicaciones</title>
    <link rel="stylesheet" href="css/estilos.css">
</head>
<body>
<%-- Este fragmento debe añadirse a las páginas protegidas --%>
<%@ page session="true" %>
<% 
    HttpSession sesion = request.getSession(false);
    Usuario usuario = (Usuario) (sesion != null ? sesion.getAttribute("usuarioAutenticado") : null);
%>
<header>
    <h1>Mi Blog</h1>
    <nav>
        <% if (usuario != null) { %>
            <p>Bienvenido, <strong><%= usuario.getUsuario() %></strong></p>
            <a href="logout">Cerrar sesión</a>
        <% } else { %>
            <a href="login.jsp">Iniciar sesión</a>
        <% } %>
    </nav>
</header>


    <main>
        <section>
            <h2>Listado de Publicaciones</h2>
            <c:choose>
                <c:when test="${not empty publicaciones}">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Título</th>
                                <th>Autor</th>
                                <th>Fecha</th>
                                <th>Anclada</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <c:forEach var="publicacion" items="${publicaciones}">
                                <tr>
                                    <td>${publicacion.id}</td>
                                    <td>${publicacion.titulo}</td>
                                    <td>${publicacion.autor}</td>
                                    <td>${publicacion.fechaPublicacion}</td>
                                    <td>${publicacion.anclada ? "Sí" : "No"}</td>
                                    <td>
                                        <form action="borrarPublicacion" method="post" style="display:inline;">
                                            <input type="hidden" name="idPublicacion" value="${publicacion.id}">
                                            <button type="submit" onclick="return confirm('¿Seguro que deseas borrar esta publicación?');">
                                                Borrar
                                            </button>
                                        </form>
                                        <form action="anclarPublicacion" method="post" style="display:inline;">
                                            <input type="hidden" name="idPublicacion" value="${publicacion.id}">
                                            <button type="submit">${publicacion.anclada ? "Desanclar" : "Anclar"}</button>
                                        </form>
                                    </td>
                                </tr>
                            </c:forEach>
                        </tbody>
                    </table>
                </c:when>
                <c:otherwise>
                    <p>No hay publicaciones disponibles.</p>
                </c:otherwise>
            </c:choose>
        </section>
    </main>
</body>
</html>

