package controlador;

import dao.ComentarioDAO;
import entidades.Comentario;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;

@WebServlet("/comentario")
public class ComentarioServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Verificar si el usuario está autenticado
        HttpSession session = request.getSession(false);
        if (session == null || session.getAttribute("usuario") == null) {
            response.sendRedirect("login.jsp");
            return;
        }

        // Recuperar parámetros del formulario
        int idPublicacion = Integer.parseInt(request.getParameter("idPublicacion"));
        String texto = request.getParameter("texto");
        String autor = (String) session.getAttribute("usuario");

        // Crear el objeto Comentario
        Comentario comentario = new Comentario();
        comentario.setPublicacionId(idPublicacion);
        comentario.setContenido(texto);
        comentario.setAutor(autor);

        // Guardar el comentario en la base de datos
        ComentarioDAO comentarioDAO = new ComentarioDAO();
        comentarioDAO.agregarComentario(comentario);

        // Redirigir al muro de publicaciones
        response.sendRedirect("publicaciones");
    }
}
