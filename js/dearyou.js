// ===========================================
// DEARYOU
// JAVASCRIPT GENERAL
// FASE 3 - API RESTFUL + PRODUCTOS + CARRITO
// ===========================================



// ===========================================
// 1. PRODUCT DATABASE
// ===========================================

const productos = {

    skin: {

        id: "skin",

        nombre: "Soft Skin Tint",

        tagline: "Your skin, still your skin.",

        descripcion:
            "A lightweight skin tint created to enhance your natural complexion while keeping your real skin visible.",

        precio: 399

    },


    blush: {

        id: "blush",

        nombre: "Cloud Blush",

        tagline: "A soft touch of color, made for you.",

        descripcion:
            "A soft blush designed to add a natural flush of color while keeping your look fresh and effortless.",

        precio: 329

    },


    lip: {

        id: "lip",

        nombre: "Love Letter Lip Tint",

        tagline: "A little color. A lot of you.",

        descripcion:
            "A comfortable lip tint created for everyday color, confidence and personal expression.",

        precio: 299

    }

};



// ===========================================
// 2. A LITTLE NOTE FOR YOU
// FASE 3 - ECHOES API REAL
// ===========================================

const botonMensaje =
    document.getElementById("botonMensaje");

const frase =
    document.getElementById("frase");

const autor =
    document.getElementById("autor");



async function obtenerNuevaFrase() {

    // Si no estamos en index.html,
    // estos elementos no existen.
    if (!botonMensaje || !frase || !autor) {
        return;
    }


    // Mensaje temporal mientras carga
    frase.textContent =
        "Finding a little note for you...";

    autor.textContent =
        "— DearYou";

    botonMensaje.disabled = true;

    botonMensaje.textContent =
        "Loading...";


    try {

        const respuesta =
            await fetch(
                "https://echoes.soferity.com/api/quotes/random?lang=en"
            );


        // Verifica si la API respondió correctamente
        if (!respuesta.ok) {

            throw new Error(
                "The API did not respond correctly."
            );

        }


        // Convierte la respuesta JSON
        const data =
            await respuesta.json();


        // Coloca la frase en pantalla
        frase.textContent =
            data.quote;


        // Coloca el autor en pantalla
        autor.textContent =
            "— " + data.author;

    }

    catch (error) {

        console.error(
            "Error consulting Echoes API:",
            error
        );


        // Mensaje de respaldo
        frase.textContent =
            "Be proud of how far you have come.";

        autor.textContent =
            "— DearYou";

    }

    finally {

        botonMensaje.disabled = false;

        botonMensaje.textContent =
            "New message for me";

    }

}



// Evento del botón

if (botonMensaje) {

    botonMensaje.addEventListener(
        "click",
        obtenerNuevaFrase
    );

}



// ===========================================
// 3. CART HELPERS
// ===========================================

function obtenerCarrito() {

    const carritoGuardado =
        localStorage.getItem(
            "dearyouCart"
        );


    if (carritoGuardado) {

        return JSON.parse(
            carritoGuardado
        );

    }


    return [];

}



function guardarCarrito(carrito) {

    localStorage.setItem(
        "dearyouCart",
        JSON.stringify(carrito)
    );


    actualizarContadorCarrito();

}



function actualizarContadorCarrito() {

    const carrito =
        obtenerCarrito();


    let totalProductos = 0;


    carrito.forEach(

        function (item) {

            totalProductos +=
                item.cantidad;

        }

    );


    const contadores =
        document.querySelectorAll(
            "#cartCount"
        );


    contadores.forEach(

        function (contador) {

            contador.textContent =
                totalProductos;

        }

    );

}



actualizarContadorCarrito();



// ===========================================
// 4. PRODUCT PAGE
// ===========================================

const productPage =
    document.getElementById(
        "productPage"
    );


if (productPage) {


    const parametros =
        new URLSearchParams(
            window.location.search
        );


    const productId =
        parametros.get("item")
        || "skin";


    const producto =
        productos[productId]
        || productos.skin;



    const productName =
        document.getElementById(
            "productName"
        );


    const productTagline =
        document.getElementById(
            "productTagline"
        );


    const productDescription =
        document.getElementById(
            "productDescription"
        );


    const productPrice =
        document.getElementById(
            "productPrice"
        );


    const productVisual =
        document.getElementById(
            "productVisual"
        );


    const quantityDisplay =
        document.getElementById(
            "quantity"
        );


    const minusButton =
        document.getElementById(
            "minusButton"
        );


    const plusButton =
        document.getElementById(
            "plusButton"
        );


    const addToCartButton =
        document.getElementById(
            "addToCartButton"
        );



    // Información del producto

    productName.textContent =
        producto.nombre;


    productTagline.textContent =
        producto.tagline;


    productDescription.textContent =
        producto.descripcion;


    productPrice.textContent =
        "$" +
        producto.precio +
        " MXN";



    // =======================================
    // VISUAL DEL PRODUCTO
    // =======================================

    if (producto.id === "skin") {

        productVisual.innerHTML = `

            <div class="product-detail-product">

                <div class="producto-botella">

                    <div class="botella-tapa">
                    </div>

                    <div class="botella-cuerpo">

                        DearYou

                    </div>

                </div>

            </div>

        `;

    }



    if (producto.id === "blush") {

        productVisual.innerHTML = `

            <div class="product-detail-product">

                <div class="compacto">

                    DearYou

                </div>

            </div>

        `;

    }



    if (producto.id === "lip") {

        productVisual.innerHTML = `

            <div class="product-detail-product">

                <div class="lipstick">

                    <div class="lipstick-top">
                    </div>

                    <div class="lipstick-body">

                        DearYou

                    </div>

                </div>

            </div>

        `;

    }



    // =======================================
    // QUANTITY
    // =======================================

    let cantidad = 1;


    minusButton.addEventListener(
        "click",

        function () {

            if (cantidad > 1) {

                cantidad--;

                quantityDisplay.textContent =
                    cantidad;

            }

        }

    );


    plusButton.addEventListener(
        "click",

        function () {

            cantidad++;

            quantityDisplay.textContent =
                cantidad;

        }

    );



    // =======================================
    // ADD TO CART
    // =======================================

    addToCartButton.addEventListener(
        "click",

        function () {


            const carrito =
                obtenerCarrito();


            const productoExistente =
                carrito.find(

                    function (item) {

                        return (
                            item.id
                            === producto.id
                        );

                    }

                );


            if (productoExistente) {

                productoExistente.cantidad +=
                    cantidad;

            }

            else {

                carrito.push({

                    id:
                        producto.id,

                    nombre:
                        producto.nombre,

                    precio:
                        producto.precio,

                    cantidad:
                        cantidad

                });

            }


            guardarCarrito(
                carrito
            );


            window.location.href =
                "cart.html";

        }

    );

}



// ===========================================
// 5. CART PAGE
// ===========================================

const cartPage =
    document.getElementById(
        "cartPage"
    );


if (cartPage) {

    renderizarCarrito();


    const checkoutButton =
        document.getElementById(
            "checkoutButton"
        );


    checkoutButton.addEventListener(
        "click",

        function () {

            const carrito =
                obtenerCarrito();


            if (
                carrito.length === 0
            ) {

                alert(
                    "Your cart is empty."
                );

                return;

            }


            alert(
                "Thank you for choosing DearYou ♡\n\nCheckout is displayed as part of the project prototype."
            );

        }

    );

}



// ===========================================
// 6. RENDER CART
// ===========================================

function renderizarCarrito() {

    const cartItems =
        document.getElementById(
            "cartItems"
        );


    if (!cartItems) {

        return;

    }


    const carrito =
        obtenerCarrito();


    const subtotalElemento =
        document.getElementById(
            "cartSubtotal"
        );


    const totalElemento =
        document.getElementById(
            "cartTotal"
        );


    cartItems.innerHTML =
        "";


    // Carrito vacío

    if (
        carrito.length === 0
    ) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <div class="empty-heart">
                    ♡
                </div>

                <h2>
                    Your cart is waiting for you.
                </h2>

                <p>
                    Discover something that feels like you.
                </p>

                <a
                    href="index.html#productos"
                    class="btn btn-dearyou"
                >

                    Discover products

                </a>

            </div>

        `;


        subtotalElemento.textContent =
            "$0 MXN";


        totalElemento.textContent =
            "$0 MXN";


        actualizarContadorCarrito();


        return;

    }



    let subtotal = 0;



    carrito.forEach(

        function (item) {


            const totalProducto =
                item.precio *
                item.cantidad;


            subtotal +=
                totalProducto;



            const fila =
                document.createElement(
                    "div"
                );


            fila.className =
                "cart-item";


            fila.innerHTML = `

                <div class="cart-item-visual">

                    ♡

                </div>


                <div class="cart-item-info">

                    <p class="eyebrow">
                        DEARYOU
                    </p>

                    <h3>
                        ${item.nombre}
                    </h3>

                    <p>
                        $${item.precio} MXN
                    </p>


                    <div class="cart-item-actions">

                        <button
                            onclick="cambiarCantidad('${item.id}', -1)"
                        >

                            −

                        </button>


                        <span>

                            ${item.cantidad}

                        </span>


                        <button
                            onclick="cambiarCantidad('${item.id}', 1)"
                        >

                            +

                        </button>


                        <button
                            class="remove-button"
                            onclick="eliminarProducto('${item.id}')"
                        >

                            Remove

                        </button>

                    </div>

                </div>


                <div class="cart-item-total">

                    $${totalProducto} MXN

                </div>

            `;


            cartItems.appendChild(
                fila
            );

        }

    );



    subtotalElemento.textContent =
        "$" +
        subtotal +
        " MXN";


    totalElemento.textContent =
        "$" +
        subtotal +
        " MXN";


    actualizarContadorCarrito();

}



// ===========================================
// 7. CHANGE CART QUANTITY
// ===========================================

function cambiarCantidad(
    productId,
    cambio
) {

    const carrito =
        obtenerCarrito();


    const producto =
        carrito.find(

            function (item) {

                return (
                    item.id
                    === productId
                );

            }

        );


    if (!producto) {

        return;

    }


    producto.cantidad +=
        cambio;


    if (
        producto.cantidad <= 0
    ) {

        eliminarProducto(
            productId
        );

        return;

    }


    guardarCarrito(
        carrito
    );


    renderizarCarrito();

}



// ===========================================
// 8. REMOVE PRODUCT
// ===========================================

function eliminarProducto(
    productId
) {

    let carrito =
        obtenerCarrito();


    carrito =
        carrito.filter(

            function (item) {

                return (
                    item.id
                    !== productId
                );

            }

        );


    guardarCarrito(
        carrito
    );


    renderizarCarrito();

}