document.addEventListener("DOMContentLoaded", function () {
    "use strict"
    agregar();

    // BOTONES: 
    //BOTON AGREGAR 3 capitulos
    document.querySelector("#btn-agregar3").addEventListener("click", agregar3filas);

    //BOTON ELIMINAR FILAS DE LA LISTA
    document.querySelector("#btn-eliminar").addEventListener("click", vaciarFilas);

    //inserta nueva serie a la tabla desde el formulario cargado (BOTON ENVIAR)
    document.querySelector(".enviarCap").addEventListener("click", agregarFilaDeForm);

});

let indice = 0;  //indice correspondiente a la posición en el arreglo serie, para mostrar la fila nueva.

/**
 * Json objeto de filas en la tabla
 */
let filaNueva = {
    "serie": [{
        "numCapitulo": 1,
        "numTemporada": 2,
        "titulo": "Piloto",
        "fechaEmision": "2012/11/02",
        "sinopsis": "Oliver acude a Laurel cuando descubre que lleva un proceso contra Martin Somers"
    }]
};

/**
 * Función que reponde al metodo agregar 3 filas a la tabla
 */
function agregar3filas() {
    event.preventDefault();
    for (let i = 1; i <= 3; i++) {
        let nuevo = {
            "numCapitulo": i,
            "numTemporada": 3,
            "titulo": "Piloto",
            "fechaEmision": "2014/2/10",
            "sinopsis": "sinop.value",
        }
        filaNueva.serie.push(nuevo);
        agregar();
    }
}

//inputs de HTML correpondientes al formulario
let capitulo = document.querySelector(".num-cap");
let temporada = document.querySelector(".num-tem");
let tit = document.querySelector(".titulo");
let emision = document.querySelector(".fecha-emision");
let sinop = document.querySelector(".sinopsis");

/**
 * recupera datos de los input del formulario
 * y lo carga en una nueva fila en la tabla
 * @param event 
 */
function agregarFilaDeForm(event) {
    event.preventDefault();
    let nuevo = {
        "numCapitulo": capitulo.value,
        "numTemporada": temporada.value,
        "titulo": tit.value,
        "fechaEmision": emision.value,
        "sinopsis": sinop.value,
    }
    filaNueva.serie.push(nuevo);
    agregar();
}

/**
 * funcion agregar inserta una fila ya cargada en el arrgelo serie correspondiente
 * a Json (filaNueva)
 */
function agregar() {

    //inserta una nueva fila sin indice indicado entre ()
    let fila = cuerpoTabla.insertRow();

    //inserta 3 celdas nuevas correspondientes a la cantidad de columnas en la tabla
    let celda1 = fila.insertCell();
    let celda2 = fila.insertCell();
    let celda3 = fila.insertCell();
    let celda4 = fila.insertCell();
    let celda5 = fila.insertCell();

    //pasaje de contenido en json a texto
    let texto1 = document.createTextNode(filaNueva.serie[indice].numCapitulo);
    let texto2 = document.createTextNode(filaNueva.serie[indice].numTemporada);
    let texto3 = document.createTextNode(filaNueva.serie[indice].titulo);
    let texto4 = document.createTextNode(filaNueva.serie[indice].fechaEmision);
    let texto5 = document.createTextNode(filaNueva.serie[indice].sinopsis);

    //agrega texto a la celda correspondiente
    celda1.appendChild(texto1);
    celda2.appendChild(texto2);
    celda3.appendChild(texto3);
    celda4.appendChild(texto4);
    celda5.appendChild(texto5);

    indice++;
    console.log("agregar " + indice);
}

/**
 * Esta función vacia tanto el arreglo con la información existente
 * como las filas en la tabla. Dejando a la vista solo el thead
 */

function vaciarFilas() {
    filaNueva.serie = [];
    cuerpoTabla.innerHTML = "";
    indice=0;

    console.log("arreglo borrado" + filaNueva.serie);
    console.log("indice despues de borrado:" + filaNueva.serie.length) ;
}

// trae del DOM cuerpo de la tabla
let cuerpoTabla = document.querySelector("#cuerpoTabla");