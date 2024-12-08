package entidades;

import java.util.Date;
import java.util.List;

public class Publicacion {
    private int id;
    private String titulo;
    private String contenido;
    private String tipo; // Puede ser "normal" o "anclada"
    private Date fecha;
    private int autorId; // Relación con el usuario (foreign key)

    // Constructor vacío
    public Publicacion() {}

    // Constructor con parámetros
    public Publicacion(int id, String titulo, String contenido, String tipo, Date fecha, int autorId) {
        this.id = id;
        this.titulo = titulo;
        this.contenido = contenido;
        this.tipo = tipo;
        this.fecha = fecha;
        this.autorId = autorId;
    }

    // Getters y Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getContenido() {
        return contenido;
    }

    public void setContenido(String contenido) {
        this.contenido = contenido;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public Date getFecha() {
        return fecha;
    }

    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }

    public int getAutorId() {
        return autorId;
    }

    public void setAutorId(int autorId) {
        this.autorId = autorId;
    }
    
    private List<Comentario> comentarios;

    public List<Comentario> getComentarios() {
        return comentarios;
    }

    public void setComentarios(List<Comentario> comentarios) {
        this.comentarios = comentarios;
    }

    public boolean isEsAnclada() {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

}
