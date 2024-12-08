/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package dao;

import entidades.Usuario;
import java.io.IOException;
import util.ConexionDB;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.Part;

public class UsuarioDAO {

    // Método para agregar un usuario
    public boolean agregarUsuario(Usuario usuario) {
        String sql = "INSERT INTO usuarios (nombre, email, password, avatar) VALUES (?, ?, ?, ?)";
        try (Connection conn = ConexionDB.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, usuario.getNombre());
            stmt.setString(2, usuario.getEmail());
            stmt.setString(3, usuario.getPassword());
            stmt.setString(4, usuario.getAvatar());

            return stmt.executeUpdate() > 0; // Devuelve true si se insertó al menos un registro
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    // Método para obtener un usuario por ID
    public Usuario obtenerUsuarioPorId(int id) {
        String sql = "SELECT * FROM usuarios WHERE id = ?";
        try (Connection conn = ConexionDB.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, id);
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    return new Usuario(
                        rs.getInt("id"),
                        rs.getString("nombre"),
                        rs.getString("email"),
                        rs.getString("password"),
                        rs.getString("avatar")
                    );
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    // Método para obtener todos los usuarios
    public List<Usuario> obtenerTodosLosUsuarios() {
        List<Usuario> usuarios = new ArrayList<Usuario>();
        String sql = "SELECT * FROM usuarios";
        try (Connection conn = ConexionDB.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {

            while (rs.next()) {
                Usuario usuario = new Usuario(
                    rs.getInt("id"),
                    rs.getString("nombre"),
                    rs.getString("email"),
                    rs.getString("password"),
                    rs.getString("avatar")
                );
                usuarios.add(usuario);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return usuarios;
    }

    // Método para actualizar un usuario
    public boolean actualizarUsuario(Usuario usuario) {
        String sql = "UPDATE usuarios SET nombre = ?, email = ?, password = ?, avatar = ? WHERE id = ?";
        try (Connection conn = ConexionDB.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, usuario.getNombre());
            stmt.setString(2, usuario.getEmail());
            stmt.setString(3, usuario.getPassword());
            stmt.setString(4, usuario.getAvatar());
            stmt.setInt(5, usuario.getId());

            return stmt.executeUpdate() > 0; // Devuelve true si se actualizó al menos un registro
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    // Método para eliminar un usuario
    public boolean eliminarUsuario(int id) {
        String sql = "DELETE FROM usuarios WHERE id = ?";
        try (Connection conn = ConexionDB.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, id);
            return stmt.executeUpdate() > 0; // Devuelve true si se eliminó al menos un registro
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }
    public Usuario validarUsuario(String correo, String password) {
    String sql = "SELECT * FROM usuarios WHERE correo = ? AND password = ?";
    try (Connection conn = ConexionDB.getConnection();
         PreparedStatement stmt = conn.prepareStatement(sql)) {

        stmt.setString(1, correo);
        stmt.setString(2, password); // Nota: En el futuro, implementar hashing seguro.

        ResultSet rs = stmt.executeQuery();
        if (rs.next()) {
            Usuario usuario = new Usuario();
            usuario.setUsuario(rs.getString("usuario"));
            usuario.setCorreo(rs.getString("correo"));
            usuario.setPassword(rs.getString("password")); // Evitar devolver contraseñas reales.
            usuario.setAvatar(rs.getString("avatar"));
            return usuario;
        }
    } catch (SQLException e) {
        e.printStackTrace();
    }
    return null;
}

public boolean registrarUsuario(String username, String email, String password, Part avatar) {
    String sql = "INSERT INTO usuarios (nombre, email, password, avatar) VALUES (?, ?, ?, ?)";
    String avatarPath = null;

    try (Connection conn = ConexionDB.getConnection();
         PreparedStatement stmt = conn.prepareStatement(sql)) {

        // Si se proporciona un archivo de avatar, guardarlo en el sistema de archivos
        if (avatar != null && avatar.getSize() > 0) {
            // Definir una ruta para guardar los avatares (puedes ajustar esta ruta)
            String uploadPath = "C:/Users/RavenOS/Documents/GitHub/atlas-redsocial-web/src/main/webapp/img";
            String contentDisposition = avatar.getHeader("content-disposition");
            String fileName = extractFileName(contentDisposition);
            fileName = username + "_" + fileName;


            avatarPath = uploadPath + "/" + fileName;

            // Guardar el archivo
            avatar.write(avatarPath);

            // Si tu base de datos solo necesita el nombre del archivo, actualiza esto:
            avatarPath = fileName;
        }

        // Configurar los parámetros para el SQL
        stmt.setString(1, username);
        stmt.setString(2, email);
        stmt.setString(3, password);
        stmt.setString(4, avatarPath); // Guardar la ruta del avatar o null si no hay avatar

        // Ejecutar la inserción
        int rowsInserted = stmt.executeUpdate();
        return rowsInserted > 0; // Devuelve true si se insertó al menos un registro

    } catch (SQLException | IOException e) {
        e.printStackTrace();
        return false;
    }
}
private String extractFileName(String contentDisposition) {
    String[] parts = contentDisposition.split(";");
    for (String part : parts) {
        if (part.trim().startsWith("filename")) {
            return part.substring(part.indexOf("=") + 1).trim().replace("\"", "");
        }
    }
    return null;
}

}
