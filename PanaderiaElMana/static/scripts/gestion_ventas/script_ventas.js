const d = document;
const $main= document.querySelector('#main')
const $formulario = d.getElementById("formulario");
const $divMayorista = d.getElementById("divMayorista")
const $inputMayorista = $divMayorista.childNodes[3].childNodes[1];
let valido = false;

function configuracionInicialMayorista(){
    $inputMayorista.required = false;
    $divMayorista.classList.add("desactivado")
}
function ajusteMayorista(){
    if($formulario.tipo_venta.value === "MAYORISTA"){
        $divMayorista.classList.remove("desactivado");
    }
    else{
        $divMayorista.classList.add("desactivado")
    }
}

function getCuitMayorista(){
    let cuitMayoristaSeleccionado = $inputMayorista.value;
    $formulario.cuitMayorista.value = cuitMayoristaSeleccionado;
}


function controlFecha(){
    const $fechaVenta= document.getElementById("fechaVenta");
    const fechaActual = new Date().toISOString().split('T')[0];
    let fechaLimite = new Date();
    $fechaVenta.value = fechaActual;
    fechaLimite.setMonth(fechaLimite.getMonth() - 1)
    fechaLimite = fechaLimite.toISOString().split('T')[0];

    $fechaVenta.setAttribute("min",fechaLimite);
    $fechaVenta.setAttribute("max",fechaActual);

};



function validarTeclas(key){
    return !((key >= 48 && key <= 59) || key === 8 || key === 13 || (key >= 96 && key <= 105));
}

d.addEventListener("change", function(e){
    if(e.target === $formulario.tipo_venta){
        ajusteMayorista();
    }
    if(e.target === $inputMayorista){
        getCuitMayorista();
    }
});

d.addEventListener("submit", function(e){
    e.preventDefault();
    alert("VENTA REALIZADA CON EXITO")
    $formulario.submit();
});


d.addEventListener("DOMContentLoaded", function(e){
    controlFecha();
    configuracionInicialMayorista();
})


