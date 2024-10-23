
const $botonAgregarProducto = document.getElementById("agregarProducto");
const $botonVerProductos = document.getElementById("listarProductos")
const $grupoProducto = ".form-background.grupoProducto";
const listaProductos = [];


function validarProducto(nombre){
    return nombre != "";
}

function validarPrecio(p){
    let restricciones = [
        {
            restriccion: p === "",
            informacion: "El precio está vacio"
        },
        {
            restriccion: !(/^[0-9]+(\.[0-9]+)?$/
            .test(p)),
            informacion: "Solo se permiten caracteres numericos"
        },
        {
            restriccion: parseFloat(p) <= 0,
            informacion: "Valor invalido de precio"
        }
    ]
    for(let prueba of restricciones){
        if(prueba.restriccion){
            alert(prueba.informacion);
            return false;
        }
    }
    return true;
}

function validarCantidad(c){
    let restricciones = [
        {
            restriccion: c === "",
            informacion: "La cantidad está vacia"
        },
        {
            restriccion: parseFloat(c) <= 0,
            informacion: "Valor invalido de cantidad"
        },
        {
            restriccion: !(/^[0-9]+$/.test(c)),
            informacion: "Solo se permiten caracteres numericos"
        }
    ]
    for(let prueba of restricciones){
        if(prueba.restriccion){
            alert(prueba.informacion);
            return false;
        }
    }
    return true;
}

function obtenerProducto(){
    const $id = document.querySelector("input[type='hidden']#idProducto").value;
    const $producto = document.querySelector(`${$grupoProducto} #producto`).value
    const $precio = document.querySelector(`${$grupoProducto} #precio`).value
    const $cantidad = document.querySelector(`${$grupoProducto} #cantidad`).value
    if(validarProducto($producto), validarPrecio($precio), validarCantidad($cantidad)){
        return {id:$id, nombre:$producto, precio: $precio, cantidad: $cantidad}
    }
    return false;
}

function cargarProducto(){
    let productoNuevo = obtenerProducto()
    if(productoNuevo){
        listaProductos.push(productoNuevo);
        document.querySelector(`${$grupoProducto} #producto`).value = "";
        document.querySelector(`${$grupoProducto} #precio`).value = "";
        document.querySelector(`${$grupoProducto} #cantidad`).value = "";   
    }
}


function cargarListaProductos(){
    const $tbody = document.querySelector("table tbody")
    const $totalRow = document.querySelector("tfoot #totalRow");
    let total = 0;
    let formato = "";
    for(let producto of listaProductos){
        formato +=
        `<tr>
            <td data-label = "Id">${producto.id}</td>
            <td data-label = "Producto">${producto.nombre}</td>
            <td data-label = "Cantidad">${producto.cantidad}</td>
            <td data-label = "Precio">${producto.precio}</td>
            <td data-label="Accion">
                <div class="action-buttons">
                    <button class="action-button edit-button"><i class="fa-solid fa-pen-to-square fa-sm" style="color: #ffffff;"></i></button>
                    <button class="action-button delete-button"><i class="fa-solid fa-trash fa-sm" style="color: #ffffff;"></i></button>
                </div>
            </td>
        </tr>
        `
        total += (parseFloat(producto.precio)) * parseInt(producto.cantidad);
    }
    $tbody.innerHTML = formato;
    $totalRow.innerHTML = `TOTAL: ${total.toFixed(2)}`;
}

document.addEventListener("click", function(e){
    if(e.target === $botonAgregarProducto){
        cargarProducto();
    }
    if(e.target === $botonVerProductos){
        cargarListaProductos();
    }
});

function validarTeclas(key){
    return !((key >= 48 && key <= 59) || key === 8 || key === 13 || (key >= 96 && key <= 105));
}

document.querySelector(`${$grupoProducto} #grupo__cantidad .formulario__grupo-input #cantidad`).addEventListener("keydown", function(keyEvent){
    if(validarTeclas(keyEvent.keyCode)) keyEvent.preventDefault();
})
