const $botonAgregarInsumo = document.getElementById("add-form");
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
    const $insumo = document.querySelector('#insumo')
    const $insumo_nombre=$insumo.options[$insumo.selectedIndex].text;
    const $cantidad = document.querySelector('#cantidad').value
    //los campos id y precio se deben leer de un input hidden, este input hidden obtendrá los datos de la base de datos de insumo 😎
    const $id = document.querySelector("input[type='hidden']#idInsumo").value
    const $precio = document.querySelector("input[type='hidden']#precioInsumo").value;
    return {id:$id, nombre:$insumo_nombre, cantidad: $cantidad, precio:$precio}
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
    let i=0
    for(let insumo of listaInsumos){
        formato +=
        `<tr>
            <td data-label = "id">${i+1}</td>
            <td data-label = "Producto">${insumo.nombre}</td>
            <td data-label = "Cantidad">${insumo.cantidad}</td>
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
    const $formulario= document.querySelector('#formulario')
    const addButton = document.getElementById('add-form');
    const formsetContainer = document.getElementById('formset-container');


    
    $formulario.addEventListener("keyup", (e) => { 
            if(e.target.matches("#observaciones")){
                
                validarCampo(expresionesPedidos.observaciones, e.target, 'observaciones');
            }   
            else if(e.target.matches("#cantidad")){
                validarCampo(expresionesPedidos.cantidad, e.target, 'cantidad');
            }
        });

   
        
    $formulario.addEventListener("submit",(e)=>{
        e.target.submit();

        e.preventDefault();
     
	    if(camposPedidos.observaciones && camposPedidos.cantidad ){
            document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
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

    
    

    // Función para actualizar el índice de un elemento
   
    // Agregar nuevo formulario
    addButton.addEventListener('click', function(e) {
        e.preventDefault();
        const formCount = formsetContainer.children.length;
        const template = formsetContainer.children[0].cloneNode(true);
        

        // Limpiar los valores del formulario clonado
        template.querySelectorAll('input[type="number"]').forEach(input => input.value = '');
        template.querySelectorAll('select').forEach(select => select.selectedIndex = 0);

        formsetContainer.appendChild(template);
        updateFormIndexes();
    });

    // Eliminar formulario
    formsetContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('delete-form')) {
            e.preventDefault();
            const form = e.target.closest('.seccion-form');
            form.remove();
            updateFormIndexes();
        }
    });
    
 

});

function updateFormIndexes() {
    const totalForms = document.getElementById('id_insumos-TOTAL_FORMS');
    const formsetContainer = document.getElementById('formset-container');
    const forms = formsetContainer.getElementsByClassName('seccion-form');
    for (let i = 0; i < forms.length; i++) {
        const formInputs = forms[i].getElementsByTagName('input');
        const formSelects = forms[i].getElementsByTagName('select');

        for (let input of formInputs) {
            updateElementIndex(input, 'insumos', i);
        }
        for (let select of formSelects) {
            updateElementIndex(select, 'insumos', i);
        }
    }
    totalForms.value = forms.length;
}

function updateElementIndex(element, prefix, index) {
    const idRegex = new RegExp(`(${prefix}-\\d+)`);
    const replacement = `${prefix}-${index}`;
    if (element.id) element.id = element.id.replace(idRegex, replacement);
    if (element.name) element.name = element.name.replace(idRegex, replacement);
}




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
        console.log(e.value)
        cargarInsumo();
        cargarListaInsumos();
    }
   
});