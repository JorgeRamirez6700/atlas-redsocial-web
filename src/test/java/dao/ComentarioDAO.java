/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package dao;

import entidades.Comentario;
import util.ConexionDB;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class ComentarioDAO {

    // Método para agregar un comentario
public void agregarComentario(Comentario comentario) {
    String sql = "INSERT INTO comentarios (id_publicacion, texto, autor, fecha_comentario) VALUES (?, ?, ?, NOW())";
    Connection conn = null;
    PreparedStatement stmt = null;
    try {
        conn = ConexionDB.getConnection();
        stmt = conn.prepareStatement(sql);

        stmt.setInt(1, comentario.getPublicacionId());
        stmt.setString(2, comentario.getContenido());
        stmt.setString(3, comentario.getAutor());
        stmt.executeUpdate();
    } catch (SQLException e) {
        e.printStackTrace();
    } finally {
        try {
            if (stmt != null) stmt.close();
            if (conn != null) conn.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}


    // Método para obtener comentarios por publicación
 public ArrayList<String> obtenerComentariosPorPublicacion(int idPublicacion) {
        ArrayList<String> comentarios = new ArrayList<String>();
        String sql = "SELECT texto, autor, fecha_comentario FROM comentarios WHERE id_publicacion = ?";

        try (Connection conn = ConexionDB.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, idPublicacion);
            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    String contenido = rs.getString("texto");
                    Comentario comentario = new Comentario();
                    comentario.setContenido(rs.getString("texto"));
                    comentario.setAutor(rs.getString("autor"));
                    comentario.setFechaComentario(rs.getDate("fecha_comentario"));
                    comentarios.add(contenido);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }finally{
            return comentarios;
        }
        
    }

    // Método para eliminar un comentario
    public boolean eliminarComentario(int id) {
        String sql = "DELETE FROM comentarios WHERE id = ?";
        try (Connection conn = ConexionDB.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, id);
            return stmt.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }
    
    
}
