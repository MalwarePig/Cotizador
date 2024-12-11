const express = require('express'); //guardar express en una variable de servidor
const router = express.Router(); //usar modulo de router de ex´press


//Acceder a login
var reinicio = router.get('/', (req, res) => {
	//res.send('holoo');
	res.render('index.html');
});

var reinicio = router.get('/home', (req, res) => {
	//res.send('holoo');
	res.render('index.html');
});

var reinicio = router.get('/Nuevo', (req, res) => {
	//res.send('holoo');
	res.render('./Cotizador/Cotizador.html');
});

var reinicio = router.get('/Pruebas', (req, res) => {
	//res.send('holoo');
	res.render('./Cotizador/Desarrollo.html');
});

module.exports = router;