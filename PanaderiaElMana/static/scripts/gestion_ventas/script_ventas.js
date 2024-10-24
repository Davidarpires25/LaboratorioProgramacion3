const d = document;
const $main= document.querySelector('#main')
const $formulario = d.getElementById("formulario");
let valido = false;
function inputMayorista(){
    const $divMayorista = d.querySelector("div .mayorista");
    $divMayorista.innerHTML = $formulario.catgVenta.value === "mayorista" ?
    `<label for="numeroComprobante" class="formulario__label" style="color:white;">Nombre del mayorista</label>
    <div class="formulario__grupo-input">
        <select class="formulario__input" id="nombreMayorista" name="mayorista" required>
        <option value="" hidden>Seleccione...</option>
        </select>

        <span id="spanError" class="desactivado"></span>
    </div>` : "";
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


d.addEventListener("DOMContentLoaded", function(e){
    controlFecha();
})


$main.addEventListener("click", (e) => {
    const $tabla= document.querySelector('#tabla')
    const $tablaTitulo= document.querySelector('.table-title')
    if(e.target.matches("#listarProductos")){
        console.log("Entro")
        $formulario.setAttribute('hidden','');
        $tabla.removeAttribute('hidden');
        $tablaTitulo.removeAttribute("hidden");
        
    }
    if(e.target.matches("#btn-tabla")){
        const $tabla= document.querySelector('#tabla')
        const $tablaTitulo= document.querySelector('.table-title')
        console.log("Entro")
        $formulario.removeAttribute('hidden');
        $tabla.setAttribute('hidden','');
        $tablaTitulo.setAttribute("hidden",'');        
    }
});