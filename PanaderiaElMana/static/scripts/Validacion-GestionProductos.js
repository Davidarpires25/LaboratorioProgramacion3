const boton_agregar = document.getElementById('boton_agregar')
boton_agregar.addEventListener('click',validar)
document.getElementById('categoria_producto').options[0].hidden = true;
console.log(document.getElementById('categoria_producto').options[0])

const formulario = document.getElementById('formulario');

function validar(e){
    e.preventDefault();

    const descripcion = document.getElementById('descripcion_producto');
    if(descripcion.value === '')
    {
        alert('Descripción del producto es obligatorio');
        return false;

    }else if(!validarSoloLetras(descripcion)){
        alert('La descripcion debe ser solo letras');
        return false;
    }
    
    const botonPulsado = e.target.name;

    switch (botonPulsado) {

        case 'Agregar':
            if(!validarCategoria()){
                alert('Debes seleccionar una categoria de producto');
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
            if(!validarCategoria() && !validarPrecio() && !validarCantidad()){
                alert('No estás modificando ningun campo');
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
    const opciones = document.getElementById('categoria_producto').options[0].selected
    let seleccionado = true;

  
    if (opciones === true) {
        seleccionado = false;
    }

    if (!seleccionado) {
        return false;
    }
    return true;
}

function validarPrecio(){
    const precio = document.getElementById('precio_producto');
    if(precio.value === '')
    {
        return false;
    }
    return true;
}

function validarCantidad(){
    const cantidad = document.getElementById('cantidad_producto');
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