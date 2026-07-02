// ===============================
// CARRITO DE COMPRAS
// ===============================

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const listaCarrito = document.getElementById("lista-carrito");
const totalCarrito = document.getElementById("total-carrito");
const contadorCarrito = document.getElementById("contador-carrito");

console.log("carrito.js cargado");

// ===============================
// AGREGAR PRODUCTO
// ===============================

function agregarAlCarrito(producto) {

    const productoExistente = carrito.find(item => item.id === producto.id);

    if (productoExistente) {

        productoExistente.cantidad++;

    } else {

        producto.cantidad = 1;

        carrito.push(producto);

    }

    guardarCarrito();

    mostrarCarrito();

}

// ===============================
// MOSTRAR CARRITO
// ===============================

function mostrarCarrito() {

    listaCarrito.innerHTML = "";

    let total = 0;

    carrito.forEach((producto) => {

        listaCarrito.innerHTML += `

            <div class="producto-carrito">

    <img
        src="${producto.thumbnail}"
        alt="${producto.title}"
        class="imagen-carrito">

    <h6>${producto.title}</h6>

    <div class="cantidad-carrito">

        <button
            class="btn-restar"
            data-id="${producto.id}">
            -
        </button>

        <span>${producto.cantidad}</span>

        <button
            class="btn-sumar"
            data-id="${producto.id}">
            +
        </button>

    </div>

    <p>USD ${producto.price}</p>

    <button
        class="btn-eliminar"
        data-id="${producto.id}">
        🗑 Eliminar
    </button>

</div>

            <hr>

        `;

        total += producto.price * producto.cantidad;

    });

    // ===============================
    // BOTONES ELIMINAR
    // ===============================

    const botonesEliminar = document.querySelectorAll(".btn-eliminar");

    botonesEliminar.forEach((boton) => {

        boton.addEventListener("click", () => {

            eliminarProducto(Number(boton.dataset.id));

        });

    });

    // ===============================
    // BOTONES SUMAR
    // ===============================

    const botonesSumar = document.querySelectorAll(".btn-sumar");

    botonesSumar.forEach((boton) => {

        boton.addEventListener("click", () => {

            aumentarCantidad(Number(boton.dataset.id));

        });

    });

    // ===============================
    // BOTONES RESTAR
    // ===============================

    const botonesRestar = document.querySelectorAll(".btn-restar");

    botonesRestar.forEach((boton) => {

        boton.addEventListener("click", () => {

            disminuirCantidad(Number(boton.dataset.id));

        });

    });

    totalCarrito.textContent = `USD ${total.toFixed(2)}`;

    contadorCarrito.textContent = carrito.reduce((total, producto) => {

        return total + producto.cantidad;

    }, 0);

}

// ===============================
// ELIMINAR PRODUCTO
// ===============================

function eliminarProducto(id) {

    carrito = carrito.filter((producto) => producto.id !== id);

    guardarCarrito();

    mostrarCarrito();

}

// ===============================
// AUMENTAR CANTIDAD
// ===============================

function aumentarCantidad(id) {

    const producto = carrito.find(item => item.id === id);

    if (producto) {

        producto.cantidad++;

        guardarCarrito();

        mostrarCarrito();

    }

}

// ===============================
// DISMINUIR CANTIDAD
// ===============================

function disminuirCantidad(id) {

    const producto = carrito.find(item => item.id === id);

    if (!producto) return;

    producto.cantidad--;

    if (producto.cantidad <= 0) {

        eliminarProducto(id);

        return;

    }

    guardarCarrito();

    mostrarCarrito();

}

// ===============================
// GUARDAR CARRITO
// ===============================

function guardarCarrito() {

    localStorage.setItem("carrito", JSON.stringify(carrito));

}

// ===============================
// VACIAR CARRITO
// ===============================

function vaciarCarrito() {

    carrito = [];

    guardarCarrito();

    mostrarCarrito();

}

// ===============================
// INICIALIZAR
// ===============================

mostrarCarrito();