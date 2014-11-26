var CartoDB = require('cartodb');
// api key para conectarme a cartodb
var secret = require('./secrets.js');
var config = require('../config.json');
// import formateador de fecha
var FormatDate = require('./formatdate');

// importo los modelos para guardar en la db
var Nagios = require('../models/nagios');
var Luminarias = require('../models/luminarias');
var Estadisticas = require('../models/festadisticas');
var Report = require('../models/report');
var Informante = require('../models/informantes');

// defino los tipos de intervalos
const unahora = 3600000;
const mediahora = 1800000;
const quincemin = 900000;
const cincomin = 300000;

var calinterval = function(min){
	return min * 60  * 1000
}

const interval = calinterval(config.interval);

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

var asd = function(err, cb){
	if (err){
		report(socket, err);
	} else {
		cb
	}
}

/*
	modulo que se exporta, se le pasa como parametro socket para emitir data al cliente
	cada un intervalo , se hace una query a la api de cartodb, para extraer los segmentos actualizados

*/

var getQuery = {
	"puntos_nagios": "SELECT id_nagio, status, updated_at FROM puntos_nagios ",
	"puntos_luminarias" : "SELECT cartodb_id, external_id, fraccion_id, status, tiempo_sin_luz, updated_at FROM puntos_luminarias ",
	"fracciones_estadistica" : "SELECT cartodb_id, cantidad_luminarias, fraccion_id, porcentaje_sin_luz, puntaje_ranking, tiempo_sin_luz, updated_at FROM fracciones_estadistica ",
	"status_informantes":"SELECT cartodb_id, descripcion, fecha_actualizacion, fecha_alta, id_ubicacion, lat, long, titulo, ubicacion, ultimo_estado, user_id, created_at ",
	"interval": "current_timestamp-interval'60 minute'"
}


var get_informantes = function(){
	client.query(getQuery["status_informantes"] + " WHERE {interval} < updated_at", {interval: getQuery["interval"]}, function(err, data){
		console.log("emit update...")
		asd(err, forEach(data, function(elem){
			InformanteSave = new Informante({
				"cartodb_id" : elem.cartodb_id,
				"descripcion" : elem.descripcion,
				"fecha_actualizacion" : FormatDate(elem.fecha_actualizacion),
				"fecha_alta" : FormatDate(elem.fecha_alta),
				"id_ubicacion" : elem.id_ubicacion,
				"lat" : elem.lat,
				"long" : elem.long,
				"titulo": elem.titulo,
				"ubicacion": elem.ubicacion,
				"ultimo_estado": elem.ultimo_estado,
				"user_id" : elem.user_id,
				"created_at": FormatDate(elem.created_at)
			}).save()
		}))
		//socket.emit("update", data);
		console.log("updated emited puntos nagios");
	});
}

var get_nagios = function(){
	client.query(getQuery["puntos_nagios"] + " WHERE {interval} < updated_at", {interval: getQuery["interval"]}, function(err, data){
		console.log("emit update...")
		asd(err, forEach(data, function(elem){
			NagiosSave = new Nagios({
				"id_nagio":  elem.id_nagio,
				"status": elem.status,
				"updated_at": FormatDate(elem.updated_at),
				"lat":elem.lat,
				"long":elem.long
			}).save()
		}))
		//socket.emit("update", data);
		console.log("updated emited puntos nagios");
	});
}

var get_festadistica = function(){
	client.query(getQuery["fracciones_estadistica"] + " WHERE {interval} < updated_at", {interval: getQuery["interval"]}, function(err, data){
		console.log("emit update...")
		asd(err, forEach(data, function(elem){
			EstadisticasSave = new Estadisticas({
				"cartodb_id" : elem.cartodb_id,
				"cantidad_luminarias": elem.cantidad_luminarias,
				"fraccion_id" : elem.fraccion_id,
				"porcentaje_sin_luz" : elem.porcentaje_sin_luz,
				"puntaje_ranking" : elem.puntaje_ranking,
				"tiempo_sin_luz" : elem.tiempo_sin_luz,
				"updated_at": FormatDate(elem.updated_at)
			}).save()
		}))
		//socket.emit("update", data);
		console.log("updated emited fracciones estadistica");
	});
}

var get_luminarias = function(cb){
	client.on('connect', function(){
		console.log("connected");
		client.query(getQuery["puntos_luminarias"] + " WHERE {interval} < updated_at", {interval: getQuery["interval"]}, function(err, data){
			console.log("emit update...")
			asd(err, forEach(data, function(elem){
				LuminariasSave = new Luminarias({
					"cartodb_id":  elem.cartodb_id,
					"external_id": elem.external_id,
					"fraccion_id" : elem.fraccion_id,
					"status": elem.status,
					"tiempo_sin_luz":elem.tiempo_sin_luz,
					"updated_at": FormatDate(elem.updated_at)
				}).save()
			}))
			// emite los segmentos traidos de la api de cartodb al cliente
			cb(data)
			console.log("updated emited puntos luminarias");
		});
	});
}


var emit_hr = function(socket){
	var hr = new Date()
	console.log(hr.toLocaleString())
	socket.emit("time", hr);
}


module.exports = function(io) {
	io.sockets.on('connection', function(socket){
		socket.emit('connected');
		setInterval(function(){
			get_luminarias(function(data){
				console.log(data)
				socket.emit("update", data);
			});
			get_informantes();
			get_nagios();
			get_festadistica();
			try {
				client.connect()
				process.on('uncaughtException', function(e){
					console.log(e);
				})
			} catch (err) {
				report(socket, err)
			}
		}, interval);
	})
}