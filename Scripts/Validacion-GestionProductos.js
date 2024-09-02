const descripcion = document.getElementById('desc_producto');
const botones = document.querySelectorAll('#productoForm button')
botones.forEach(boton => {
    boton.addEventListener('click',validar)
});

const formulario = document.getElementById('productoForm');

function validar(e){
    e.preventDefault();

    const id = document.getElementById('id_producto');
    if(id.value === '')
        {
            alert('ID de producto es obligatorio');
            return false;
        }
    
    const botonPulsado = e.target.name;

    prueba = 5;

    switch (botonPulsado) {

        case 'Agregar':
            if(!validarCategoria()){
                alert('Debes seleccionar una categoria de producto');
                return false;
            }
            if(!validarDescripcion()){
                alert('Debes incluir una descripción');
                return false;
            }else if(!validarSoloLetras(descripcion)){
                alert('La descripcion debe ser solo letras');
                return false;
            }
            else if(!validarPrecio()){
                alert('Debes incluir un precio');
                return false;
            }else if(!validarCantidad()){
                alert('Debes incluir una cantidad');
                return false;
            }
        break;

        case 'Editar':
            if(!validarCategoria() && !validarDescripcion() && !validarPrecio() && !validarCantidad()){
                alert('No estás modificando ningun campo');
                return false;
            }else if(!validarSoloLetras(descripcion)){
                alert('La descripcion debe ser solo letras');
                return false;
            }
        break;

        case 'Eliminar':
            formulario.submit();
        break;
    }

    formulario.submit();
}

function validarCategoria(){
    const opciones = document.getElementsByName('categoria_producto');
    let seleccionado = false;

    opciones.forEach(opcion => {
        if (opcion.checked) {
            seleccionado = true;
        }
    });

    if (!seleccionado) {
        return false;
    }
    return true;
}

function validarDescripcion(){
    if(descripcion.value === '')
    {
        return false;
    }
    return true;
}

function validarPrecio(){
    const precio = document.getElementById('costo_producto');
    if(precio.value === '')
    {
        return false;
    }
    return true;
}

function validarCantidad(){
    const cantidad = document.getElementById('cant_producto');
    if(cantidad.value === '')
    {
        return false;
    }
    return true;
}

function validarSoloLetras(input) {
    if (input.value.length === 0)
    {
        return true;
    }
    const regex = /^[a-zA-ZñÑ\s]+$/;
    return regex.test(input.value);
}