const d = document;


d.addEventListener("click", function(e){
    if(e.target.matches(".edit-button") || e.target.matches(".edit-button i")){
        let idVenta = e.target.dataset.id;
        window.location.href = idVenta
    }
    if(e.target === d.getElementById("btnGenerarInforme")){
        const $elementosOcultar = d.querySelectorAll(".no-informe");
        for(let elemento of $elementosOcultar){
            elemento.classList.add("ocultar");
        }
        e.target.classList.add("ocultar");
        setTimeout(function(){
            for(let elemento of $elementosOcultar){
                elemento.classList.remove("ocultar");
            }
            e.target.classList.remove("ocultar");
        }, 1000);
        
        window.print()
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

