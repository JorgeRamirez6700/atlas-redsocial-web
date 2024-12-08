package util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConexionDB {

    // Configuración de la base de datos
    private static final String URL = "jdbc:mysql://localhost:3306/blog_redsocial"; // Cambiar nombreBD según tu caso
    private static final String USER = "root"; // Cambiar usuario según tu configuración
    private static final String PASSWORD = "root"; // Cambiar contraseña según tu configuración
    private static final String DRIVER = "com.mysql.cj.jdbc.Driver"; // Asegúrate de que el driver MySQL esté incluido en el proyecto

    static {
        try {
            // Cargar el driver JDBC
            Class.forName(DRIVER);
        } catch (ClassNotFoundException e) {
            System.err.println("Error al cargar el driver de la base de datos: " + e.getMessage());
        }
    }

    // Método para obtener la conexión
    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(URL, USER, PASSWORD);
    }
}
