var CartoDB = require('cartodb');
var secret = require('./secrets.js');
var Segmentos = require('../models/dump');
var Report = require('../models/report');
var FormatDate = require('./formatdate');

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

var save_err = function(err){
	ErrSave = new Report({
		"type": err[0],
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

module.exports = function(io) {
	io.sockets.on('connection', function(socket){
		socket.emit('connected');
		setInterval(function(){
			var hr = new Date()
			console.log(hr.toLocaleString())
			socket.emit("time", hr);
			client.on('connect', function(){
				client.query("SELECT id_calle, status, updated_at FROM status_luminarias WHERE {interval} < updated_at", {interval: "current_timestamp-interval'60 minute'"}, function(err, data){
					console.log("emit update...")
					if (err){
						report(socket, err);
					} else {
						forEach(data, function(elem){
							SegDump = new Segmentos({
								"id_calle":  elem.id_calle,
								"status": elem.status,
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