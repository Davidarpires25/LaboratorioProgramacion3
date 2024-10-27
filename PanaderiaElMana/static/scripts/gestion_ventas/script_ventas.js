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
    console.log($formulario.cuitMayorista)
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

function validacionNroComprobante(nroComprobante){
    const $span = $formulario.nroComprobante.nextElementSibling;
    let soloNumeros = /^\d+$/;
    if(!soloNumeros.test(nroComprobante.value)){
        $span.classList.remove("desactivado");
        $span.innerText = "Formato invalido!"
        return false;
    }
    $span.classList.add("desactivado");
    $span.innerText = "";
    return true;
}

function validarTeclas(key){
    return !((key >= 48 && key <= 59) || key === 8 || key === 13 || (key >= 96 && key <= 105));
}

d.addEventListener("change", function(e){
    if(e.target === $formulario.nroComprobante){
        valido = validacionNroComprobante($formulario.nroComprobante);
    }
    if(e.target === $formulario.tipo_venta){
        ajusteMayorista();
    }
    if(e.target === $inputMayorista){
        getCuitMayorista();
    }
});

d.addEventListener("submit", function(e){
    e.preventDefault();
    console.warn(valido)
    if(valido){
        alert("VENTA REALIZADA CON EXITO")
        $formulario.submit();
    }

});


d.addEventListener("DOMContentLoaded", function(e){
    controlFecha();
    configuracionInicialMayorista();
})


