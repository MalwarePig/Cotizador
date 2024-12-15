const sqlite3 = require('sqlite3').verbose();
const path = require('path');//Traba con directorios identificando el SO

const Controller = {};
const express = require('express');

// Base de datos SQLite
const dbPath = path.resolve(__dirname, '..', 'db', 'dbLocal.db');//raiz / carpeta / archivo

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error al abrir la base de datos:', err.message);
    } else {
        console.log('Conexión a la base de datos establecida');
    }
});


// Controlador para listar datos
Controller.list = (req, res) => {
    const query = 'SELECT * FROM Pruebas';

    db.all(query, (err, rows) => {
        if (err) {
            console.error('Error al ejecutar la consulta:', err.message);
            res.status(500).json({ error: 'Error al obtener los datos' });
        } else {
            console.log('Datos obtenidos:', rows);
            res.json(rows); // Enviar los datos como JSON al cliente
        }
    });
};

Controller.SetRegistro = (req, res) => { //Guarda la auditoria diaria de cada almacen
    const Tabla = req.body; //TRAE TODO EL OBJETO
    console.log(Tabla.Nombre)
    const Nombre = Tabla.Nombre;
    const Edad = Tabla.Edad;
    var query = `INSERT INTO Pruebas (Nombre,Edad) VALUES ('${Nombre}','${Edad}')`;//INSERTA EN LA
    db.run(query, (err, rows) => {
        if (err) {
            console.log("fallo "+ err)
        } else {
            console.log("true")
            res.json({ message: 'Intercambio guardado con éxito' });
        }
    });
};

// Controlador para listar datos
Controller.Delete = (req, res) => {
    const query = 'DELETE FROM Pruebas';

    db.all(query, (err, rows) => {
        if (err) {
            console.error('Error al ejecutar la consulta:', err.message);
            res.status(500).json({ error: 'Error al obtener los datos' });
        } else {
            console.log('Datos obtenidos:', rows);
            res.json(rows); // Enviar los datos como JSON al cliente
        }
    });
};

module.exports = Controller;