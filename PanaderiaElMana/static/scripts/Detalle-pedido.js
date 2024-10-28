const expresionesPedidos = {
	observaciones: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	cantidad_tabla: /^.{1,90}$/, // 1 a 90 digitos.
}
const camposPedidos = {
	observaciones: false,
	cantidad_tabla: false,
	
}


document.addEventListener("DOMContentLoaded", (e)=>{
 
    cargarTablaDesdeFormset();
    validarCampo(expresionesPedidos.observaciones, e.target, 'observaciones');
    validarCampo(expresionesPedidos.cantidad_tabla, e.target, 'cantidad_tabla');



 

});




document.addEventListener("DOMContentLoaded", (e)=>{
    const $formulario= document.querySelector('#formulario')
    const $main= document.querySelector('#main')
    const addButton = document.getElementById('add-form');
    const formsetContainer = document.getElementById('formset-container');



    

    
    $main.addEventListener("keyup", (e) => { 
            if(e.target.matches("#observaciones")){
                
                validarCampo(expresionesPedidos.observaciones, e.target, 'observaciones');
            }   
            else if(e.target.matches("#cantidad_tabla")){
                console.log(e.target)
                console.log(e.target.value)
                validarCampo(expresionesPedidos.cantidad_tabla, e.target, 'cantidad_tabla');
            }
        });

   
        
    $formulario.addEventListener("submit",(e)=>{
        
        e.preventDefault();
       
	    if(camposPedidos.observaciones && camposPedidos.cantidad_tabla ){
            document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
            document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
            setTimeout(() => {
                document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
            }, 5000);

            document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
                icono.classList.remove('formulario__grupo-correcto');
            });
            cargarDatosEnFormset()
            e.target.submit();
        }
       
        else {
            document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
            }
            
       
    });

    addButton.addEventListener('click', function(e) {
        agregarInsumo();
        agregarInsumoFormset();
        e.preventDefault();
        
       
    });
 

 

});





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



function agregarInsumo(){
    const tableBody = document.querySelector("#tableContainer tbody");
    const rowCount = tableBody.rows.length + 1;
    
    // Obtener valores de los campos de entrada
    const insumoSelect = document.getElementById("insumo_tabla");
    const insumo = insumoSelect.options[insumoSelect.selectedIndex].text;
    const cantidad = document.getElementById("cantidad_tabla").value;
    
    // Verifica si los campos están completos antes de agregar la fila
    if (insumoSelect.value === "" || cantidad === "") {
        alert("Por favor, complete todos los campos antes de agregar.");
        return;
    }

    // Crear la nueva fila
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${rowCount}</td>
        <td class="insumo-item">${insumo}</td>
        <td class="cantidad-item">${cantidad}</td>
        <td>
            <button type="button" class="action-button edit-button" onclick="habilitarEdicion(this)"><i class="fa-solid fa-pen-to-square fa-sm" style="color: #ffffff;"></i></button>
            <button type="button" class="action-button delete-button" onclick="eliminarFormulario(this)" ><i class="fa-solid fa-trash fa-sm" style="color: #ffffff;"></i></button>
        </td>
    `;
    
    // Agregar la fila a la tabla
    tableBody.appendChild(row);

    // Limpiar los campos después de agregar la fila
    insumoSelect.value = "";
    document.getElementById("cantidad_tabla").value = "";

}  

function habilitarEdicion(button) {
    const row = button.closest("tr");
    const insumoCell = row.querySelector(".insumo-item");
    const cantidadCell = row.querySelector(".cantidad-item");
    // Obtener los valores actuales
    const insumoActual = insumoCell.textContent.trim();
    const cantidadActual = cantidadCell.textContent.trim();
    // Crear el select e input de edición como antes
    const insumoSelect = document.getElementById("insumo_tabla").cloneNode(true);
    insumoSelect.classList.add("tabla__input", "insumo-editar"); // Cambia a clase
    for (let option of insumoSelect.options) {
        option.selected = (option.textContent.trim() === insumoActual);
    }
    insumoCell.innerHTML = "";
    insumoCell.appendChild(insumoSelect);
    cantidadCell.innerHTML = `<input type="number" class="tabla__input" id="cantidad_editar" value="${cantidadActual}">`;
    
    // Cambiar el botón a ícono de guardar y clase
    button.innerHTML = '<i class="fa-solid fa-floppy-disk fa-2xl" style="color: #1f1e1e;"></i>';
    button.classList.remove("edit-button");
    button.classList.add("save-button");
    button.onclick = function() {
        guardarEdicion(button);
    };
}

function guardarEdicion(button) {
    const row = button.closest("tr");
    const insumoCell = row.querySelector(".insumo-item");
    const cantidadCell = row.querySelector(".cantidad-item");
    const insumoEditarElement = row.querySelector(".insumo-editar");
    const cantidadEditarElement = row.querySelector("#cantidad_editar");

    if (insumoEditarElement && cantidadEditarElement) {
        const insumoEditado = insumoEditarElement.options[insumoEditarElement.selectedIndex].text;
        const cantidadEditada = cantidadEditarElement.value;

        insumoCell.textContent = insumoEditado;
        cantidadCell.textContent = cantidadEditada;

        // Obtener el índice del formulario en el formset
        const index = Array.from(row.parentNode.children).indexOf(row);
        // Actualizar los campos correspondientes en el formset usando el índice
        const form = document.querySelector(`#formset-container .insumos-form:nth-child(${index + 1})`);
        const insumoField = form.querySelector('select');
        const cantidadField = form.querySelector('input[type="number"]');

        // Actualizar los valores del formset con los valores editados en la tabla
        insumoField.value = insumoEditarElement.value;
        cantidadField.value = cantidadEditada;

        // Cambiar el botón a ícono de modificar y clase
        button.innerHTML = '<i class="fa-solid fa-pen-to-square fa-sm" style="color: #ffffff;"></i>';
        button.classList.remove("save-button");
        button.classList.add("edit-button");
        button.onclick = function() {
            habilitarEdicion(button);
        };
    } else {
        console.error("Elementos de edición no encontrados.");
    }
}



function cargarTablaDesdeFormset() {
    const formsetContainer = document.getElementById('formset-container');
    const tablaBody = document.querySelector("#tableContainer tbody");
    // Limpiar las filas actuales de la tabla
    tablaBody.innerHTML = ""; // Limpiamos el contenido previo de la tabla
    // Iterar sobre los formularios en el formset
    const forms = formsetContainer.getElementsByClassName('insumos-form');
    Array.from(forms).forEach((form, index) => {
        const insumoSelect = form.querySelector('select');
        const cantidadInput = form.querySelector('input[type="number"]');

        // Verificar que el insumo y la cantidad no estén vacíos
        if (insumoSelect.value && cantidadInput.value) {
            // Crear una nueva fila en la tabla
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${index + 1}</td>
                <td class="insumo-item">${insumoSelect.options[insumoSelect.selectedIndex].text}</td>
                <td class="cantidad-item">${cantidadInput.value}</td>
                <td>
                    <button type="button" class="action-button edit-button" onclick="habilitarEdicion(this)">
                        <i class="fa-solid fa-pen-to-square fa-sm" style="color: #ffffff;"></i>
                    </button>
                    <button type="button" class="action-button delete-button" onclick="eliminarFormulario(this)">
                        <i class="fa-solid fa-trash fa-sm" style="color: #ffffff;"></i>
                    </button>
                </td>
            `;
            // Agregar la fila a la tabla
            tablaBody.appendChild(fila);
        }
    });
}

function eliminarFormulario(button) {
    const row = button.closest("tr");
    const index = Array.from(row.parentNode.children).indexOf(row);

    // Seleccionar el formulario en el formset-container usando el índice
    const form = document.querySelector(`#formset-container .insumos-form:nth-of-type(${index + 1})`);

    if (form) {
        const deleteCheckbox = form.querySelector('input[type="checkbox"][name$="-DELETE"]');
        if (deleteCheckbox) {
            deleteCheckbox.checked = true;
        }
        row.style.display = "none"; // Ocultar la fila en la tabla sin eliminar el formulario
    } else {
        console.error("No se encontró el formulario correspondiente.");
    }
}
function cargarDatosEnFormset() {
    const rows = document.querySelectorAll("#tableContainer tbody tr");
    const forms = document.querySelectorAll("#formset-container .insumos-form");

    // Limpiar los formularios existentes antes de cargar nuevos datos
    forms.forEach(form => {
        const insumoField = form.querySelector('select[name$="-insumo"]'); // Seleccionar el campo de insumo
        const cantidadField = form.querySelector('input[name$="-cantidad"]'); // Seleccionar el campo de cantidad
        insumoField.value = ""; // Limpiar el valor del insumo
        cantidadField.value = ""; // Limpiar el valor de cantidad
    });

    // Recorre cada fila de la tabla y asigna los valores a los formularios existentes
    rows.forEach((row, index) => {
        const insumoCell = row.querySelector(".insumo-item").textContent; // Obtener el insumo
        const cantidadCell = row.querySelector(".cantidad-item").textContent; // Obtener la cantidad

        if (forms[index]) {
            const form = forms[index];
            const insumoField = form.querySelector('select[name$="-insumo"]'); // Seleccionar el campo de insumo
            const cantidadField = form.querySelector('input[name$="-cantidad"]'); // Seleccionar el campo de cantidad
            
            // Asignar el valor de cantidad
            cantidadField.value = cantidadCell; // Asignar el valor de cantidad

            // Asignar el valor del insumo al select
            const options = insumoField.options;
            for (let i = 0; i < options.length; i++) {
                if (options[i].text === insumoCell) {
                    insumoField.value = options[i].value; // Asignar el valor del insumo
                    break; // Salir del bucle una vez que se encuentre la opción
                }
            }
        }
    });
}

function agregarInsumoFormset() {
    const formsetContainer = document.getElementById('formset-container');
    const totalForms = document.getElementById('id_insumos-TOTAL_FORMS');
    const filas = document.querySelectorAll("#tableContainer tbody tr");

    // Obtener el último formulario del formset
    const lastForm = formsetContainer.lastElementChild;
    const newForm = lastForm.cloneNode(true); // Clonar el último formulario

    // Limpiar los valores del nuevo formulario
    const inputs = newForm.querySelectorAll('input');
    const selects = newForm.querySelectorAll('select');

    inputs.forEach(input => {
        input.value = ""; // Limpiar el valor del input
    });

    selects.forEach(select => {
        select.selectedIndex = -1; // Limpiar la selección del select
    });

    // Agregar el nuevo formulario al contenedor
    formsetContainer.appendChild(newForm);

    // Actualizar el total de formularios
    totalForms.value = parseInt(totalForms.value) + 1;

    // Actualizar los índices de todos los formularios
    actualizarIndicesFormset(formsetContainer);
}

function actualizarIndicesFormset(formsetContainer) {
    const forms = formsetContainer.querySelectorAll('.insumos-form');
    console.log(forms)
    forms.forEach((form, index) => {
        const inputs = form.querySelectorAll('input');
        const selects = form.querySelectorAll('select');
        console.log(inputs)
        console.log(selects)
        inputs.forEach(input => {
            updateElementIndex(input, 'insumos', index);
        });

        selects.forEach(select => {
            updateElementIndex(select, 'insumos', index);
        });
    });
}



function updateElementIndex(element, prefix, index) {
    const idRegex = new RegExp(`(${prefix}-\\d+)`);
    const replacement = `${prefix}-${index}`;
    if (element.id) element.id = element.id.replace(idRegex, replacement);
    if (element.name) element.name = element.name.replace(idRegex, replacement);
}
