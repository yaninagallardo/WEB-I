"use strict";

//Funcion que despliega elemento pasado por parametro 
function visibilizarElemento() {
    cargarFormulario();
    form.classList.add("mostrar");
    form.classList.remove("ocultar");
}

//Funcion que oculta elemento pasado por parametro 
function ocultarElemento() {
    form.classList.add("ocultar");
    form.classList.remove("mostrar");
}

function cargarFormulario() {
    let nombre = nombreAleatorio();
    let apellido = apellidoAleatorio();
    document.querySelector("#nombre").value= nombre;
    document.querySelector("#email").value= nombre + apellido + '@hotmail.com';
    document.querySelector("#temporada").value= temporadaAleatorio();
    document.querySelector("#capitulo").value= capituloAleatorio();
    document.querySelector("#comentario").value= comentarioAleatorio();
}

//Rellenar comentario de muestra
function nombreAleatorio() {
    let nombres = new Array("Maria", "Laura", "Carlos", "Lucas");

    let indexRandom= Math.floor(Math.random() * (nombres.length));

    return nombres[indexRandom];
}

function apellidoAleatorio() {
    let nombres = new Array("Suarez", "Perez", "Label", "Gonzalez");

    let indexRandom= Math.floor(Math.random() * (nombres.length));

    return nombres[indexRandom];
}


function temporadaAleatorio() {
    let numRandom= Math.floor(Math.random() * (4) + 1);

    return numRandom;
}
function capituloAleatorio() {
    let numRandom= Math.floor(Math.random() * (15) + 1);

    return numRandom;
}
function comentarioAleatorio() {
    let comentarios = new Array("Me encanta esta serie, muy entretenida", "¿cuándo sale el nuevo capítulo?",
    "¡¡El mejor capítulo!!", "Ahhhhh que buen capítulo", "¡¡No puedo esperar al próximo capítulo!!");

    let indexRandom= Math.floor(Math.random() * (comentarios.length));

    return comentarios[indexRandom];
}

// Botones: 
document.querySelector("#btnComentar").addEventListener("click", visibilizarElemento);
document.querySelector("#btnSalir").addEventListener("click", ocultarElemento);

//Formulario
let form = document.querySelector(".formulario");
console.log(form);

//Carga de comentario de muestra
document.querySelector("#nameRandom").innerHTML =  nombreAleatorio();
document.querySelector("#tempRandom").innerHTML =  temporadaAleatorio();
document.querySelector("#capRandom").innerHTML =  capituloAleatorio();
document.querySelector("#comentRandom").innerHTML =  comentarioAleatorio();