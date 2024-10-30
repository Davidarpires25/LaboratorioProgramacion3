const d = document;


d.addEventListener("click", function(e){
    if(e.target.matches(".edit-button") || e.target.matches(".edit-button i")){
        let idVenta = e.target.dataset.id;
        window.location.href = idVenta
    }
})