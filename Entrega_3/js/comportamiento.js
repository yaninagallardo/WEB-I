//DOM
document.addEventListener("DOMContentLoaded", inicio);
function inicio() {
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


async function guardarEnServicio(data) {

    await fetch(url, {
        "method": "POST",
        "headers":
        {
            "content-Type": "application/json"
        },
        "body": JSON.stringify(data)
    });

    return true;
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

    guardarEnServicio(data);
    imprimirTabla();

}

async function getJsonServicio() {
    let r = await fetch(url);
    return await r.json();
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


async function editarObjetoDeServicio(idElemento) {
    await fetch(url + "/" + idElemento,
        {
            "method": "PUT",
            "mode": "cors",
            "headers":
            {
                "Content-Type": "application/json"
            }
        }
    );
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
            console.log(json);
            cuerpoTabla.innerHTML = "";  //borra el contenido en tbody de html 
            //cargar la tabla recorriendo json
            for (let data of json.series) {
                cargarTabla(data);
            }
        });
}

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
    btnBorrar.addEventListener("click", function () {                   //pasar a funcion aparte
        borrarObjetoDeServicio(btnBorrar.getAttribute("id"));
        imprimirTabla();
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
        let tdsFila = btn.closest("tr").querySelectorAll("td");           //TERMINAR!
        
        let div = divBtnAceptarCacelar(btn);
        div.classList.add("mostrar");
        btn.classList.remove("mostrar");
        btn.classList.add("ocultar");

        tdsFila[6].appendChild(div);
        isEditable(tdsFila, "true");
    });
    return btn;
}

function editando(btn, div){
    if (editando){
        div.classList.toggle("mostrar");
        btn.classList.remove("mostrar");
        btn.classList.add("ocultar");
        return true;
    }
    divBtns.classList.remove("mostrar");
    divBtns.classList.add("ocultar");
    
    btn.classList.add("mostrar");
}

function isEditable(tdsFila, editando) {
    if (editando) {
        for (let i = 0; i< 5; i++) {
            tdsFila[i].contentEditable = "true";
        }
    } else {
        for (let i = 0; i< 5; i++) {
            tdsFila[i].contentEditable = "false";
        }
    }
}

function divBtnAceptarCacelar(btn) {
    let tdsFila = btn.closest("tr").querySelectorAll("td");

    let divBtns = document.createElement("div");
    let btnAceptar = document.createElement("button");
    btnAceptar.innerHTML = "Aceptar";
    btnAceptar.classList.add("btn");

    btnAceptar.addEventListener("click", function () {
        divBtns.classList.remove("mostrar");
        divBtns.classList.add("ocultar");
        
        btn.classList.add("mostrar");
        isEditable(tdsFila, "false");
    });

    let btnCancelar = document.createElement("button");
    btnCancelar.innerHTML = "Cancelar";
    btnCancelar.classList.add("btn");
    btnCancelar.addEventListener("click", function () {
        divBtns.classList.remove("mostrar");
        divBtns.classList.add("ocultar");

        btn.classList.add("mostrar");
        isEditable(tdsFila, "false");
    });

    divBtns.appendChild(btnAceptar);
    divBtns.appendChild(btnCancelar);

    return divBtns;
}

function buscarElementos() {
    cuerpoTabla.innerHTML = "";
    getJsonServicio()
        .then(function (json) {
            for (let element of json.series) {
                if (element.thing.titulo == inputBuscar.value) {
                    cargarTabla(element);
                }
            }
        });
}




