<%-- 
    Document   : registro
    Created on : Dec 6, 2024, 10:55:07 PM
    Author     : RavenOS
--%>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro</title>
</head>
<body>
    <h1>Formulario de Registro</h1>

    <form action="registro" method="post" enctype="multipart/form-data">
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" name="nombre" required><br>

        <label for="email">Correo electrónico:</label>
        <input type="email" id="email" name="email" required><br>

        <label for="password">Contraseña:</label>
        <input type="password" id="password" name="password" required><br>

        <label for="avatar">Avatar (opcional):</label>
        <input type="file" id="avatar" name="avatar"><br>

        <button type="submit">Registrar</button>
    </form>

    <c:if test="${not empty error}">
        <p style="color: red;">${error}</p>
    </c:if>

    <p>¿Ya tienes una cuenta? <a href="web/login.jsp">Iniciar sesión</a></p>
</body>
</html>
