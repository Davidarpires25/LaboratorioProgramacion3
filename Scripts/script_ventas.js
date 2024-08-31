const d = document;
const $formulario = d.getElementById("ventaForm");
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
    return !(key >= 48 && key <= 59 || key === 8 || key === 13);
}

d.addEventListener("submit", function(e){
    e.preventDefault();
    validacionNroComprobante($formulario.nroComprobante);
});

$formulario.nroComprobante.addEventListener("keydown", function(keyEvent){
    if(validarTeclas(keyEvent.keyCode)) keyEvent.preventDefault();
})