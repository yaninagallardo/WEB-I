"use strict"

//DOM
document.addEventListener("DOMContentLoaded", agregar);

// BOTONES: 
//BOTON AGREGAR 3 FILAS CARGADAS
document.querySelector("#btn-agregar3").addEventListener("click", agregar3filas);

//BOTON ELIMINAR FILAS DE LA LISTA Y DE JSON
document.querySelector("#btn-eliminar").addEventListener("click", vaciarFilas);

//inserta nueva serie a la tabla desde el formulario cargado (BOTON ENVIAR)
document.querySelector(".enviarCap").addEventListener("click", agregarFilaDeForm);

// trae del DOM cuerpo de la tabla
let cuerpoTabla = document.querySelector("#cuerpoTabla");

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
    for (let i = 1; i <= 3; i++) {
        let nuevo = {
            "numCapitulo": Math.floor(Math.random() * (20) + 1),
            "numTemporada": Math.floor(Math.random() * (10) + 1),
            "titulo": "Piloto",
            "fechaEmision": "2014/2/10",
            "sinopsis": "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        }
        filaNueva.serie.push(nuevo);
        agregar();
    }
}

//inputs de HTML correpondientes al formulario
let capitulo = document.querySelector(".num-cap");
let temporada = document.querySelector(".num-tem");
let tit = document.querySelector(".tituloSerie");
let emision = document.querySelector(".fecha-emision");
let sinop = document.querySelector(".sinopsisCap");

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
 * función que inserta una fila ya cargada en el arrgelo serie 
 * correspondiente a Json (filaNueva)
 */
function agregar() {

    //inserta una nueva fila en tbody
    let fila = cuerpoTabla.insertRow();

    //inserta 5 celdas nuevas correspondientes a la cantidad de columnas en la tabla
    let celda1 = fila.insertCell();
    let celda2 = fila.insertCell();
    let celda3 = fila.insertCell();
    let celda4 = fila.insertCell();
    let celda5 = fila.insertCell();

    //pasaje de contenido en json a texto (http)
    let texto1 = document.createTextNode(filaNueva.serie[indice].numCapitulo);
    let texto2 = document.createTextNode(filaNueva.serie[indice].numTemporada);
    let texto3 = document.createTextNode(filaNueva.serie[indice].titulo);
    let texto4 = document.createTextNode(filaNueva.serie[indice].fechaEmision);
    let texto5 = document.createTextNode(filaNueva.serie[indice].sinopsis);

    //agrega texto a la celda hija correspondiente
    celda1.appendChild(texto1);
    celda2.appendChild(texto2);
    celda3.appendChild(texto3);
    celda4.appendChild(texto4);
    celda5.appendChild(texto5);

    destacado(fila);
    indice++;
}

/**
 * guarda el numero del ultima temporada y capitulo para destacar (fila) en la tabla 
 * En el array ultimaFila guarda las filas que usaron la clase destacado 
 * para ser removidas en caso de ya no umplir con la condición
 * 
 * @param fila 
 */
let tempMax = 0;
let capMax = 0;
let filaDesatacada = 0;
function destacado(fila) {

    if (filaNueva.serie[indice].numTemporada > tempMax) {
        tempMax = filaNueva.serie[indice].numTemporada;
        capMax = filaNueva.serie[indice].numCapitulo;

        destacarFila(fila);

    } else if (filaNueva.serie[indice].numTemporada == tempMax) {
        if (filaNueva.serie[indice].numCapitulo > capMax) {
            capMax = filaNueva.serie[indice].numCapitulo;

            destacarFila(fila);
        }
    }
}

/**
 * destaca la nueva fila que posee la información sobre la ultima temporada y ultimo capitulo
 * en caso de existir (dentro de destacarFila) una ya destacada anteriormente 
 * quita estilo de la clase en css.
 * 
 * @param fila 
 */
function destacarFila(fila) {
    if (filaDesatacada != 0) {
        filaDesatacada.classList.remove("destacado");
    }
    fila.classList.add("destacado");
    filaDesatacada = fila;
}

/**
 * Esta función vacia tanto el arreglo con la información existente
 * como las filas en la tabla. Dejando a la vista solo el thead
 */
function vaciarFilas() {
    filaNueva.serie = [];
    cuerpoTabla.innerHTML = "";

    indice = 0;
    tempMax = 0;
    capMax = 0;
    ultimaFila = 0;
}

