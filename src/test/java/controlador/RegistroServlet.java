package controlador;

import dao.UsuarioDAO;
import entidades.Usuario;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;
import org.apache.commons.lang3.StringEscapeUtils;


@WebServlet("/registro")
public class RegistroServlet extends HttpServlet {

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Mostrar la página de registro
        request.getRequestDispatcher("web/registro.jsp").forward(request, response);
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
 String username = request.getParameter("username");
    String email = request.getParameter("email");
    String password = request.getParameter("password");
    Part avatar = request.getPart("avatar");

    // Validaciones del lado servidor
    if (username == null || username.length() < 4 || username.length() > 20 || !username.matches("[a-zA-Z0-9]+")) {
        response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Nombre de usuario inválido.");
        return;
    }

    if (email == null || !email.matches("^[\\w.%+-]+@[\\w.-]+\\.[a-zA-Z]{2,6}$")) {
        response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Correo electrónico inválido.");
        return;
    }

    if (password == null || password.length() < 6) {
        response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Contraseña inválida.");
        return;
    }

    if (avatar != null && avatar.getSize() > 2 * 1024 * 1024) {
        response.sendError(HttpServletResponse.SC_BAD_REQUEST, "El archivo de avatar no debe exceder los 2 MB.");
        return;
    }

      // Sanitización
    username = StringEscapeUtils.escapeHtml4(username);
    email = StringEscapeUtils.escapeHtml4(email);

    // Registro en la base de datos (usando DAO)
    UsuarioDAO usuarioDAO = new UsuarioDAO();
    boolean registrado = usuarioDAO.registrarUsuario(username, email, password, avatar);

    if (registrado) {
        response.sendRedirect("/login.html");
    } else {
        response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Error al registrar el usuario.");
    }
    }
}
