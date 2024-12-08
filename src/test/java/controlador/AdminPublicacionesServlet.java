package controlador;

import dao.PublicacionDAO;
import entidades.Publicacion;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;
import java.util.List;

@WebServlet("/adminPublicaciones")
public class AdminPublicacionesServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Verificar si el usuario está autenticado y es administrador
        HttpSession session = request.getSession(false);
        if (session == null || !Boolean.TRUE.equals(session.getAttribute("esAdmin"))) {
            response.sendRedirect("login.jsp");
            return;
        }

        // Obtener las publicaciones
        PublicacionDAO publicacionDAO = new PublicacionDAO();
        List<Publicacion> publicaciones = publicacionDAO.obtenerTodasPublicaciones();

        // Pasar las publicaciones a la vista
        request.setAttribute("publicaciones", publicaciones);
        request.getRequestDispatcher("/adminPublicaciones.jsp").forward(request, response);
    }
}
