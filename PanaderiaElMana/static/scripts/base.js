const hamBurger = document.querySelector(".toggle-btn");
const $sidebar = document.getElementById("sidebar");

function ocultarPalomita(instruccion){
  const $sidebarLinks = document.querySelectorAll("a.sidebar-link.collapsed.has-dropdown");
  if(instruccion){
    for(let sbLink of $sidebarLinks){
      sbLink.classList.add("oculto");
    }
  }
  else{
    for(let sbLink of $sidebarLinks){
      sbLink.classList.remove("oculto");
    }
  } 
}

hamBurger.addEventListener("click", function () {
  $sidebar.classList.toggle("expand");
  const $sidebarLinks = document.querySelectorAll("a.sidebar-link.collapsed.has-dropdown")
  for(let sbLink of $sidebarLinks){
    if(sbLink.nextElementSibling.classList.contains("show")){
      sbLink.nextElementSibling.classList.remove("show");
      sbLink.dataset.collapsed = true;
      sbLink.nextElementSibling.style.height = "0px"
    }
  }
  if($sidebar.classList.contains("expand")){
    ocultarPalomita(false);
  }
  else{
    ocultarPalomita(true);
  }
});

document.addEventListener("click", function (e) {
  if (e.target.matches(".sidebar-link")){
    const parteAbajo = e.target.nextElementSibling;
    if (parteAbajo) {
      const colapsado = parteAbajo.classList.toggle("show");
      e.target.dataset.collapsed = !colapsado;

      if (colapsado) {
        parteAbajo.style.height = parteAbajo.scrollHeight + "px";
      } else {
        parteAbajo.style.height = "0"; 
      }
    }
  }
 
  if(e.target === document.getElementById("logoMana")){
    window.location.href = "/";
  }
});

document.addEventListener("mouseover", function(e){
  
  if(e.target.matches("a.sidebar-link.collapsed.has-dropdown") && !($sidebar.classList.contains("expand"))){
    const parteAbajo = e.target.nextElementSibling;
    parteAbajo.classList.add("show")
    e.target.dataset.collapsed = false;
    parteAbajo.style.height = parteAbajo.scrollHeight + "px"
  }
});


document.addEventListener("DOMContentLoaded", function(){
  ocultarPalomita(true);
})

