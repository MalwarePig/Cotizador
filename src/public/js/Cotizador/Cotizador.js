
async function crearCotizacionExcel() {
    const workbook = new ExcelJS.Workbook();

    // Cargar imagen del logo
    const response = await fetch('images/logo.png'); // Ruta a la imagen en carpeta pública
    const imageBlob = await response.blob();
    const arrayBuffer = await imageBlob.arrayBuffer();

    // Agregar imagen al libro de Excel
    const logoId = workbook.addImage({
        buffer: arrayBuffer,
        extension: 'png'
    });

    // Hoja 1: Cotización
    const hojaCotizacion = workbook.addWorksheet('Cotización');
    hojaCotizacion.properties.defaultRowHeight = 20;

    hojaCotizacion.addImage(logoId, {
        tl: { col: 2, row: 0 },
        ext: { width: 80, height: 80 }
    });

    // Título de la cotización
    hojaCotizacion.mergeCells('G2:K2');
    hojaCotizacion.getCell('G2').value = 'Título de Cotización';
    hojaCotizacion.getCell('G2').alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };//Formato de celda
    hojaCotizacion.getCell('G2').font = { bold: true, size: 18 };//Formato de texto
    hojaCotizacion.getCell('G2').fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF4CAF50' }
    };

    //Lorem ipsum
    const Lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed justo in elit mollis hendrerit. Nulla facilisi. Curabitur nec mollis eros, in congue turpis. Nam rhoncus vitae ipsum et tristique. Praesent nec felis a nisi interdum luctus sit amet non nisi. Aenean placerat nulla sed lobortis rhoncus. Integer tempor dolor nec consequat molestie. Phasellus turpis massa, placerat ut nulla eu, placerat viverra nisi.'
    hojaCotizacion.mergeCells('G4:K8');
    hojaCotizacion.getCell('G4').value = Lorem;
    hojaCotizacion.getCell('G4').alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };//Formato de celda
    hojaCotizacion.getCell('G4').border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: '' }
    };

    /* ********************************************** */
    // Agregar encabezados a partir de fila 5 y columna 7 (G5 a K5)
    const encabezados = hojaCotizacion.getRow(10);
    encabezados.getCell(7).value = '#';
    encabezados.getCell(8).value = 'Descripción';
    encabezados.getCell(9).value = 'Cantidad';
    encabezados.getCell(10).value = 'Precio Unitario';
    encabezados.getCell(11).value = 'Total';

    // Configurar ancho de las columnas necesarias
    hojaCotizacion.getColumn(7).width = 5;  // Columna G
    hojaCotizacion.getColumn(7).key = 'num';  // Columna G
    hojaCotizacion.getColumn(8).width = 30; // Columna H
    hojaCotizacion.getColumn(8).key = 'desc'; // Columna H
    hojaCotizacion.getColumn(9).width = 10; // Columna I
    hojaCotizacion.getColumn(9).key = 'Cantidad'; // Columna I
    hojaCotizacion.getColumn(10).width = 15; // Columna J
    hojaCotizacion.getColumn(10).key = 'unitPrice'; // Columna J
    hojaCotizacion.getColumn(11).width = 15; // Columna K
    hojaCotizacion.getColumn(11).key = 'total'; // Columna K

    // Aplicar estilo a los encabezados
    encabezados.eachCell({ includeEmpty: false }, (cell) => {
        cell.font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 12 };
        cell.alignment = { horizontal: 'center', vertical: 'middle' };
        cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF007BFF' }, // Fondo azul
        };
        cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        };
    });

    // Agregar datos debajo de los encabezados
    const datos = [
        { num: 1, desc: 'Producto A', qty: 2, unitPrice: 50, total: 100 },
        { num: 2, desc: 'Producto B', qty: 1, unitPrice: 75, total: 75 },
        { num: 3, desc: 'Producto C', qty: 3, unitPrice: 20, total: 60 },
    ];

    hojaCotizacion.addRows(datos);
    // Aplicar formato numérico a las columnas de precios y totales
    hojaCotizacion.getColumn(10).numFmt = '"$"#,##0.00';
    hojaCotizacion.getColumn(11).numFmt = '"$"#,##0.00';

    /* ********************************************** */
    // Subtotales y totales
    // Agregar datos debajo de los encabezados
    const Totales = [
        { unitPrice: 'Subtotal', total: 235 },
        { unitPrice: 'IVA (16%)', total: 37.6 },
        { unitPrice: 'Total', total: 272.6 },
    ];

    hojaCotizacion.addRows(Totales);

    //Obtener la ultima fila con un dato
    const ultimaFila = hojaCotizacion.lastRow.number;
    console.log(`La última fila con datos es: ${ultimaFila}`);
    // Agregar encabezados a partir de la ultima fila mas 5 filas de espacio hacia abajo
    const encabezadosDos = hojaCotizacion.getRow(ultimaFila + 5);
    encabezadosDos.getCell(9).value = 'Nomina';
    encabezadosDos.getCell(10).value = 'Nombre';
    encabezadosDos.getCell(11).value = 'Puesto';

    // Configurar ancho de las columnas necesarias
    hojaCotizacion.getColumn(9).key = 'nom'; // Columna I
    hojaCotizacion.getColumn(10).key = 'name'; // Columna J
    hojaCotizacion.getColumn(11).key = 'area'; // Columna K

    // Aplicar estilo a los encabezados
    encabezadosDos.eachCell({ includeEmpty: false }, (cell) => {
        cell.font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 12 };
        cell.alignment = { horizontal: 'center', vertical: 'middle' };
        cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: '#aab7f4' }, // Fondo azul
        };
    });

    const Data = [
        { nom: '557', name: 'Sergio Osvaldo', area: 'Gerente' },
        { nom: '558', name: 'Juan Carlos', area: 'Mantenimiento' },
        { nom: '559', name: 'Valeria Lopez', area: 'Nominas' },
    ];

    hojaCotizacion.addRows(Data);
    const dataDos = hojaCotizacion.getRow(22);
    // Aplicar estilo a los encabezados
    dataDos.eachCell({ includeEmpty: false }, (cell) => {
        cell.alignment = { horizontal: 'center', vertical: 'middle' };
    });
    DatosPersonales(hojaCotizacion)
    SegundaHoja(workbook)
}


function DatosPersonales(hojaCotizacion) {
    // Título de la cotización 
    hojaCotizacion.getCell('M4').value = 'Título de Cotización';
}


async function SegundaHoja(workbook) {
    // Hoja 2: Datos del Cliente
    const hojaCliente = workbook.addWorksheet('Datos del Cliente');
    hojaCliente.addRow(['Datos del Cliente']);
    hojaCliente.addRow(['Nombre', 'Juan Pérez']);
    hojaCliente.addRow(['Dirección', 'Av. Principal 123']);
    hojaCliente.addRow(['Teléfono', '123456789']);
    hojaCliente.addRow(['Correo', 'juan.perez@correo.com']);

    hojaCliente.getColumn(1).width = 15;
    hojaCliente.getColumn(2).width = 30;

    // Descargar archivo
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cotizacion_empresa.xlsx';
    a.click();
    URL.revokeObjectURL(url);
}


//Consultar Historial  
function ConsultaHis() {
    $.ajax({
        url: '/BuscarHis/',
        success: function (data) {

            console.log(data)
        } //Funcion success
    }); //Ajax 
}

//=========================================== Guardar elementos de la nota =================================================//
function SetRegistro() {
    var Nombre = 'Yumiko';
    var Edad = 35;
    var Tabla = { Nombre, Edad }; // Usar un objeto más legible
    console.table(Tabla);
    // Enviar los datos como JSON
    $.ajax({
        url: "/SetRegistro",
        method: "POST",
        contentType: "application/json", // Indicar que se envía JSON
        data: JSON.stringify( Tabla ), // Convertir el objeto a JSON
        success: function (objeto, estatus) {
            console.log(objeto, estatus);
            crearCotizacionExcel()

            var myModal = new bootstrap.Modal(document.getElementById('RecoleccionExito'), {
                keyboard: false
            });
            // Muestra el modal
            myModal.show();
        },
        error: function (xhr, estatus, error) {
            console.error("Error:", xhr.responseText, estatus, error);
            var myModal = new bootstrap.Modal(document.getElementById('Vacio'), {
                keyboard: false
            });
            // Muestra el modal
            myModal.show();
        }
    });
}

function Delete() {
    $.ajax({
        url: '/Delete/',
        success: function () {
 
        } //Funcion success
    }); //Ajax
}
