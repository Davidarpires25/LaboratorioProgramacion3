document.getElementById('categoria_producto').options[0].hidden = true;

const boton_editar = document.getElementById('boton_editar')
boton_editar.addEventListener('click',validar)
const formulario = document.getElementById('formulario');

function validar(e){
    e.preventDefault();

    formulario.submit();
}

document.addEventListener('DOMContentLoaded',function(){

    const precio = document.getElementById('precio_producto')
    const cantidad = document.getElementById('cantidad_producto')

    const precioEntero = parseInt(precio.value);
    const cantidadEntero = parseInt(cantidad.value);

    document.getElementById('precio_producto').value = precioEntero;
    document.getElementById('cantidad_producto').value = cantidadEntero;

})

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