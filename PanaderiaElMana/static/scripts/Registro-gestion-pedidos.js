const $botonAgregarInsumo = document.getElementById("agregarInsumo");
const $botonVerInsumos = document.getElementById("listarInsumos")
const listaInsumos = [];

const expresionesPedidos = {
	observaciones: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	cantidad: /^.{1,90}$/, // 1 a 90 digitos.
}
const camposPedidos = {
	observaciones: false,
	cantidad: false,
	
}

function obtenerInsumo(){
    const $insumo = document.querySelector('.formulario__input#insumo').value
    const $cantidad = document.querySelector('.formulario__input#cantidad').value
    //los campos id y precio se deben leer de un input hidden, este input hidden obtendrá los datos de la base de datos de insumo 😎
    const $id = document.querySelector("input[type='hidden']#idInsumo").value
    const $precio = document.querySelector("input[type='hidden']#precioInsumo").value;
    return {id:$id, nombre:$insumo, cantidad: $cantidad, precio:$precio}
}

function cargarInsumo(){
    let productoNuevo = obtenerInsumo()
    if(productoNuevo){
        listaInsumos.push(productoNuevo);
        document.querySelector('.formulario__input#insumo').value = "";
        document.querySelector('.formulario__input#cantidad').value = "";   
    }
}

function cargarListaInsumos(){
    const $tbody = document.querySelector("table tbody")
    const $totalRow = document.querySelector("tfoot #totalRow");
    let total = 0;
    let formato = "";
    for(let insumo of listaInsumos){
        formato +=
        `<tr>
            <td data-label = "Id">555</td>
            <td data-label = "Producto">${insumo.nombre}</td>
            <td data-label = "Cantidad">${insumo.cantidad}</td>
            <td data-label = "Precio">${insumo.precio}</td>
            <td data-label="Accion">
                <div class="action-buttons">
                    <button class="action-button edit-button"><i class="fa-solid fa-pen-to-square fa-sm" style="color: #ffffff;"></i></button>
                    <button class="action-button delete-button"><i class="fa-solid fa-trash fa-sm" style="color: #ffffff;"></i></button>
                </div>
            </td>
        </tr>
        `
        total += (parseFloat(insumo.precio)) * parseInt(insumo.cantidad);
    }
    $tbody.innerHTML = formato;
    $totalRow.innerHTML = `TOTAL: ${total.toFixed(2)}`;
}

document.addEventListener("DOMContentLoaded", (e)=>{
    const $tabla= document.querySelector('#tabla')
    const $formulario= document.querySelector('#formulario')
    const $tablaTitulo= document.querySelector('.table-title')
    controlFecha();
    

    $formulario.addEventListener("click", (e) => {
      
        
        if(e.target.matches("#listarInsumos")){
            $formulario.setAttribute('hidden','');
            $tabla.removeAttribute('hidden');
            $tablaTitulo.removeAttribute('hidden');
                
        }
       
    });
    //boton volver atras
    document.getElementById("btn-tabla").addEventListener("click", function(e){
        $formulario.removeAttribute('hidden');
        $tabla.setAttribute('hidden','');
        $tablaTitulo.setAttribute("hidden",'');
    })
    
    $formulario.addEventListener("keyup", (e) => { 
            if(e.target.matches("#observaciones")){
                
                validarCampo(expresionesPedidos.observaciones, e.target, 'observaciones');
            }   
            else if(e.target.matches("#cantidad")){
                validarCampo(expresionesPedidos.cantidad, e.target, 'cantidad');
            }
        });

   
        
    $formulario.addEventListener("submit",(e)=>{
        e.preventDefault();
        const terminos = document.getElementById('terminos');
      
        console.log(camposPedidos.observaciones,camposPedidos.cantidad)
	    if(camposPedidos.observaciones && camposPedidos.cantidad ){
            document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
            $formulario.reset();
            document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
            setTimeout(() => {
                document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
            }, 5000);

            document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
                icono.classList.remove('formulario__grupo-correcto');
            });
            e.target.submit();
        }
       
        else {
            document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
            }
            
       
    });

    
    
 

});




function controlFecha(){
    const $fechaSolicitud= document.querySelector("#fechaSolicitud");
    const fechaActual = new Date().toISOString().split('T')[0];
    let fechaMaxima = new Date();
    fechaMaxima.setMonth(fechaMaxima.getMonth() + 1)
   
    fechaMaxima=fechaMaxima.toISOString().split('T')[0];

    $fechaSolicitud.setAttribute("min",fechaActual);
    $fechaSolicitud.setAttribute("max",fechaMaxima);


};

function validarCampo(expresion, input, campo){
    if(expresion.test(input.value)){
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
		camposPedidos[campo] = true;
	} else {
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
		camposPedidos[campo] = false;
	}
    
}



document.addEventListener("click", function(e){
    if(e.target === $botonAgregarInsumo){
        cargarInsumo();
    }
    if(e.target === $botonVerInsumos){
        cargarListaInsumos()
    }
});