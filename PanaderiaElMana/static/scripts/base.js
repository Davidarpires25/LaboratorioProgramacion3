const hamBurger = document.querySelector(".toggle-btn");
const $sidebar = document.getElementById("sidebar");

hamBurger.addEventListener("click", function () {
  document.querySelector("#sidebar").classList.toggle("expand");
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
  if(e.target === document.getElementById("btnExpand") || e.target === document.getElementById("iconoExpand")){
    const $sidebarLinks = document.querySelectorAll("a.sidebar-link.collapsed.has-dropdown")
    for(let sbLink of $sidebarLinks){
      if(sbLink.nextElementSibling.classList.contains("show")){
        sbLink.nextElementSibling.classList.remove("show");
        sbLink.dataset.collapsed = true;
        sbLink.nextElementSibling.style.height = "0px"
      }
    }
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




// document.addEventListener("click", function(e) {
//   if (e.target.matches(".sidebar-link")) {
//       const submenu = e.target.nextElementSibling;
//       e.target.classList.toggle("collapsed");

//       if (submenu.classList.contains("show")) {
//           // Animación al colapsar
//           submenu.style.height = submenu.scrollHeight + 'px';
//           setTimeout(() => {
//               submenu.style.height = '0';
//           }, 1);
//           submenu.classList.remove("show");
//           e.target.dataset.collapsed = true;
//       } else {
//           // Animación al expandir
//           submenu.classList.add("expanding");
//           submenu.style.height = submenu.scrollHeight + 'px';
//           submenu.classList.add("show");
//           e.target.dataset.collapsed = false;

//           // Quitar la clase "expanding" después de la transición
//           submenu.addEventListener('transitionend', () => {
//               submenu.classList.remove("expanding");
//               submenu.style.height = 'auto';
//           }, { once: true });
//       }
//   }
// });
