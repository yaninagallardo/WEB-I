//DOM
document.addEventListener("DOMContentLoaded", inicializar);


function inicializar() {
    let url = "http://web-unicen.herokuapp.com/api/groups/06/series";      //URL
    borrarObjetoDeServicio();

    // BOTONES: 
    //BOTON AGREGAR 3 FILAS CARGADAS
    document.querySelector("#btn-agregar3").addEventListener("click", agregar3filas);

    //BOTON ELIMINAR FILAS DE LA LISTA Y DE JSON
    document.querySelector("#btn-eliminar").addEventListener("click", vaciarFilas);

    //inserta nueva serie a la tabla desde el formulario cargado (BOTON ENVIAR)
    document.querySelector(".enviarCap").addEventListener("click", agregarFilaDeForm);

    // trae del DOM cuerpo de la tabla
    let cuerpoTabla = document.querySelector("#cuerpoTabla");


    async function guardarEnServicio(data) {

        let resp = await fetch(url, {
            "method": "POST",
            "headers":
            {
                "content-Type": "application/json"
            },
            "body": JSON.stringify(data)
        });
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
        let resp = await fetch(url);

        let json = await resp.json();

        return json;
    }

    async function borrarObjetoDeServicio(capituloABrorrar) {
        let json = await getJsonServicio();

        for (let serie of json.series) {
            if (serie.thing.numCapitulo == capituloABrorrar) {
                console.log(serie._id);
                await fetch(url + "/" + serie._id,
                    {
                        "method": "DELETE",
                        "mode": "cors",
                        "headers":
                        {
                            "Content-Type": "application/json"
                        }
                    });
            }
        }
    }

    /**        Corrección en entrega 2:
     * 
     * LA RESOLUCION SERIA RECARGAR LA TABLA CADA VES QUE SE AGREGA UNA NUEVA
     * FILA. AL IGUAL QUE PARA DESTACAR O BUSCAR
     */
    async function imprimirTabla() {

        let json = await getJsonServicio();

        cuerpoTabla.innerHTML = "";  //borra el contenido en tbody de html 

        //volver a cagar la tabla recorriendo json
        for (let data of json.series) {

            //inserta una nueva fila en tbody
            let fila = cuerpoTabla.insertRow();

            //boton borrar fila
            let btnBorrar = botonBorrar();
            let btnEditar = botonEditar();

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

            //agrega clase al td numCapitulo
            celda1.classList.add(".numeroCapitulo");

            //agrega texto a la celda hija correspondiente
            celda1.appendChild(texto1);
            celda2.appendChild(texto2);
            celda3.appendChild(texto3);
            celda4.appendChild(texto4);
            celda5.appendChild(texto5);
            celda6.appendChild(btnBorrar);
            celda7.appendChild(btnEditar);

        }
    }

    /**
     * crea, da estilo (desde css) y función al boton borrar,
     *  encargado de eliminar la fila y su contenido en el servicio
     */
    function botonBorrar() {
        let btnBorrar = document.createElement("button");

        btnBorrar.innerHTML = "BORRAR";
        btnBorrar.classList.add("btn");

        btnBorrar.addEventListener("click", function () {                          //pasar a funcion aparte
            let tdsFila = btnBorrar.closest("tr").querySelectorAll("td");

            for (let elementTd of tdsFila) {
                if (elementTd.classList.value == ".numeroCapitulo") {
                    borrarObjetoDeServicio(elementTd.textContent);
                }
            }
        });
        imprimirTabla();
        return btnBorrar;
    }

    /**
     * crea, da estilo (desde css) y función al boton editar,
     *  encargado de editar la fila y su contenido en el servicio
     */
    function botonEditar() {
        let btn = document.createElement("button");

        btn.innerHTML = "EDITAR";
        btn.classList.add("btn");

        //btn.addEventListener("click", editarFila);
        return btn;
    }

    /**
     * Esta función vacia tanto el arreglo con la información existente
     * como las filas en la tabla. Dejando a la vista solo el thead
     */
    function vaciarFilas() {
        filaNueva.serie = [];
        cuerpoTabla.innerHTML = "";
    }

    imprimirTabla();
}
