document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formCrearPublicacion");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Evitar el comportamiento por defecto del formulario

        const titulo = document.getElementById("titulo").value;
        const contenido = document.getElementById("contenido").value;
        const esAnclada = document.getElementById("anclada").checked;

        const data = {
            titulo: titulo,
            contenido: contenido,
            anclada: esAnclada
        };

        // Realizar la petición fetch
        fetch("/CrearPublicacionServlet", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            // Mostrar mensaje de éxito
            if (data.success) {
                alert("Publicación creada con éxito.");
                // Opcional: Redirigir o limpiar el formulario
                form.reset();
            } else {
                alert("Hubo un error al crear la publicación.");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Error al crear la publicación.");
        });
    });
});

