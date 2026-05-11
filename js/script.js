const botonesComprar = document.querySelectorAll(".card button");

botonesComprar.forEach((boton) => {

    boton.addEventListener("click", () => {

        alert("Producto agregado al carrito 🛒");

    });

});