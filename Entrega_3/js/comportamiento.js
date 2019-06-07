//DOM
document.addEventListener("DOMContentLoaded", inicializar);


function inicializar() {
    enviar();
    // BOTONES: 
    //BOTON AGREGAR 3 FILAS CARGADAS
    document.querySelector("#btn-agregar3").addEventListener("click", agregar3filas);

    //BOTON ELIMINAR FILAS DE LA LISTA Y DE JSON
    document.querySelector("#btn-eliminar").addEventListener("click", enviar);

    //inserta nueva serie a la tabla desde el formulario cargado (BOTON ENVIAR)
    document.querySelector(".enviarCap").addEventListener("click", agregarFilaDeForm);

    // trae del DOM cuerpo de la tabla
    let cuerpoTabla = document.querySelector("#cuerpoTabla");
    let url = "web-unicen.herokuapp.com/api/groups/06/series";      //URL

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
     

    async function enviar(){
        let data =
            { "thing": 
                {
                    "numCapitulo": 1,
                    "numTemporada": 2,
                    "titulo": "Piloto",
                    "fechaEmision": "2012/11/02",
                    "sinopsis": "Oliver acude a Laurel cuando descubre que lleva un proceso contra Martin Somers"
            }
    };

        let resp = await fetch("http://web-unicen.herokuapp.com/api/groups/06/series", {
            "method": "POST",
            "headers":
            {
                "content-Type": "application/json"
            },
            "body": JSON.stringify(data)
        });

        let json 
    }

    //inputs de HTML correpondientes al formulario
    let capitulo = document.querySelector(".num-cap");
    let temporada = document.querySelector(".num-tem");
    let tit = document.querySelector(".tituloSerie");
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
        

        let nuevo = {
            "numCapitulo": capitulo.value,
            "numTemporada": temporada.value,
            "titulo": tit.value,
            "fechaEmision": emision.value,
            "sinopsis": sinop.value,
        }
        filaNueva.serie.push(nuevo);
        //series.push(nuevo);
        imprimirTabla();

    }

    /**
     * función que inserta una fila ya cargada en el arrgelo serie 
     * correspondiente a Json (filaNueva)
     */


    /**
     * LA RESOLUCION SERIA RECARGAR LA TABLA CADA VES QUE SE AGREGA UNA NUEVA
     * FILA. AL IGUAL QUE PARA DESTACAR O BUSCAR
     */
    function imprimirTabla() {
        //   body de la tabla.innerHTML = '';
        //   for i = 0 hasta series.length

        cuerpoTabla.innerHTML = "";  //borra el contenido en tbody de html 

        //volver a cagar la tabla recorriendo json
        for (let indice = 0; indice < filaNueva.serie.length; indice++) {
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

        }
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
