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