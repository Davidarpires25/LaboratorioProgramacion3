const boton_agregar = document.getElementById('boton_agregar')
boton_agregar.addEventListener('click',validar)

const formulario = document.getElementById('formulario');

function validar(e){
    e.preventDefault();

    const descripcion = document.getElementById('descripcion_insumo');
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

            if(!validarCantidad()){
                alert('Debes incluir una cantidad');
                return false;
            }
        break;

    }

    formulario.submit();
}

function validarCantidad(){
    const cantidad = document.getElementById('cantidad_insumo');
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

function confirmCancel(enlace) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar producto',
        cancelButtonText: 'No, mantener producto'
    }).then((result) => {
        if (result.isConfirmed) {
            let formulario = document.getElementById('formulario_eliminar')
            formulario.action = enlace
            formulario.submit()
        }
    });
}