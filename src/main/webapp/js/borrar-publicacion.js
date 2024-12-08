document.addEventListener("DOMContentLoaded", () => {
    const botonesEliminar = document.querySelectorAll(".btnEliminarPublicacion");

    botonesEliminar.forEach((boton) => {
        boton.addEventListener("click", function (event) {
            const idPublicacion = this.getAttribute("data-id");

            if (confirm("¿Estás seguro de que quieres eliminar esta publicación?")) {
                fetch(`/BorrarPublicacionServlet?id=${idPublicacion}`, {
                    method: "DELETE",
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert("Publicación eliminada.");
                        // Opcional: Eliminar la publicación del DOM sin recargar la página
                        document.getElementById(`publicacion-${idPublicacion}`).remove();
                    } else {
                        alert("Hubo un error al eliminar la publicación.");
                    }
                })
                .catch(error => {
                    console.error("Error:", error);
                    alert("Error al eliminar la publicación.");
                });
            }
        });
    });
});
