package controlador;

import dao.PublicacionDAO;
import entidades.Publicacion;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;
import java.util.List;

@WebServlet("/publicaciones")
public class PublicacionesServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Verificar si el usuario está autenticado
        HttpSession session = request.getSession(false);
        if (session == null || session.getAttribute("usuario") == null) {
            response.sendRedirect("login.jsp"); // Redirigir al login si no está autenticado
            return;
        }

        // Recuperar las publicaciones desde el DAO
        PublicacionDAO publicacionDAO = new PublicacionDAO();
        List<Publicacion> publicaciones = publicacionDAO.obtenerTodasPublicaciones();

        // Pasar las publicaciones a la vista
        request.setAttribute("publicaciones", publicaciones);
        request.getRequestDispatcher("/index.jsp").forward(request, response);
    }
}
