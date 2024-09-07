const d = document;
const $formulario = d.getElementById("ventaForm");
let valido = false;

function inputMayorista(){
    const $divMayorista = d.querySelector("div .mayorista");
    $divMayorista.innerHTML = $formulario.catgVenta.value === "mayorista" ? `<label for="numeroComprobante" class="form-label">Nombre del mayorista</label>
    <div class="input-group">
        <span class="input-group-text">M</span>
        <select class="form-select" id="nombreMayorista" name="mayorista" required>
        <option value="" hidden>Seleccione...</option>
        </select>

        <span id="spanError" class="desactivado"></span>
    </div>` : "";
}


function controlFecha(){
    const $fechaSolicitud= document.getElementById("fechaVenta");
    const fechaActual = new Date().toISOString().split('T')[0];
    let fechaLimite = new Date();
    $fechaSolicitud.value = fechaActual;
    fechaLimite.setMonth(fechaLimite.getMonth() - 1)
    fechaLimite = fechaLimite.toISOString().split('T')[0];

    $fechaSolicitud.setAttribute("min",fechaLimite);
    $fechaSolicitud.setAttribute("max",fechaActual);

};

function validacionNroComprobante(nroComprobante){
    const $span = d.getElementById("spanError");
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
    if(e.target === $formulario.catgVenta){
        inputMayorista();
    }
});

d.addEventListener("submit", function(e){
    e.preventDefault();
    if(valido){
        console.log("bien")
    }
});

$formulario.nroComprobante.addEventListener("keydown", function(keyEvent){
    if(validarTeclas(keyEvent.keyCode)) keyEvent.preventDefault();
})

d.addEventListener("DOMContentLoaded", function(e){
    controlFecha();
})