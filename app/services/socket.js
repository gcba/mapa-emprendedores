var CartoDB = require('cartodb');
// api key para conectarme a cartodb
var secret = require('./secrets.js');

// import formateador de fecha
var FormatDate = require('./formatdate');

// importo los modelos para guardar en la db
var Nagios = require('../models/nagios');
var Luminarias = require('../models/luminarias');
var Estadisticas = require('../models/festadisticas');
var Report = require('../models/report');

// defino dos tipos de intervalos
const interval = 7000000;
const interval2 = 4000000;

// creo el cliente de cartodb
var client = new CartoDB({
	user:secret.user,
	api_key:secret.api_key
});
/*
	las funciones report y save_error
	guardan cualquier error que pueda generar cartodb y lo emite al cliente con socket
*/
var report = function(socket, err){
	socket.emit("error", err);
	console.log(err);
	save_err(err);
}
//
var save_err = function(err){
	ErrSave = new Report({
		"type": err,
		"updated_at": new Date()
	}).save()
}
/*
	funcion que recorre cada segmento, por cada segmento recorrido, se efectua un cb que lo guarda en la db
*/
var forEach = function(data, cb){
	len = data.total_rows
	if (len >= 1){
		for (var i = 0;i<len;i++){
			cb(data.rows[i])
		}
	} 
}
/*
	modulo que se exporta, se le pasa como parametro socket para emitir data al cliente
	cada un intervalo , se hace una query a la api de cartodb, para extraer los segmentos actualizados

*/

var getQuery = {
	"puntos_nagios": "SELECT id_nagio, status, updated_at FROM puntos_nagios ",
	"puntos_luminarias" : "SELECT cartodb_id, external_id, fraccion_id, status, tiempo_sin_luz, updated_at FROM puntos_luminarias ",
	"fracciones_estadistica" : "SELECT cartodb_id, cantidad_luminarias, fraccion_id, porcentaje_sin_luz, puntaje_ranking, tiempo_sin_luz, updated_at FROM fracciones_estadistica "
}

module.exports = function(io) {
	io.sockets.on('connection', function(socket){
		socket.emit('connected');
		setInterval(function(){
			var hr = new Date()
			console.log(hr.toLocaleString())
			socket.emit("time", hr);
			client.on('connect', function(){
				client.query(getQuery["puntos_luminarias"] + " WHERE {interval} < updated_at", {interval: "current_timestamp-interval'60 minute'"}, function(err, data){
					console.log("emit update...")
					if (err){
						report(socket, err);
					} else {
						forEach(data, function(elem){
							// NagiosSave = new Nagios({
							// 	"id_nagio":  elem.id_nagio,
							// 	"status": elem.status,
							// 	"updated_at": FormatDate(elem.updated_at)
							// }).save()
							//	
							LuminariasSave = new Luminarias({
								"cartodb_id":  elem.cartodb_id,
								"external_id": elem.external_id,
								"fraccion_id" : elem.fraccion_id,
								"status": elem.status,
								"tiempo_sin_luz":elem.tiempo_sin_luz,
								"updated_at": FormatDate(elem.updated_at)
							}).save()							
						})
					}
					// emite los segmentos traidos de la api de cartodb al cliente
					socket.emit("update", data);
					console.log("updated emited");
				});
			});
			// se desconecta de cartodb
			client.connect()
		}, 105000);
	});
}