
const $botonAgregarProducto = d.getElementById("addProducto");
const $botonVerProductos = d.getElementById("listarProductos")
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


function agregarFormularioProducto(){
    const $formsetContainer = d.getElementById('formset-container');
    const $totalForms = d.getElementById("id_itemproducto_set-TOTAL_FORMS");
    const $precioAct = d.getElementById("id_itemproducto_set-0-precioActual");
    const $cantidad = d.getElementById("id_itemproducto_set-0-cantidad");
    $precioAct.classList.add("formulario__input");
    $cantidad.classList.add("formulario__input");
    function updateFormIndexes() {
        const forms = $formsetContainer.getElementsByClassName('form-background');
        for (let i = 0; i < forms.length; i++) {
            const formInputs = forms[i].getElementsByTagName('input');
            const formSelects = forms[i].getElementsByTagName('select');

            for (let input of formInputs) {
                updateElementIndex(input, 'itemproducto_set', i);
            }
            for (let select of formSelects) {
                updateElementIndex(select, 'itemproducto_set', i);
            }
        }
        $totalForms.value = forms.length;
    }    
    // Función para actualizar el índice de un elemento
    function updateElementIndex(element, prefix, index) {
        const idRegex = new RegExp(`(${prefix}-\\d+)`);
        const replacement = `${prefix}-${index}`;
        if (element.id) element.id = element.id.replace(idRegex, replacement);
        if (element.name) element.name = element.name.replace(idRegex, replacement);
    }
    // Agregar nuevo formulario
    $botonAgregarProducto.addEventListener('click', function(e) {
        e.preventDefault();
        const template = $formsetContainer.children[0].cloneNode(true);

        // Limpiar los valores del formulario clonado
        template.querySelectorAll('input[type="number"]').forEach(input => input.value = '');
        template.querySelectorAll('select').forEach(select => select.selectedIndex = 0);

        $formsetContainer.appendChild(template);
        updateFormIndexes();
    });
}



function validarTeclas(key){
    return !((key >= 48 && key <= 59) || key === 8 || key === 13 || (key >= 96 && key <= 105));
}

// document.querySelector(`${$grupoProducto} #grupo__cantidad .formulario__grupo-input #cantidad`).addEventListener("keydown", function(keyEvent){
//     if(validarTeclas(keyEvent.keyCode)) keyEvent.preventDefault();
// })

function filtrarPrecio(texto){
    return parseFloat(texto.match(/\b\d+(\.\d+)?\b/)[0]);
}

function actualizarTotal(cantidad){
    const $precioTotal = d.getElementById("precioTotal");
    const precios = d.querySelectorAll('[id^="id_itemproducto_set"][id$="precioActual"]');
    let precioTotal = 0;
    for(let precio of precios){
        precioTotal += parseFloat(precio.value) * parseInt(cantidad);
    }
    $precioTotal.value = precioTotal;
}

function campoSoloLectura(){
    const $precios = d.querySelectorAll('[id^="id_itemproducto_set"][id$="precioActual"]');
    for(let precio of $precios){
        precio.setAttribute("readonly", true);
    }
}


d.addEventListener("DOMContentLoaded", function(e){
    campoSoloLectura();
    agregarFormularioProducto();
});

d.addEventListener("change", function(e){
    if(e.target.matches("#producto")){
        let productoTexto = e.target.options[e.target.selectedIndex].text;
        let precioProducto = filtrarPrecio(productoTexto);
        let campoPrecio = e.target.parentNode.parentNode.parentNode.nextElementSibling.querySelector("input[type='number']");
        let cantidad = e.target.parentNode.parentNode.parentNode.nextElementSibling.nextElementSibling.querySelector("input[type='number']").value;
        campoPrecio.value = precioProducto;
        actualizarTotal(cantidad || 1)
    }
    if(e.target.matches('[id^="id_itemproducto_set"][id$="cantidad"]')){
        actualizarTotal(e.target.value || 1);
    }
})