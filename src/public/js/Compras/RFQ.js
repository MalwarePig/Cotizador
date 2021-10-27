//=========================================== AGREGA FILA DE REGISTRO EN NOTAS =================================================//
function AddNota() {
    let Unidad = document.getElementById("Unidad").value;
    let Clave = document.getElementById("Clave").value;
    let Cantidad = document.getElementById("Cantidad").value;
    let Descripción = document.getElementById("Descripcion").value;
    let PU = document.getElementById("PU").value;
    let Descuento = document.getElementById("Descuento").value;

    console.log(Unidad, Clave, Cantidad, Descripción, PU, Descuento);
    var Arreglo = [Unidad, Clave, Cantidad, Descripción, PU, Descuento];

    var Condicion = true; //para campos vacios

    for (var a in Arreglo) { //recorrer arreglo en busca de campos vacios
        if (Arreglo[a].length == 0) {
            Condicion = false; //si algun campo esta vacio cambia a falso
        }
    }

    if (Condicion == true) { //si todos los campos estan llenos avanza
        var TablaLineas = document.getElementById('TablaLineas').getElementsByTagName('tbody')[0];
        // inserta una fila al final de la tabla
        var newRow = TablaLineas.insertRow(TablaLineas.rows.length);
        let indice = (TablaLineas.rows.length + 1);
        newRow.setAttribute("id", "fila" + indice); //se asigna id al incrementar cada fila +1 para contar el encabezado
        for (var x = 0; x < Arreglo.length; x++) {

            // inserta una celda en el indice 0
            var newCell = newRow.insertCell(x);
            // adjuntar el texto al nodo
            var newText = document.createTextNode(Arreglo[x]);
            newCell.appendChild(newText);
            if (x == 5) { //Si termina de registrar datos crear el boton
                var newCell = newRow.insertCell(6); //CREAR CELDA onclick="CrearNota()"
                newCell.innerHTML = '<button id="' + x + '" class="btn btn-danger" name="btn" onclick="EliminarFila(' + indice + ')"> <i class="far fa-minus-square"></i> </button>';
            }
        }

    }
}


//=========================================== ELIMINAR FILA DE REGISTRO EN NOTAS =================================================//
function EliminarFila(index) {
    $("#fila" + index).remove();
}

//=========================================== crear pdf =================================================//
var img = new Image;
img.src = 'images/Logo.png';

function modal() {
    $("#AsignadoExito").modal();
}

function PDF() {
    var doc = new jsPDF();//Alto y ancho
 
    doc.addImage(img, 10, 1, 85, 35); //EJE X,Y  -  ANCHO Y ALTO MORELOS

    //doc.setFontType("bold");
    doc.setFontSize(9);
    doc.setTextColor(25);
    doc.setFontType("normal");
    doc.text("PROMESA, PROYECTOS MECANICOS ELECTRICOS, SA DE CV.", 108, 8);
 
    doc.save("RFQ" + '.pdf');
}
 