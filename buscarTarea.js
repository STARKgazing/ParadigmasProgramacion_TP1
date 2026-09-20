const managerTareas = require("./managerTareas");
const verTareas = require("./verTarea");


function normalizarTexto(texto) {
    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}


function buscarTarea(rl, volverAlMenu) {
    const tareas = managerTareas.cargarTareas();
    
    console.log("\n=== BUSCAR TAREA ===");

    if (tareas.length === 0) {
        console.log("No hay tareas para buscar.");
        console.log("0. Volver al menú principal");
        
        rl.question("Elegí una opción: ", (opcion) => {
            if (opcion === "0") {
                volverAlMenu();
                return;
            }
            console.log("Opción inválida.");
            buscarTarea(rl, volverAlMenu);
        });
        return;
    }


    rl.question(
        "Escribí el título o palabra clave: ",
        (busqueda) => {

            if (busqueda.trim() === "") {
                console.log("La búsqueda no puede estar vacía.");
                buscarTarea(rl, volverAlMenu);
                return;
            }

            const textoBuscado = normalizarTexto(busqueda);
            const resultados = tareas.filter((tarea) => {
                const titulo = normalizarTexto(
                    tarea.titulo
                );

                const descripcion = normalizarTexto(
                    tarea.descripcion
                );

                return (
                    titulo.includes(textoBuscado) ||
                    descripcion.includes(textoBuscado)
                );
            });


            mostrarResultados(resultados, tareas, rl, volverAlMenu);
        }
    );
}


function mostrarResultados(resultados, tareas, rl, volverAlMenu) 
{
    console.log("\n=== RESULTADOS DE BÚSQUEDA ===");

    if (resultados.length === 0) {
        console.log("No se encontraron tareas.");
        console.log("B. Buscar nuevamente");
        console.log("0. Volver al menú principal");
        rl.question("Elegí una opción: ", (opcion) => {

            switch (opcion.toUpperCase()) {
                case "B":
                    buscarTarea(rl, volverAlMenu);
                    break;
                    
                case "0":
                    volverAlMenu();
                    break;

                default:
                    console.log("Opción inválida.");

                    mostrarResultados(resultados, tareas, rl, volverAlMenu);
            }
        });
        return;
    }


    resultados.forEach((tarea, indice) => {
        console.log(
            (indice + 1) + ". " + tarea.titulo
        );
    });

    console.log("B. Buscar nuevamente");
    console.log("0. Volver al menú principal");

    rl.question("Elegí una tarea: ", (opcion) => {

        switch (opcion.toUpperCase()) {
            case "B":
                buscarTarea(rl, volverAlMenu);
                break;
            case "0":
                volverAlMenu();
                break;

            default:

                const numeroTarea = Number(opcion);
                if (
                    Number.isNaN(numeroTarea) ||
                    numeroTarea < 1 ||
                    numeroTarea > resultados.length
                ) {
                    console.log("Opción inválida.");

                    mostrarResultados(resultados, tareas, rl, volverAlMenu);
                    return;
                }

                const tareaSeleccionada =
                    resultados[numeroTarea - 1];

                verTareas.mostrarDetallesTarea(tareaSeleccionada, tareas, rl, volverAlMenu);
        }
    });
}

module.exports = buscarTarea;
