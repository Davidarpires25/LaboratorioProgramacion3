
const $botonAgregarProducto = document.getElementById("addProducto");
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


function agregarFormularioProducto(){
    
    console.log($totalForms)

}


document.addEventListener("click", function(e){
    // if(e.target === $botonAgregarProducto){
    //     agregarFormularioProducto()
    // }
});

function validarTeclas(key){
    return !((key >= 48 && key <= 59) || key === 8 || key === 13 || (key >= 96 && key <= 105));
}

// document.querySelector(`${$grupoProducto} #grupo__cantidad .formulario__grupo-input #cantidad`).addEventListener("keydown", function(keyEvent){
//     if(validarTeclas(keyEvent.keyCode)) keyEvent.preventDefault();
// })


document.addEventListener("DOMContentLoaded", function(e){
    const $formsetContainer = document.getElementById('formset-container');
    const $totalForms = document.getElementById("id_itemproducto_set-TOTAL_FORMS");
    function updateFormIndexes() {
        const forms = $formsetContainer.getElementsByClassName('form-background');
        for (let i = 0; i < forms.length; i++) {
            const formInputs = forms[i].getElementsByTagName('input');
            const formSelects = forms[i].getElementsByTagName('select');

            for (let input of formInputs) {
                console.error(input)
                updateElementIndex(input, 'itemproducto_set', i);
            }
            for (let select of formSelects) {
                console.error(select)
                updateElementIndex(select, 'itemproducto_set', i);
            }
        }
        $totalForms.value = forms.length;
        alert($totalForms.value)
    }    
    // Función para actualizar el índice de un elemento
    function updateElementIndex(element, prefix, index) {
        console.log(`ELEMENTO: ${element} PREFIJO ${prefix} INDICE ${index}`)
        const idRegex = new RegExp(`(${prefix}-\\d+)`);
        console.log("IDREX " , idRegex)
        const replacement = `${prefix}-${index}`;
        console.log("REPLACEEMEMEM", replacement)
        if (element.id) element.id = element.id.replace(idRegex, replacement);
        if (element.name) element.name = element.name.replace(idRegex, replacement);
        console.warn(element.id)
        console.warn(element.name)
    }
    // Agregar nuevo formulario
    $botonAgregarProducto.addEventListener('click', function(e) {
        e.preventDefault();
        const formCount = $formsetContainer.children.length;
        const template = $formsetContainer.children[0].cloneNode(true);

        // Limpiar los valores del formulario clonado
        template.querySelectorAll('input[type="number"]').forEach(input => input.value = '');
        template.querySelectorAll('select').forEach(select => select.selectedIndex = 0);

        $formsetContainer.appendChild(template);
        updateFormIndexes();
    });

})