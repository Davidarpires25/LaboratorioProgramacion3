const $botonAgregarInsumo = document.getElementById("add-form");
const $botonVerInsumos = document.getElementById("listarInsumos")


const expresionesPedidos = {
	observaciones: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	cantidad_tabla: /^.{1,90}$/, // 1 a 90 digitos.
}
const camposPedidos = {
	observaciones: false,
	cantidad_tabla: true,
	
}





document.addEventListener("DOMContentLoaded", (e)=>{
    const $formulario= document.querySelector('#formulario')
    const addButton = document.getElementById('add-form');
    const formsetContainer = document.getElementById('formset-container');
    const $modificar= document.querySelector('.btn-modificar')



    

    
    $formulario.addEventListener("keyup", (e) => { 
            if(e.target.matches("#observaciones")){
                
                validarCampo(expresionesPedidos.observaciones, e.target, 'observaciones');
            }   
            else if(e.target.matches("#cantidad")){
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
            generarCamposOcultos();
            e.target.submit();
        }
       
        else {
            document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
            }
            
       
    });

    addButton.addEventListener('click', function(e) {
        agregarInsumo();
        e.preventDefault();
        
       
    });
    $modificar.addEventListener('click', function(e) {
        
        e.preventDefault();
        
       
    });
/*  
 
    // Eliminar formulario
    formsetContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('delete-form')) {
            e.preventDefault();
            const form = e.target.closest('.seccion-form');
            form.remove();
            updateFormIndexes();
        }
    });
    */
 

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





function agregarFormularioATabla(form, index) {
    const $tbody = document.querySelector("table tbody");
    const insumos=querySelectorAll('#insumo')
    const insumo = form.querySelector('select[name$="-insumo"]').options[form.querySelector('select[name$="-insumo"]').selectedIndex].text;
    const cantidad = form.querySelector('input[name$="-cantidad"]').value;
    console.log(form)
    console.log(insumo,cantidad)
    const row = document.createElement('tr');
    row.setAttribute("data-form-index", index);

    
    row.innerHTML = `
        <td>${index + 1}</td>
        <td>${insumo}</td>
        <td>${cantidad}</td>
        <td>
            <div class="action-buttons">
                    <button class="action-button edit-button onclick="editarFormulario(${index})"><i class="fa-solid fa-pen-to-square fa-sm" style="color: #ffffff;"></i></button>
                    <button class="action-button delete-button" onclick="eliminarFormulario(${index})"><i class="fa-solid fa-trash fa-sm" style="color: #ffffff;"></i></button>
            </div>
        </td>
    `;
    $tbody.appendChild(row);
}


function editarFormulario(index) {
    const form = document.querySelector(`#formset-container .seccion-form:nth-child(${index + 1})`);
    form.style.display = "block"; // Muestra el formulario correspondiente en el formset.
}


function eliminarFormulario(index) {
    const form = document.querySelector(`#formset-container .seccion-form:nth-child(${index + 1})`);
    const deleteCheckbox = form.querySelector('input[type="checkbox"][name$="-DELETE"]');
    
    if (deleteCheckbox) {
        deleteCheckbox.checked = true; // Marcar para eliminar el formulario en el formset.
    }
    
    const row = document.querySelector(`table tbody tr[data-form-index="${index}"]`);
    if (row) {
        row.remove(); // Eliminar la fila de la tabla.
    }
}


function agregarInsumo(){
    const tableBody = document.querySelector("#tabla tbody");
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
            <button type="button" class="action-button delete-button" onclick="eliminarFila(this)"><i class="fa-solid fa-trash fa-sm" style="color: #ffffff;"></i></button>
        </td>
    `;
    
    // Agregar la fila a la tabla
    tableBody.appendChild(row);

    // Limpiar los campos después de agregar la fila
    insumoSelect.value = "";
    document.getElementById("cantidad_tabla").value = "";

}  

function eliminarFila(button) {
    const row = button.closest("tr");
    row.remove();
}

function habilitarEdicion(button) {
    const row = button.closest("tr");
    const insumoCell = row.querySelector(".insumo-item");
    const cantidadCell = row.querySelector(".cantidad-item");

    // Obtener los valores actuales
    const insumoActual = insumoCell.textContent.trim();
    const cantidadActual = cantidadCell.textContent.trim();

    // Obtener el select del HTML y copiar sus opciones
    const insumoSelect = document.getElementById("insumo_tabla").cloneNode(true);
    insumoSelect.classList.add("tabla__input"); // Añadir clase específica para el estilo en la tabla
    insumoSelect.id = "insumo_editar"; // Asignar un nuevo ID para evitar duplicados

    // Establecer el valor actual en el select copiado
    for (let option of insumoSelect.options) {
        option.selected = (option.textContent.trim() === insumoActual);
    }

    // Reemplazar la celda de insumo con el select
    insumoCell.innerHTML = "";
    insumoCell.appendChild(insumoSelect);

    // Reemplazar la celda de cantidad con un input
    cantidadCell.innerHTML = `
        <input type="number" class="tabla__input" id="cantidad_editar" value="${cantidadActual}">
    `;

    // Cambiar el botón "Modificar" a "Guardar"
    button.textContent = "Guardar";
    button.onclick = function() {
        guardarEdicion(button);
    };
}

function guardarEdicion(button) {
    const row = button.closest("tr");
    const insumoCell = row.querySelector(".insumo-item");
    const cantidadCell = row.querySelector(".cantidad-item");

    // Obtener los valores del select y el input de edición
    const insumoEditado = row.querySelector("#insumo_editar").options[row.querySelector("#insumo_editar").selectedIndex].text;
    const cantidadEditada = row.querySelector("#cantidad_editar").value;

    // Guardar los valores en las celdas como texto
    insumoCell.textContent = insumoEditado;
    cantidadCell.textContent = cantidadEditada;

    // Cambiar el botón "Guardar" de nuevo a "Modificar"
    button.textContent = "Modificar";
    button.onclick = function() {
        habilitarEdicion(button);
    };
}

function generarCamposOcultos() {
    const formsetContainer = document.getElementById('formset-container');
    const totalForms = document.getElementById('id_insumos-TOTAL_FORMS');
    const filas = document.querySelectorAll("#tabla tbody tr");

    // Vaciar los formularios actuales (excepto el primero, que es la plantilla)
    while (formsetContainer.children.length > 1) {
        formsetContainer.removeChild(formsetContainer.lastChild);
    }

    // Actualizar el total de formularios en el formset
    totalForms.value = filas.length;

    // Usar el primer formulario del formset para el primer elemento de la tabla
    if (filas.length > 0) {
        const firstTemplate = formsetContainer.children[0];
        
        // Obtener valores de insumo y cantidad desde la primera fila
        const firstInsumo = filas[0].querySelector(".insumo-item").textContent.trim();
        const firstCantidad = filas[0].querySelector(".cantidad-item").textContent.trim();

        // Asignar los valores al primer formulario
        firstTemplate.querySelector('input[type="number"]').value = firstCantidad;
        const firstSelect = firstTemplate.querySelector('select');
        for (let option of firstSelect.options) {
            option.selected = (option.textContent.trim() === firstInsumo);
        }

        // Actualizar índices del primer formulario
        updateElementIndex(firstTemplate.querySelector('input[type="number"]'), 'insumos', 0);
        updateElementIndex(firstTemplate.querySelector('select'), 'insumos', 0);
    }

    // Clonar el formulario base para el resto de las filas en la tabla
    for (let index = 1; index < filas.length; index++) {
        const fila = filas[index];

        // Clonar el primer formulario (la plantilla) y limpiar sus valores
        const template = formsetContainer.children[0].cloneNode(true);
        template.querySelector('input[type="number"]').value = "";
        template.querySelector('select').selectedIndex = -1;

        formsetContainer.appendChild(template);

        // Obtener valores de insumo y cantidad de la fila actual
        const insumo = fila.querySelector(".insumo-item").textContent.trim();
        const cantidad = fila.querySelector(".cantidad-item").textContent.trim();

        // Asignar los valores al formulario clonado
        template.querySelector('input[type="number"]').value = cantidad;
        const select = template.querySelector('select');
        for (let option of select.options) {
            option.selected = (option.textContent.trim() === insumo);
        }

        // Actualizar los índices de los elementos en el formulario clonado
        const formInputs = template.getElementsByTagName('input');
        const formSelects = template.getElementsByTagName('select');
        for (let input of formInputs) {
            updateElementIndex(input, 'insumos', index);
        }
        for (let select of formSelects) {
            updateElementIndex(select, 'insumos', index);
        }
    }
}



/*
filas.forEach((fila, index) => {
    const insumo = fila.querySelector(".insumo-item").textContent;
    const cantidad = fila.querySelector(".cantidad-item").textContent;

    // Crear inputs ocultos para cada campo de cada fila
    const insumoInput = document.createElement("select");
  
    insumoInput.name = `insumos-${index}-insumo`;
    insumoInput.value = insumo;
    insumoInput.setAttribute('id','insumo')
    const option = document.createElement("option");
    option.value = insumo;
    option.text = insumo;
    insumoInput.appendChild(option);
    console.log('insumo Select ',insumoInput,'valor:',insumoInput.value)
    const cantidadInput = document.createElement("input");
    cantidadInput.type = "number";
    cantidadInput.name = `cantidades-${index}-cantidad`;
    cantidadInput.value = cantidad;
    cantidadInput.setAttribute('id','cantidad')
    console.log('cantidad input',cantidadInput,'valor:',cantidadInput.value)
    hiddenContainer.appendChild(insumoInput);
    hiddenContainer.appendChild(cantidadInput);
});
*/

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
