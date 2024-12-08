package controlador;

import dao.PublicacionDAO;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;

@WebServlet("/borrarPublicacion")
public class BorrarPublicacionServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Verificar si el usuario está autenticado y es administrador
        HttpSession session = request.getSession(false);
        if (session == null || !Boolean.TRUE.equals(session.getAttribute("esAdmin"))) {
            response.sendRedirect("login.jsp");
            return;
        }

        // Obtener ID de la publicación a borrar
        int idPublicacion = Integer.parseInt(request.getParameter("idPublicacion"));

        // Borrar la publicación
        PublicacionDAO publicacionDAO = new PublicacionDAO();
        publicacionDAO.borrarPublicacion(idPublicacion);

        // Redirigir al módulo administrativo
        response.sendRedirect("adminPublicaciones");
    }
@Override
protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    try {
        // Recuperar el ID de la publicación desde la URL o el cuerpo de la solicitud
        String idParam = request.getParameter("id");
        if (idParam == null || idParam.isEmpty()) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write("{\"error\": \"ID de publicación no proporcionado\"}");
            return;
        }

        int idPublicacion = Integer.parseInt(idParam);

        // Llamar al DAO para borrar la publicación
        PublicacionDAO publicacionDAO = new PublicacionDAO();
        boolean success = publicacionDAO.borrarPublicacion(idPublicacion);

        // Crear respuesta JSON
    String jsonResponse = "{\"success\": " + success + "}";
        response.getWriter().write(jsonResponse);


        // Configurar la respuesta HTTP
        response.setContentType("application/json");
        response.setStatus(HttpServletResponse.SC_OK);
        response.getWriter().write(jsonResponse.toString());
    } catch (NumberFormatException e) {
        response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        response.getWriter().write("{\"error\": \"ID inválido\"}");
    } catch (Exception e) {
        response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        response.getWriter().write("{\"error\": \"Error interno del servidor\"}");
        e.printStackTrace();
    }
}

}
