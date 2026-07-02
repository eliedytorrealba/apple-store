async function obtenerProductos() {

    try {

        const respuesta = await fetch("https://dummyjson.com/products");

        if (!respuesta.ok) {
            throw new Error("Error al obtener los productos.");
        }

        const datos = await respuesta.json();

        console.log("Productos obtenidos:");
        console.log(datos);

    } catch (error) {

        console.error(error);

    }

}