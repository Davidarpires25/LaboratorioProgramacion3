
const $botonAgregarProducto = d.getElementById("addProducto");
const $grupoProducto = ".form-background.grupoProducto";


// function validarProducto(nombre){
//     return nombre != "";
// }

// function validarPrecio(p){
//     let restricciones = [
//         {
//             restriccion: p === "",
//             informacion: "El precio está vacio"
//         },
//         {
//             restriccion: !(/^[0-9]+(\.[0-9]+)?$/
//             .test(p)),
//             informacion: "Solo se permiten caracteres numericos"
//         },
//         {
//             restriccion: parseFloat(p) <= 0,
//             informacion: "Valor invalido de precio"
//         }
//     ]
//     for(let prueba of restricciones){
//         if(prueba.restriccion){
//             alert(prueba.informacion);
//             return false;
//         }
//     }
//     return true;
// }

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
    d.addEventListener("click", function(e){
        if(e.target === $botonAgregarProducto){
            e.preventDefault();
            const template = $formsetContainer.children[0].cloneNode(true);
    
            // Limpiar los valores del formulario clonado
            template.querySelectorAll('[id^="id_itemproducto_set"][id$="precioActual"]').forEach(input => input.value = '');
            template.querySelectorAll('[id^="id_itemproducto_set"][id$="cantidad"]').forEach(input => input.value = '1');
            template.querySelectorAll('select').forEach(select => select.selectedIndex = 0);
    
            $formsetContainer.appendChild(template);
            updateFormIndexes();
        }
        if(e.target.matches("#btnEliminarProducto")){
            e.preventDefault()
            if(controlFormsProducto()){
                const $checkBox = e.target.nextElementSibling;
                $checkBox.checked = true;
                let form = e.target.closest(".grupoProducto")
                console.log(form)
                form.remove()
                updateFormIndexes();
                actualizarTotal();
            }
            else{
                alert("DEBE EXISTIR POR LO MENOS 1 FORMULARIO DE PRODUCTO")
            }
        }
    })
}



function filtrarPrecio(texto){
    return parseFloat(texto.match(/\b\d+(\.\d+)?\b/)[0]);
}

function actualizarTotal(){
    const $precioTotal = d.getElementById("precioTotal");
    const subtotales = d.querySelectorAll('[id^="id_itemproducto_set"][id$="subtotal"]');
    let precioTotal = 0;
    for(let precio of subtotales){
        precioTotal += parseFloat(precio.value);
    }
    $precioTotal.value = precioTotal || '';
}

function campoSoloLectura(){
    const $precios = d.querySelectorAll('[id^="id_itemproducto_set"][id$="precioActual"]');
    for(let precio of $precios){
        precio.setAttribute("readonly", true);
    }
}

function ocultarDelete(){
    const $checkboxDelete = d.querySelectorAll('[id^="id_itemproducto_set"][id$="DELETE"]');
    for(let checkbox of $checkboxDelete){
        checkbox.classList.add("desactivado");
    }
}

function controlFormsProducto(){
    const $gruposProductos = d.querySelectorAll(".grupoProducto")
    return $gruposProductos.length > 1;
}

function generadorNroComprobante(){
    let numero = Math.floor(1000000000 + Math.random() * 9000000000);
    d.getElementById("nroComprobante").value = numero;
}

function valorCampoCantidad(){
    const $campoCantidad = d.getElementById('id_itemproducto_set-0-cantidad');  
    $campoCantidad.value = 1 
}

d.addEventListener("DOMContentLoaded", function(e){
    campoSoloLectura();
    agregarFormularioProducto();
    ocultarDelete();
    generadorNroComprobante();
    valorCampoCantidad();
});

d.addEventListener("change", function(e){
    if(e.target.matches("#producto")){
        let productoTexto = e.target.options[e.target.selectedIndex].text;
        let precioProducto = filtrarPrecio(productoTexto);
        let campoPrecio = e.target.parentNode.parentNode.parentNode.nextElementSibling.querySelector("input[type='number']");
        let campoCantidad = e.target.parentNode.parentNode.parentNode.nextElementSibling.nextElementSibling.querySelector("input[type='number']");
        campoPrecio.value = precioProducto;
        const $subtotal = campoCantidad.nextElementSibling;
        $subtotal.value = precioProducto * (campoCantidad.value || 1);
        actualizarTotal()
    }
    if(e.target.matches('[id^="id_itemproducto_set"][id$="cantidad"]')){
        validarCantidad(e.target.value)
        let precioProducto = e.target.parentNode.parentNode.parentNode.querySelector("input[type='number']").value;
        const $subtotal = e.target.nextElementSibling;
        $subtotal.value = precioProducto * (e.target.value || 1);
        actualizarTotal()
    }
});

