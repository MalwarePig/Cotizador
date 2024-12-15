const express = require('express'); //guardar express en una variable de servidor
const router = express.Router(); //usar modulo de router de express
const bdController = require('../controller/bdController');

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

var reinicio = router.get('/Historial', (req, res) => {
	//res.send('holoo');
	res.render('./Historial/Historial.html');
});

//Consulta
router.get('/BuscarHis/', bdController.list);
//Insert
router.post('/SetRegistro', bdController.SetRegistro);
//Consulta
router.get('/Delete/', bdController.Delete);



module.exports = router;