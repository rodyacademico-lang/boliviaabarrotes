// TABLA DINÁMICA

let productos = [];

function agregarAlCarrito(nombre, precio) {
    
    let productos = JSON.parse(localStorage.getItem("carrito")) || [];

   
    productos.push({
        nombre: nombre,
        precio: parseFloat(precio)
    });

    
    localStorage.setItem("carrito", JSON.stringify(productos));

    
    alert(`¡${nombre} agregado exitosamente!`);

   
    cargarTabla();
}



function cargarTabla() {
    const tbody = document.getElementById("tablaProductos");
    const totalContenedor = document.getElementById("totalTabla");
    
    
    if (!tbody) return;

    
    let productos = JSON.parse(localStorage.getItem("carrito")) || [];
    
    tbody.innerHTML = ""; 
    let total = 0;

    
    productos.forEach(prod => {
        const fila = `
            <tr>
                <td>${prod.nombre}</td>
                <td>Bs. ${prod.precio.toFixed(2)}</td>
            </tr>
        `;
        tbody.innerHTML += fila;
        total += prod.precio;
    });

   
    if (totalContenedor) {
        totalContenedor.textContent = `Total: Bs. ${total.toFixed(2)}`;
    }
}


document.addEventListener("DOMContentLoaded", cargarTabla);



function agregarProducto(){

    let nombre = document.getElementById("nombreProducto").value;
    let precio = document.getElementById("precioProducto").value;

    if(nombre === "" || precio === ""){
        alert("Complete todos los campos");
        return;
    }

    productos.push({
        nombre:nombre,
        precio:precio
    });

    agregarAlCarrito(nombre, precio)

    document.getElementById("nombreProducto").value = "";
    document.getElementById("precioProducto").value = "";
}

// FORMULARIO

function validarFormulario(){

    let nombre = document.getElementById("nombre").value;
    let correo = document.getElementById("correo").value;
    let telefono = document.getElementById("telefono").value;
    let mensaje = document.getElementById("mensaje").value;

    if(nombre === "" ||
       correo === "" ||
       telefono === "" ||
       mensaje === ""){

        alert("Todos los campos son obligatorios");
        return false;
    }

    let expresion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!expresion.test(correo)){
        alert("Ingrese un correo válido");
        return false;
    }

    alert("Formulario enviado correctamente");
    return false;
}

// PAGOS

function pagarTarjeta() {
   
    const titular = document.getElementById("titular").value.trim();
    const tarjeta = document.getElementById("tarjeta").value.trim();
    const vencimiento = document.getElementById("vencimiento").value.trim();
    const cvv = document.getElementById("cvv").value.trim();

    
    if (titular === "" || tarjeta === "" || vencimiento === "" || cvv === "") {
        alert("Por favor, complete todos los campos del formulario.");
        return; 
    }

    
    alert("Pago realizado correctamente");
    window.location.href = "factura.html";
}


function pagarQR(){

    alert("Pago QR confirmado correctamente");

    window.location.href = "factura.html";
}

window.onload = function(){
    cargarTabla();
};

function vaciarTodo() {
    localStorage.removeItem("carrito"); 
    cargarTabla(); 
}

function calcularTotal(){

    let total = 0;

    productos.forEach(producto => {
        total += Number(producto.precio);
    });

    return total;
}
function descargarPDF(){

    let elemento = document.body;

    html2pdf()
    .from(elemento)
    .save("Factura-SuperMarket.pdf");

}

function irAPagar() {
    
    let productos = JSON.parse(localStorage.getItem("carrito")) || [];
    
    
    let totalAcumulado = productos.reduce((suma, prod) => suma + prod.precio, 0);
    
    if (totalAcumulado === 0) {
        alert("El carrito está vacío. Agrega productos antes de pagar.");
        return; 
    }
    
    
    localStorage.setItem("montoTotalAPagar", totalAcumulado);
    
    
    window.location.href = "pago.html"; 
}


document.addEventListener("DOMContentLoaded", () => {
    
    const contenedorTotalPagar = document.getElementById("totalPagar");
    
    if (contenedorTotalPagar) {
        
        const totalGuardado = localStorage.getItem("montoTotalAPagar") || "0";
        
        
        const totalFormateado = parseFloat(totalGuardado).toFixed(2);
        
        
        contenedorTotalPagar.textContent = `Total a Pagar: Bs. ${totalFormateado}`;
    }
});
function generarCarruselSimple() {
    const contenedor = document.getElementById("contenedor-tarjetas");
    let html = "";

    
    productos.forEach((prod, index) => {
        
        const claseActive = (index === 0) ? "active" : "";

        html += `
            <div class="carousel-item ${claseActive}">
                <div class="tarjeta-carrusel p-3">
                    <div class="card sombra">
                        <img src="https://placeholder.com{prod.img}" class="card-img-top" alt="${prod.nombre}">
                        <div class="card-body text-center">
                            <h5>${prod.nombre}</h5>
                            <p class="text-muted">${prod.peso}</p>
                            <h4 class="text-success">Bs. ${prod.precio}</h4>
                            <button class="btn btn-success w-100" onclick="agregarAlCarrito('${prod.nombre}', ${prod.precio})">
                                Agregar al carrito
                            </button>
                        </div>
                    </div>
                </div>
            </div>`;
    });

    contenedor.innerHTML = html;
}
