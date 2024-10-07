




document.addEventListener("DOMContentLoaded", ()=>{
    const $formulario= document.querySelector('#pedidosForm')
    controlFecha();

    $formulario.addEventListener("input",(e)=>{
        if(e.target.matches("#cantidad")){
            controlCantidad(e);

        }   
        else if(e.target.matches("#numeroPedido")){
            controlPedido(e);
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



function controlCantidad(e){
    console.log(e.target.value);
    if(parseInt(e.target.value)<=0){               
        e.target.setCustomValidity("La cantidad debe ser mayor que 0.");          
    }
    else{
        e.target.setCustomValidity('');
    }
}


function controlPedido(e){
    if(parseInt(e.target.value)<=0){
        e.target.setCustomValidity("Ingrese un nro de pedido valido");          

    }
    else{
        e.target.setCustomValidity('');
    }
}