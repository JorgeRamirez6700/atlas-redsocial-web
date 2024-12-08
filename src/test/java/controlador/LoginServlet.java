package controlador;

import dao.UsuarioDAO;
import entidades.Usuario;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;

@WebServlet("/login")
public class LoginServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String correo = request.getParameter("correo");
        String password = request.getParameter("password");

        if (correo == null || password == null || correo.isEmpty() || password.isEmpty()) {
            request.setAttribute("error", "El correo y la contraseña son obligatorios.");
            request.getRequestDispatcher("login.jsp").forward(request, response);
            return;
        }

        UsuarioDAO usuarioDAO = new UsuarioDAO();
        Usuario usuario = usuarioDAO.validarUsuario(correo, password);

        if (usuario != null) {
            // Usuario autenticado
            HttpSession session = request.getSession();
            session.setAttribute("usuarioAutenticado", usuario);
            response.sendRedirect("index.jsp");
        } else {
            // Credenciales incorrectas
            request.setAttribute("error", "Credenciales incorrectas.");
            request.getRequestDispatcher("login.jsp").forward(request, response);
        }
    }
}
