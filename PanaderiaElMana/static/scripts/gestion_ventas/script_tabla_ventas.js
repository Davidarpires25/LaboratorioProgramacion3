const d = document;


d.addEventListener("click", function(e){
    if(e.target.matches(".edit-button") || e.target.matches(".edit-button i")){
        let idVenta = e.target.dataset.id;
        window.location.href = idVenta
    }
})

function confirmCancel(enlace) {
    Swal.fire({
        title: '¿Anular la venta?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, anular venta',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            let formulario = document.getElementById('formulario_anular')
            formulario.action = enlace
            formulario.submit()
        }
    });
}