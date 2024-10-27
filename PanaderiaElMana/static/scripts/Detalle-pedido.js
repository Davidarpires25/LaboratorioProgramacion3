

document.addEventListener("DOMContentLoaded", (e)=>{
 
    cargarTablaDesdeFormset();
    



 

});


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
                <button type="button" class="action-button delete-button" onclick="eliminarFila(this)">
                    <i class="fa-solid fa-trash fa-sm" style="color: #ffffff;"></i>
                </button>
            </td>
        `;

        // Agregar la fila a la tabla
        tablaBody.appendChild(fila);
    });
}