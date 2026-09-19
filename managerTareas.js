const fs = require("fs");
const path = require("path");

const archivoTareas = path.join(__dirname, "tareas.json");


// Cargar las tareas desde el archivo JSON
function cargarTareas() {
    try {
        const datos = fs.readFileSync(archivoTareas, "utf8");

        if (datos.trim() === "") {
            return [];
        }

        return JSON.parse(datos);

    } catch (error) {
        console.log("No se pudieron cargar las tareas.");
        return [];
    }
}


// Guardar las tareas en el archivo JSON
function guardarTareas(tareas) {
    fs.writeFileSync(
        archivoTareas,
        JSON.stringify(tareas, null, 4),
        "utf8"
    );
}


// Agregar una tarea
function agregarTarea(tarea) {
    const tareas = cargarTareas();

    tareas.push(tarea);

    guardarTareas(tareas);
}


module.exports = {
    cargarTareas,
    guardarTareas,
    agregarTarea
};
