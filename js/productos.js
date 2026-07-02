const contenedorProductos = document.getElementById("productos-container");
const buscador = document.getElementById("buscador");

let productosFinales = [];

// ===============================
// PRODUCTOS APPLE
// ===============================

const productosApple = [

    {
        nombre: "iPhone 17 Pro Max",
        imagen: "./assets/img/iphone.png",
        precio: 1199.99,
        rating: 4.9,
        descripcion: "El iPhone más potente hasta la fecha, con cámara profesional, pantalla Super Retina XDR y el nuevo chip A18 Pro."
    },

    {
        nombre: "MacBook Pro M4",
        imagen: "./assets/img/macbook.png",
        precio: 2399.99,
        rating: 4.8,
        descripcion: "Máximo rendimiento para profesionales gracias al nuevo chip M4, ideal para programación, diseño y edición."
    },

    {
        nombre: "Apple Watch SE 3",
        imagen: "./assets/img/watch.jpg",
        precio: 399.99,
        rating: 4.8,
        descripcion: "El reloj inteligente más avanzado de Apple con GPS de precisión, resistencia extrema y batería de larga duración."
    },

    {
        nombre: "AirPods Pro",
        imagen: "./assets/img/airpods.jpg",
        precio: 249.99,
        rating: 4.9,
        descripcion: "Audio inmersivo con cancelación activa de ruido y modo ambiente para disfrutar una experiencia premium."
    }

];

// ===============================
// OBTENER PRODUCTOS
// ===============================

async function mostrarProductos() {

    try {

        const respuesta = await fetch("https://dummyjson.com/products/category/smartphones");

        if (!respuesta.ok) {

            throw new Error("No se pudieron obtener los productos.");

        }

        const datos = await respuesta.json();

        productosFinales = datos.products
            .slice(0, 4)
            .map((producto, index) => ({

                id: producto.id,

                nombre: productosApple[index].nombre,

                imagen: productosApple[index].imagen,

                precio: productosApple[index].precio,

                rating: productosApple[index].rating,

                descripcion: productosApple[index].descripcion,

                stock: producto.stock

            }));

        renderizarProductos(productosFinales);

    } catch (error) {

        console.error(error);

    }

}

// ===============================
// RENDERIZAR PRODUCTOS
// ===============================

function renderizarProductos(productos) {

    contenedorProductos.innerHTML = "";

    productos.forEach((producto) => {

        const card = document.createElement("div");

        card.classList.add("card");

        card.innerHTML = `

            <img src="${producto.imagen}" alt="${producto.nombre}">

            <h3>${producto.nombre}</h3>

            <p class="rating">
                ⭐ ${producto.rating} / 5
            </p>

            <p>
                📦 Stock: ${producto.stock}
            </p>

            <p>
                ${producto.descripcion}
            </p>

            <p>
                <strong>USD ${producto.precio}</strong>
            </p>

            <button class="btn-agregar">
                Agregar al carrito
            </button>

        `;

        contenedorProductos.appendChild(card);

        const boton = card.querySelector(".btn-agregar");

        boton.addEventListener("click", () => {

            agregarAlCarrito({

                id: producto.id,

                title: producto.nombre,

                price: producto.precio,

                thumbnail: producto.imagen

            });

        });

    });

}

// ===============================
// BUSCADOR
// ===============================

buscador.addEventListener("input", () => {

    const texto = buscador.value.toLowerCase();

    const filtrados = productosFinales.filter((producto) => {

        return producto.nombre
            .toLowerCase()
            .includes(texto);

    });

    renderizarProductos(filtrados);

});

// ===============================
// INICIAR
// ===============================

mostrarProductos();