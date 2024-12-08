package controlador;

import dao.PublicacionDAO;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;

@WebServlet("/anclarPublicacion")
public class AnclarPublicacionServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Verificar si el usuario está autenticado y es administrador
        HttpSession session = request.getSession(false);
        if (session == null || !Boolean.TRUE.equals(session.getAttribute("esAdmin"))) {
            response.sendRedirect("login.jsp");
            return;
        }

        // Obtener ID de la publicación y su estado actual
        int idPublicacion = Integer.parseInt(request.getParameter("idPublicacion"));

        // Anclar o desanclar la publicación
        PublicacionDAO publicacionDAO = new PublicacionDAO();
        publicacionDAO.toggleAnclarPublicacion(idPublicacion);

        // Redirigir al módulo administrativo
        response.sendRedirect("adminPublicaciones");
    }
}
