

const expresionesPedidos = {
	observaciones: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	cantidad: /^.{1,90}$/, // 1 a 90 digitos.
}
const camposPedidos = {
	observaciones: false,
	cantidad: false,
	
}


document.addEventListener("DOMContentLoaded", (e)=>{
    const $formulario= document.querySelector('#formulario')
   
    controlFecha();
    $formulario.addEventListener("keyup", (e) => { 
            if(e.target.matches("#observaciones")){
                
                validarCampo(expresionesPedidos.observaciones, e.target, 'observaciones');
            }   
            else if(e.target.matches("#cantidad")){
                validarCampo(expresionesPedidos.cantidad, e.target, 'cantidad');
            }
        });

   
        
    $formulario.addEventListener("submit",(e)=>{
        e.preventDefault();
        const terminos = document.getElementById('terminos');
      
        console.log(camposPedidos.observaciones,camposPedidos.cantidad)
	    if(camposPedidos.observaciones && camposPedidos.cantidad ){
            document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
            $formulario.reset();
            document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
            setTimeout(() => {
                document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
            }, 5000);

            document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
                icono.classList.remove('formulario__grupo-correcto');
            });
        }
        else {
            document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
            }
            
       
    });

    
    
 

});




function controlFecha(){
    const $fechaSolicitud= document.querySelector("#fechaSolicitud");
    const fechaActual = new Date().toISOString().split('T')[0];
    let fechaMaxima = new Date();
    fechaMaxima.setMonth(fechaMaxima.getMonth() + 1)
   
    fechaMaxima=fechaMaxima.toISOString().split('T')[0];

    $fechaSolicitud.setAttribute("min",fechaActual);
    $fechaSolicitud.setAttribute("max",fechaMaxima);


};







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