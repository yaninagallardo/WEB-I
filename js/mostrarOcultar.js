




//Funcion que despliega elemento pasado por parametro 
function visibilizarElemento(elemento) {
    elemento.style.visibility="visible";
    elemento.style.display="block";
}

//Funcion que oculta elemento pasado por parametro 
function ocultarElemento(elemento){
    elemento.style.visibility="hidden";
    elemento.style.display="none";
}


function mostrarComentario(elemento, nombre){
    "use strict";
    let nuevo = nombre;

    //debug
    console.log(nuevo);

    nuevo.innerHTML ="Nombre: " + nuevo;
    ocultarElemento(elemento);
    
}

let form = document.querySelector("#formulario");
let btn = document.querySelector("#btnSalir");
btn.addEventListener("click", ocultarElemento(form));

console.log(form);
console.log(btn);