"use strict";

/**
 * Funcion que despliega el formulario en pantalla. 
 * Llama a la clase .mostrar en css: estilos.css
 */
function visibilizarElemento() {
    cargarFormulario();
    form.classList.add("mostrar");
    form.classList.remove("ocultar");
}

/**
 * Funcion que oculta el formulario en pantalla.
 * Llama a la clase .ocultar en css: estilos.css
 */
function ocultarElemento() {
    form.classList.add("ocultar");
    form.classList.remove("mostrar");
}

/**
 * La siguiente función carga los campos del formulario, correspondiente al ingreso de un nuevo comentario,
 * Cada campo llama a su función correspondida la cual devuelve un dato al azar.
 * (El email esta compuesto por nombre y apellido ambos aleatorios)
 */
function cargarFormulario() {
    let nombreAzar = nombreAleatorio();
    let apellidoAzar = apellidoAleatorio();

    nom.value = nombreAzar;
    email.value = nombreAzar + apellidoAzar + '@hotmail.com';
    temporada.value = temporadaAleatorio();
    capitulo.value = capituloAleatorio();
    comentario.value = comentarioAleatorio();
    numCaptcha.innerHTML = captchaAleatorio();
    //console.log("aca " + numCaptcha.innerHTML);
}

/**
 * Las siguientes 5 funciones elementoAleatorio retornan a partir de una lista con los datos, 
 * correspondientes al tipo de elemento, utilizado para mostrar en pantalla.
 * 
 * return string o number
 */
function nombreAleatorio() {
    let nombres = new Array("Maria", "Laura", "Carlos", "Lucas");

    let indexRandom = Math.floor(Math.random() * (nombres.length));

    return nombres[indexRandom];
}

function apellidoAleatorio() {
    let nombres = new Array("Suarez", "Perez", "Label", "Gonzalez");

    let indexRandom = Math.floor(Math.random() * (nombres.length));

    return nombres[indexRandom];
}

function temporadaAleatorio() {
    let numRandom = Math.floor(Math.random() * (4) + 1);

    return numRandom;
}
function capituloAleatorio() {
    let numRandom = Math.floor(Math.random() * (15) + 1);

    return numRandom;
}
function comentarioAleatorio() {
    let comentarios = new Array("Me encanta esta serie, muy entretenida", "¿cuándo sale el próximo capítulo?",
        "¡¡El mejor capítulo!!", "Ahhhhh que buen capítulo", "¡¡No puedo esperar al próximo capítulo!!");

    let indexRandom = Math.floor(Math.random() * (comentarios.length));

    return comentarios[indexRandom];
}

/**
 * Función que genera número al azar de 4 digítos.
 * 
 * return numRandom
 */
function captchaAleatorio() {
    let numRandom = Math.floor(Math.random() * (10000));

    return numRandom;
}
// ----FIN ALEATORIOS----//

/**
 * Comprueba si la número ingresado por el usuario coincide con el captcha que se 
 * muestra en pantalla. En caso de ser valido devuelve true
 * 
 * return boolean
 */
function isValido() {
    console.log("validar form ingresado: " + captcha.value + " num captcha: " + numCaptcha.innerHTML);

    if (captcha.value == numCaptcha.innerHTML) {
        return true;
    }
    return false;
}

/**
 * Está función verifica si el captcha ingresado es valido o invalido. Para luego habilitar y deshabilitar
 * el botón submit
 */
function submitIn(event){
    if (isValido()){
        alert("¡Gracias por tu comentario!");
    }else{
        event.preventDefault();
        alert("Captcha incorrecto");
    }
}



//----- ATRIBUTOS -----//

// Botones: 
document.querySelector("#btnComentar").addEventListener("click", visibilizarElemento);
document.querySelector("#btnSalir").addEventListener("click", ocultarElemento);
document.querySelector("#enviar").addEventListener("click", submitIn);

//Formulario ingresar comentario
let form = document.querySelector(".formulario");

//Captcha ingresado
let captcha = document.querySelector("#introducirCaptcha");

//CAMPOS DEL FORMULARIO INGRESAR COMENTARIO Y CAPTCHA
let nom = document.querySelector("#nombre");
let email = document.querySelector("#email");
let temporada = document.querySelector("#temporada");
let capitulo = document.querySelector("#capitulo");
let comentario = document.querySelector("#comentario");
let numCaptcha = document.querySelector("#numCaptcha");

//Carga de comentario de muestra
document.querySelector("#nameRandom").innerHTML = nombreAleatorio();
document.querySelector("#tempRandom").innerHTML = temporadaAleatorio();
document.querySelector("#capRandom").innerHTML = capituloAleatorio();
document.querySelector("#comentRandom").innerHTML = comentarioAleatorio();