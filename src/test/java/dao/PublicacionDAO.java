/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package dao;

import entidades.Publicacion;
import util.ConexionDB;
import entidades.Comentario;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class PublicacionDAO {

    // Método para agregar una publicación
    public boolean agregarPublicacion(Publicacion publicacion) {
        String sql = "INSERT INTO publicaciones (titulo, contenido, tipo, fecha, autor_id) VALUES (?, ?, ?, ?, ?)";
        try (Connection conn = ConexionDB.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, publicacion.getTitulo());
            stmt.setString(2, publicacion.getContenido());
            stmt.setString(3, publicacion.getTipo());
            stmt.setDate(4, new java.sql.Date(publicacion.getFecha().getTime()));
            stmt.setInt(5, publicacion.getAutorId());

            return stmt.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    // Método para obtener una publicación por ID
    public Publicacion obtenerPublicacionPorId(int id) {
        String sql = "SELECT * FROM publicaciones WHERE id = ?";
        try (Connection conn = ConexionDB.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, id);
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    return new Publicacion(
                        rs.getInt("id"),
                        rs.getString("titulo"),
                        rs.getString("contenido"),
                        rs.getString("tipo"),
                        rs.getDate("fecha"),
                        rs.getInt("autor_id")
                    );
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    // Método para obtener todas las publicaciones
    public List<Publicacion> obtenerTodasLasPublicaciones() {
        List<Publicacion> publicaciones = new ArrayList<Publicacion>();
        String sql = "SELECT * FROM publicaciones";
        try (Connection conn = ConexionDB.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {

            while (rs.next()) {
                Publicacion publicacion = new Publicacion(
                    rs.getInt("id"),
                    rs.getString("titulo"),
                    rs.getString("contenido"),
                    rs.getString("tipo"),
                    rs.getDate("fecha"),
                    rs.getInt("autor_id")
                );
                publicaciones.add(publicacion);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return publicaciones;
    }

    // Método para actualizar una publicación
    public boolean actualizarPublicacion(Publicacion publicacion) {
        String sql = "UPDATE publicaciones SET titulo = ?, contenido = ?, tipo = ?, fecha = ?, autor_id = ? WHERE id = ?";
        try (Connection conn = ConexionDB.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, publicacion.getTitulo());
            stmt.setString(2, publicacion.getContenido());
            stmt.setString(3, publicacion.getTipo());
            stmt.setDate(4, new java.sql.Date(publicacion.getFecha().getTime()));
            stmt.setInt(5, publicacion.getAutorId());
            stmt.setInt(6, publicacion.getId());

            return stmt.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    // Método para eliminar una publicación
public boolean borrarPublicacion(int idPublicacion) {
    String sql = "DELETE FROM publicaciones WHERE id = ?";

    try (Connection conn = ConexionDB.getConnection();
         PreparedStatement stmt = conn.prepareStatement(sql)) {
        stmt.setInt(1, idPublicacion);
        stmt.executeUpdate();
    } catch (SQLException e) {
        e.printStackTrace();
        
    }
        return false;
}

    
    public List<Publicacion> obtenerTodasPublicaciones() {
    List<Publicacion> publicaciones = new ArrayList<Publicacion>();
    String sql = "SELECT p.id, p.titulo, p.contenido, p.fecha_publicacion, u.nombre AS autor " +
                 "FROM publicaciones p " +
                 "JOIN usuarios u ON p.id_usuario = u.id " +
                 "ORDER BY p.fecha_publicacion DESC";

    try (Connection conn = ConexionDB.getConnection();
         PreparedStatement stmt = conn.prepareStatement(sql);
         ResultSet rs = stmt.executeQuery()) {

        while (rs.next()) {
            Publicacion publicacion = new Publicacion();
            publicacion.setId(rs.getInt("id"));
            publicacion.setTitulo(rs.getString("titulo"));
            publicacion.setContenido(rs.getString("contenido"));
            publicacion.setFecha(rs.getDate("fecha_publicacion"));
            publicacion.setAutorId(rs.getInt("autor"));
            publicaciones.add(publicacion);
        }
    } catch (SQLException e) {
        e.printStackTrace();
    }
    return publicaciones;
}
    public void toggleAnclarPublicacion(int idPublicacion) {
    String sql = "UPDATE publicaciones SET anclada = NOT anclada WHERE id = ?";

    try (Connection conn = ConexionDB.getConnection();
         PreparedStatement stmt = conn.prepareStatement(sql)) {
        stmt.setInt(1, idPublicacion);
        stmt.executeUpdate();
    } catch (SQLException e) {
        e.printStackTrace();
    }
}

public List<Publicacion> obtenerTodas() {
    List<Publicacion> publicaciones = new ArrayList<Publicacion>();
    String sqlPublicaciones = "SELECT * FROM publicaciones ORDER BY fecha_publicacion DESC";
    String sqlComentarios = "SELECT * FROM comentarios WHERE publicacion_id = ?";

    try (Connection conn = ConexionDB.getConnection();
         PreparedStatement stmtPublicaciones = conn.prepareStatement(sqlPublicaciones)) {

        ResultSet rsPublicaciones = stmtPublicaciones.executeQuery();

        while (rsPublicaciones.next()) {
            Publicacion publicacion = new Publicacion();
            publicacion.setId(rsPublicaciones.getInt("id"));
            publicacion.setTitulo(rsPublicaciones.getString("titulo"));
            publicacion.setContenido(rsPublicaciones.getString("contenido"));
            publicacion.setFecha(rsPublicaciones.getDate("fecha_publicacion"));
            publicacion.setAutorId(rsPublicaciones.getInt("autor"));

            // Obtener comentarios asociados a la publicación
            try (PreparedStatement stmtComentarios = conn.prepareStatement(sqlComentarios)) {
                stmtComentarios.setInt(1, publicacion.getId());
                ResultSet rsComentarios = stmtComentarios.executeQuery();

                List<Comentario> comentarios = new ArrayList<Comentario>();
                while (rsComentarios.next()) {
                    Comentario comentario = new Comentario();
                    comentario.setId(rsComentarios.getInt("id"));
                    comentario.setAutorId(rsComentarios.getInt("autor"));
                    comentario.setContenido(rsComentarios.getString("texto"));
                    comentarios.add(comentario);
                }
                publicacion.setComentarios(comentarios);
            }

            publicaciones.add(publicacion);
        }
    } catch (SQLException e) {
        e.printStackTrace();
    }

    return publicaciones;
}
    public boolean crearPublicacion(Publicacion publicacion) throws SQLException {
        Connection conn = ConexionDB.getConnection();
        try {
            String query = "INSERT INTO publicaciones (titulo, contenido, es_anclada) VALUES (?, ?, ?)";
            PreparedStatement stmt = conn.prepareStatement(query);
            stmt.setString(1, publicacion.getTitulo());
            stmt.setString(2, publicacion.getContenido());
            stmt.setBoolean(3, publicacion.isEsAnclada());
            int rowsAffected = stmt.executeUpdate();
            return rowsAffected > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }
}


