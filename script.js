// =========================================================
// ARCHIVO JAVASCRIPT: REWEAR (NIVEL ESTUDIANTE DE PREPA)
// =========================================================

// 1. Cuando carga cualquier página, actualizamos el numerito del carrito
window.onload = function() {
    actualizarContadorCarrito();

    // Si estamos en la página de carrito.html, mostramos la tabla de productos
    if (document.getElementById("lista-carrito")) {
        mostrarProductosCarrito();
    }
};

// 2. Función para agregar una prenda al carrito desde cualquier página individual
function agregarAlCarrito(nombrePrenda, precioPrenda, categoriaPrenda) {
    // Obtenemos la talla seleccionada por el usuario
    var selectorTalla = document.getElementById("talla-seleccionada");
    var talla = "Única";
    
    if (selectorTalla) {
        talla = selectorTalla.value;
    }

    // Traemos el carrito guardado en la memoria del navegador (o creamos uno vacío)
    var carrito = JSON.parse(localStorage.getItem("carritoReWear")) || [];

    // Creamos el objeto de la prenda
    var nuevaPrenda = {
        nombre: nombrePrenda,
        precio: precioPrenda,
        talla: talla,
        categoria: categoriaPrenda
    };

    // Lo guardamos en la lista y actualizamos la memoria
    carrito.push(nuevaPrenda);
    localStorage.setItem("carritoReWear", JSON.stringify(carrito));

    // Actualizamos el contador del menú y avisamos al usuario
    actualizarContadorCarrito();
    alert("✅ ¡Agregado al carrito!\nPrenda: " + nombrePrenda + "\nTalla: " + talla + "\nPrecio: $" + precioPrenda + " MXN");
}

// 3. Función para contar cuántos productos hay en el carrito
function actualizarContadorCarrito() {
    var carrito = JSON.parse(localStorage.getItem("carritoReWear")) || [];
    var contador = document.getElementById("contador-carrito");
    if (contador) {
        contador.innerText = carrito.length;
    }
}

// 4. Función para dibujar la tabla en carrito.html
function mostrarProductosCarrito() {
    var carrito = JSON.parse(localStorage.getItem("carritoReWear")) || [];
    var tablaCuerpo = document.getElementById("lista-carrito");
    var textoTotal = document.getElementById("total-pagar");

    tablaCuerpo.innerHTML = "";
    var sumaTotal = 0;

    if (carrito.length === 0) {
        tablaCuerpo.innerHTML = "<tr><td colspan='5'>Tu carrito está vacío. ¡Explora nuestras prendas!</td></tr>";
        textoTotal.innerText = "0.00";
        return;
    }

    // Recorremos cada prenda con un ciclo for sencillo
    for (var i = 0; i < carrito.length; i++) {
        var item = carrito[i];
        sumaTotal = sumaTotal + item.precio;

        var fila = "<tr>" +
            "<td>" + item.nombre + "</td>" +
            "<td>" + item.categoria + "</td>" +
            "<td>" + item.talla + "</td>" +
            "<td>$" + item.precio + ".00 MXN</td>" +
            "<td><button onclick='eliminarDelCarrito(" + i + ")' style='background:#e63946; color:white; border:none; padding:5px 10px; border-radius:4px; cursor:pointer;'>Quitar</button></td>" +
            "</tr>";

        tablaCuerpo.innerHTML += fila;
    }

    textoTotal.innerText = sumaTotal + ".00";
}

// 5. Función para quitar un producto del carrito
function eliminarDelCarrito(indice) {
    var carrito = JSON.parse(localStorage.getItem("carritoReWear")) || [];
    carrito.splice(indice, 1); // Borra 1 elemento en esa posición
    localStorage.setItem("carritoReWear", JSON.stringify(carrito));
    mostrarProductosCarrito();
    actualizarContadorCarrito();
}

// 6. Función para vaciar todo el carrito
function vaciarCarrito() {
    localStorage.removeItem("carritoReWear");
    mostrarProductosCarrito();
    actualizarContadorCarrito();
}

// 7. Función para finalizar la compra
function finalizarCompra() {
    var carrito = JSON.parse(localStorage.getItem("carritoReWear")) || [];
    if (carrito.length === 0) {
        alert("⚠️ Tu carrito está vacío. Agrega al menos una prenda antes de pagar.");
        return;
    }
    alert("🎉 ¡Gracias por tu compra en ReWear!\nTu pedido ha sido registrado con éxito. Gracias por apoyar la moda sustentable.");
    vaciarCarrito();
}