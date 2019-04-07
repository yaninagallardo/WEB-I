
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

function mostrarComentario(elemento, nombre, temporada, capitulo, comentario){
    ocultarElemento(elemento);
    let nuevo = document.getElementById("#nuevoComentario");
    nuevo.innerText("Nombre: " + nombre);
}

