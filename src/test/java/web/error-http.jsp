<%-- 
    Document   : error-http
    Created on : Dec 7, 2024, 2:11:47 AM
    Author     : RavenOS
--%>

<%@ page isErrorPage="true" %>
<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
    <title>Error HTTP</title>
    <link rel="stylesheet" type="text/css" href="/estilos.css">
</head>
<body>
    <h1>Oops, algo salió mal...</h1>
    <p>Hemos encontrado un error mientras procesábamos tu solicitud.</p>
    <p><strong>Detalles del error:</strong></p>
    <p>Código de error: ${pageContext.requestAttribute["javax.servlet.error.status_code"]}</p>
    <p>Descripción: ${pageContext.requestAttribute["javax.servlet.error.message"]}</p>
    <p><a href="index.html">Volver al inicio</a></p>
</body>
</html>
