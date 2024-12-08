<%-- 
    Document   : error-excepcion
    Created on : Dec 7, 2024, 2:12:13 AM
    Author     : RavenOS
--%>

<%@ page isErrorPage="true" %>
<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
    <title>Error de Servidor</title>
    <link rel="stylesheet" type="text/css" href="css/estilos.css">
</head>
<body>
    <h1>¡Algo salió mal en el servidor!</h1>
    <p>Por favor, inténtalo nuevamente más tarde.</p>
    <p><strong>Detalles del error:</strong></p>
    <p>Excepción: ${exception.getClass().getName()}</p>
    <p>Mensaje: ${exception.message}</p>
    <p><a href="index.html">Volver al inicio</a></p>
</body>
</html>
