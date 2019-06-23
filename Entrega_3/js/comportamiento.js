//DOM
document.addEventListener("DOMContentLoaded", inicio);

function inicio() {
    "use strict"
    imprimirTabla();
}


let url = "http://web-unicen.herokuapp.com/api/groups/06/series";      //URL

// BOTONES: 
//BOTON AGREGAR 3 FILAS CARGADAS
document.querySelector("#btn-agregar3").addEventListener("click", agregar3filas);

//btn BUSCAR:
document.querySelector("#js-btnBuscar").addEventListener("click", buscarElementos);

//input
let inputBuscar = document.querySelector(".form-control");

//inserta nueva serie a la tabla desde el formulario cargado (BOTON ENVIAR)
document.querySelector(".enviarCap").addEventListener("click", agregarFilaDeForm);

// trae del DOM cuerpo de la tabla
let cuerpoTabla = document.querySelector("#cuerpoTabla");

//METODOS ABMG
async function guardarEnServicio(data) {

    await fetch(url, {
        "method": "POST",
        "headers":
        {
            "content-Type": "application/json"
        },
        "body": JSON.stringify(data)
    });
}

async function getJsonServicio(id) {
    let r = await fetch(url + "/" + id,
        {
            "method": "GET",
            "mode": "cors",
            "headers":
            {
                "Content-Type": "application/json"
            }
        }

    );

    let json = await r.json();
    return json.information;
}

async function borrarObjetoDeServicio(idElemento) {
    await fetch(url + "/" + idElemento,
        {
            "method": "DELETE",
            "mode": "cors",
            "headers":
            {
                "Content-Type": "application/json"
            }
        }
    );
}

async function editarObjetoDeServicio(idElemento, data) {
    await fetch(url + "/" + idElemento,
        {
            "method": "PUT",
            "mode": "cors",
            "headers":
            {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify(data)
        }
    );
}


//inputs de HTML correpondientes al formulario
let capitulo = document.querySelector(".num-cap");
let temporada = document.querySelector(".num-tem");
let tituloSerie = document.querySelector(".tituloSerie");
let emision = document.querySelector(".fecha-emision");
let sinop = document.querySelector(".sinopsisCap");

/**
 * Función que reponde al metodo agregar 3 filas a la tabla
 */
function agregar3filas(event) {
    for (let i = 1; i <= 3; i++) {
        agregarFilaDeForm(event);
    }

}

/**
 * recupera datos de los input del formulario
 * y lo carga en una nueva fila en la tabla
 * @param event 
 */
function agregarFilaDeForm(event) {
    event.preventDefault();
    let data =
    {
        "thing":
        {
            "numCapitulo": capitulo.value,
            "numTemporada": temporada.value,
            "titulo": tituloSerie.value,
            "fechaEmision": emision.value,
            "sinopsis": sinop.value,
        }
    };

    guardarEnServicio(data)
    imprimirTabla();

}

/**        Corrección en entrega 2:
 * 
 * LA RESOLUCION SERIA RECARGAR LA TABLA CADA VES QUE SE AGREGA UNA NUEVA
 * FILA. AL IGUAL QUE PARA DESTACAR O BUSCAR
 */
function imprimirTabla() {
    
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            cuerpoTabla.innerHTML = " ";  //borra el contenido en tbody de html  
            //recorre json y carga la tabla
            for (let data of json.series) {
                cargarTabla(data);

            }
        });
}

/**
 * busca coincidencias en titulo con el input en buscar 
 * y pasa al metodo cargar tabla la informacion a mostrar
 * 
 */
function buscarElementos() {
   
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            cuerpoTabla.innerHTML = "";
            for (let element of json.series) {
                if (element.thing.titulo == inputBuscar.value) {
                    cargarTabla(element);
                }
            }
        });
}

/**
 * cargar tabla con la informacion pasada por parametro
 * @param {*} data 
 */
function cargarTabla(data) {
    //inserta una nueva fila en tbody
    let fila = cuerpoTabla.insertRow();

    //boton borrar fila
    let btnBorrar = botonBorrar(data._id);
    let btnEditar = botonEditar(data._id);

    //inserta 5 celdas nuevas correspondientes a la cantidad de columnas en la tabla
    let celda1 = fila.insertCell();
    let celda2 = fila.insertCell();
    let celda3 = fila.insertCell();
    let celda4 = fila.insertCell();
    let celda5 = fila.insertCell();
    let celda6 = fila.insertCell();
    let celda7 = fila.insertCell();

    //pasaje de contenido en json a texto (http)
    let texto1 = document.createTextNode(data.thing.numCapitulo);
    let texto2 = document.createTextNode(data.thing.numTemporada);
    let texto3 = document.createTextNode(data.thing.titulo);
    let texto4 = document.createTextNode(data.thing.fechaEmision);
    let texto5 = document.createTextNode(data.thing.sinopsis);

    //agrega texto a la celda hija correspondiente
    celda1.appendChild(texto1);
    celda2.appendChild(texto2);
    celda3.appendChild(texto3);
    celda4.appendChild(texto4);
    celda5.appendChild(texto5);
    celda6.appendChild(btnBorrar);
    celda7.appendChild(btnEditar);
}

/**
 * crea, da estilo (desde css) y función al boton borrar,
 *  encargado de eliminar la fila y su contenido en el servicio
 */
function botonBorrar(idElemento) {
    let btnBorrar = document.createElement("button");

    btnBorrar.innerHTML = "BORRAR";
    btnBorrar.classList.add("btnBorrar");

    btnBorrar.setAttribute("id", idElemento);
    btnBorrar.addEventListener("click", function () {
        let id = btnBorrar.getAttribute("id");
        borrarObjetoDeServicio(id)
        .then(function (){
            imprimirTabla();
        });
        
    });
    return btnBorrar;
}

/**
 * crea, da estilo (desde css) y función al boton editar,
 *  encargado de editar la fila y su contenido en el servicio
 */
function botonEditar(idElemento) {
    let btn = document.createElement("button");

    btn.innerHTML = "EDITAR";
    btn.classList.add("btnEditar");

    btn.setAttribute("id", idElemento);
    //agregar id comun y por parametro traer id del data

    btn.addEventListener("click", function () {
        let tds = btn.closest("tr").querySelector("td");
        let id = btn.getAttribute("id");

        mostrarEditando(btn, id);
    });
    return btn;
}

/**
 * crea, da estilo (desde css) y función a los botones aceptar y cancelar contenidos en un div,
 * aparecen cuando se esta editando una fila.
 * Aceptar = oculta input de edicion y actualiza el servidor
 * cancelar = oculta inputs de edicion
 * @param {*} id 
 */
function divBtnAceptarCancelar(id) {

    let divBtns = document.createElement("div");
    let btnAceptar = document.createElement("button");
    btnAceptar.innerHTML = "Aceptar";
    btnAceptar.classList.add("btn");
    btnAceptar.setAttribute("id", id);

    btnAceptar.addEventListener("click", function () {
        let id = btnAceptar.getAttribute("id");
        ocultarEditando(btnAceptar, id, true);

    });

    let btnCancelar = document.createElement("button");
    btnCancelar.innerHTML = "Cancelar";
    btnCancelar.classList.add("btn");
    btnCancelar.setAttribute("id", id);

    btnCancelar.addEventListener("click", function () {
        let id = btnCancelar.getAttribute("id");
        ocultarEditando(btnCancelar, id, false);
    });

    divBtns.appendChild(btnAceptar);
    divBtns.appendChild(btnCancelar);

    return divBtns;
}


/**
 * al presionar el boton editar se ejecuta este metodo,
 * El cual oculta valores de las celdas a editar y agrega input con el valor anterior
 * (para luego actalizarlo).
 * Tambien remueve boton editar y agrega div con btns aceptar y cancelar.
 * @param {*} btn 
 * @param {*} id 
 */
async function mostrarEditando(btn, id) {
    let inputCap;
    let inputTemp;
    let inputFecha;
    let inputTitulo;
    let areaSinopsis;

    let tdsFila = btn.closest("tr").querySelectorAll("td");
    let valores = await getJsonServicio(id);

    //remover valores de la fila para mostrar inputs
    for (let i = 0; i < 5; i++) {
        tdsFila[i].innerHTML = " ";
    }

    //quita btnEditar y agrega div
    let div = divBtnAceptarCancelar(id);
    tdsFila[6].removeChild(btn);
    tdsFila[6].appendChild(div);

    //input capitulo
    inputCap = document.createElement("input");
    inputCap.type = "number";
    inputCap.value = valores.thing.numCapitulo;
    tdsFila[0].innerHTML = "";
    tdsFila[0].appendChild(inputCap);
    //input temprada
    inputTemp = document.createElement("input");
    inputTemp.type = "number";
    inputTemp.value = valores.thing.numTemporada;
    tdsFila[1].appendChild(inputTemp);
    //input titulo       
    inputTitulo = document.createElement("input");
    inputTitulo.type = "text";
    inputTitulo.value = valores.thing.titulo.toString();
    tdsFila[2].appendChild(inputTitulo);
    //input fecha emision                                               
    inputFecha = document.createElement("input");
    inputFecha.type = "date";
    inputFecha.value = valores.thing.fechaEmision.toString();
    tdsFila[3].appendChild(inputFecha);
    //input sinopsis                                                     
    areaSinopsis = document.createElement("textarea");
    areaSinopsis.value = valores.thing.sinopsis.toString();
    tdsFila[4].appendChild(areaSinopsis);
}

/**
 * al presionar el boton aceptar/cancelar se ejecuta este metodo,
 * El cual oculta inputs de las celdas a editar y agrega sus valores del servicio 
 * Tambien remueve div con btns aceptar y cancelar y agrega boton editar.
 * 
 * Aceptar = envia true (actualiza el objeto en el servicio)
 * Cancelar = envia false
 * @param {*} btn 
 * @param {*} id 
 * @param {*} editarServicio boolean (actualizar o no el servicio)
 */
async function ocultarEditando(btn, id, editarServicio) {
    tdsFila = btn.closest("tr").querySelectorAll("td");

    let div = tdsFila[6].querySelector("div");

    tdsFila[6].removeChild(div);
    tdsFila[6].appendChild(botonEditar(id));

    //inputs en las celdas
    let capitulo = tdsFila[0].querySelector("input");
    let temporada = tdsFila[1].querySelector("input");
    let tituloSerie = tdsFila[2].querySelector("input");
    let emision = tdsFila[3].querySelector("input");
    let sinop = tdsFila[4].querySelector("textarea");

    if (editarServicio) {
        let data =
        {
            "thing":
            {
                "numCapitulo": capitulo.value,
                "numTemporada": temporada.value,
                "titulo": tituloSerie.value,
                "fechaEmision": emision.value,
                "sinopsis": sinop.value,
            }
        };

        await editarObjetoDeServicio(id, data);
    }

    //imprimir valores de la fila haya sido editada o no
    let filaEditada = await getJsonServicio(id);

    //numcapitulo
    tdsFila[0].removeChild(capitulo);
    let texto0 = document.createTextNode(filaEditada.thing.numCapitulo);
    tdsFila[0].appendChild(texto0);
    //numTemporada
    tdsFila[1].removeChild(temporada);
    let texto1 = document.createTextNode(filaEditada.thing.numTemporada);
    tdsFila[1].appendChild(texto1);
    //titulo
    tdsFila[2].removeChild(tituloSerie);
    let texto2 = document.createTextNode(filaEditada.thing.titulo);
    tdsFila[2].appendChild(texto2);
    //fecha de emision
    tdsFila[3].removeChild(emision);
    let texto3 = document.createTextNode(filaEditada.thing.fechaEmision);
    tdsFila[3].appendChild(texto3);
    //sinopsis
    tdsFila[4].removeChild(sinop);
    let texto4 = document.createTextNode(filaEditada.thing.sinopsis);
    tdsFila[4].appendChild(texto4);
}