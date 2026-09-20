const managerTareas = require("./managerTareas");
const editarTarea = require("./editarTarea");

function verTareas(rl, volverAlMenu) {
    console.log("\n=== VER TAREAS ===");
    console.log("1. Ver todas las tareas");
    console.log("2. Ver tareas pendientes");
    console.log("3. Ver tareas en proceso");
    console.log("4. Ver tareas finalizadas");
    console.log("0. Volver al menú principal");
    
    rl.question("Elegí una opción: ", (opcion) => {
        const tareas = managerTareas.cargarTareas();
        switch (opcion) {
            case "1":
                mostrarListaTareas(tareas, rl, volverAlMenu);
                break;

            case "2":
                mostrarListaPorEstado(tareas, "Pendiente", rl, volverAlMenu);
                break;

            case "3":
                mostrarListaPorEstado(tareas, "En proceso", rl, volverAlMenu);
                break;

            case "4":
                mostrarListaPorEstado(tareas, "Finalizada", rl, volverAlMenu);
                break;

            case "0":
                volverAlMenu();
                break;

            default:
                console.log("Opción inválida.");
                verTareas(rl, volverAlMenu);
        }
    });
}


function mostrarListaPorEstado(tareas, estado, rl, volverAlMenu) {
    const tareasFiltradas = tareas.filter((tarea) => {
        return tarea.estado === estado;
    });
    mostrarListaTareas(tareasFiltradas, rl, volverAlMenu);
}


function mostrarListaTareas(tareas, rl, volverAlMenu) {
    console.log("\n=== LISTA DE TAREAS ===");

    if (tareas.length === 0) {
        console.log("No hay tareas para mostrar.");
        console.log("0. Volver");

        rl.question("Elegí una opción: ", (opcion) => {
            if (opcion === "0") {
                verTareas(rl, volverAlMenu);
                return;
            }

            console.log("Opción inválida.");
            mostrarListaTareas(tareas, rl, volverAlMenu);
        });
        return;
    }


    tareas.forEach((tarea, indice) => {
        console.log(
            (indice + 1) + ". " + tarea.titulo
        );
    });
    console.log("0. Volver");

    rl.question("Elegí una tarea: ", (opcion) => {
        if (opcion === "0") {
            verTareas(rl, volverAlMenu);
            return;
        }
        const numeroTarea = Number(opcion);

        if (
            Number.isNaN(numeroTarea) ||
            numeroTarea < 1 ||
            numeroTarea > tareas.length
        ) {
            console.log("Opción inválida.");
            mostrarListaTareas(tareas, rl, volverAlMenu);
            return;
        }

        const tareaSeleccionada = tareas[numeroTarea - 1];
        mostrarDetallesTarea(tareaSeleccionada, tareas, rl, volverAlMenu);
    });
}


function mostrarDetallesTarea(tareaSeleccionada, tareas, rl, volverAlMenu) {
    
    console.log("\n=== DETALLES DE LA TAREA ===");
    console.log("Título: " + tareaSeleccionada.titulo);
    console.log("Descripción: " + tareaSeleccionada.descripcion);
    console.log("Estado: " + tareaSeleccionada.estado);
    console.log("Dificultad: " + tareaSeleccionada.dificultad);
    console.log("Fecha de creación: " + tareaSeleccionada.fechaCreacion);
    console.log("Fecha de finalización: " + (tareaSeleccionada.fechaFinalizacion || "sin fecha")
    );

    console.log("\nE. Editar tarea");
    console.log("0. Volver al menú principal");
    rl.question("Elegí una opción: ", (opcion) => {

        switch (opcion.toUpperCase()) {
            case "E":
                editarTarea(rl, tareaSeleccionada, tareas, volverAlMenu);
                break;

            case "0":
                volverAlMenu();
                break;

            default:
                console.log("Opción inválida.")
                mostrarDetallesTarea(tareaSeleccionada, tareas, rl, volverAlMenu);
        }
    });
}

module.exports = verTareas;
