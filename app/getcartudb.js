var mongoose = require('mongoose')
var CartoDB = require('cartodb');
// api key para conectarme a cartodb
var secret = require('./services/secrets.js');
var config = require('./config.json');
// import formateador de fecha
var FormatDate = require('./services/formatdate');

// importo los modelos para guardar en la db
var Nagios = require('./models/nagios');
var Luminarias = require('./models/luminarias');
var Estadisticas = require('./models/festadisticas');
var Report = require('./models/report');
var Informante = require('./models/informantes');

// defino los tipos de intervalos
const unahora = 3600000;
const mediahora = 1800000;
const quincemin = 900000;
const cincomin = 300000;

mongoose.connect(config.db.url || ('mongodb://' + config.db.host + '/'+ config.db.name));

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
	//socket.emit("error", err);
	//console.log(err);
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
		save_err(err);
	} else {
		cb
	}
}

/*
	modulo que se exporta, se le pasa como parametro socket para emitir data al cliente
	cada un intervalo , se hace una query a la api de cartodb, para extraer los segmentos actualizados

*/

// manejador de resultado al guardar
var lolo = function(error, result, count){
	// console.log(error)
	if ("[Error: ya existe el objeto]"){
		save_err(error)
	}
	mongoose.disconnect()
	//console.log(result)
	// console.log(count)
}

var getQuery = {
	"puntos_nagios": "SELECT id_nagio, status, updated_at FROM puntos_nagios ",
	"puntos_luminarias" : "SELECT * FROM status_luminarias ",
	"fracciones_estadistica" : "SELECT cartodb_id, cantidad_luminarias, fraccion_id, porcentaje_sin_luz, puntaje_ranking, tiempo_sin_luz, updated_at FROM fracciones_estadistica ",
	"status_informantes":"SELECT * FROM status_informantes "
}


var get_informantes = function(err, data, cb){
	var cb = null;
	console.log("updated emited puntos informantes");
	console.log(data.rows.length);
	asd(err, forEach(data, function(elem){
		Informante.findOne({updated_at: FormatDate(elem.updated_at)}, function(a, result, c){
			if(result == null){
				InformanteSave = new Informante({
					"cartodb_id" : elem.cartodb_id,
					"descripcion" : FormatDate(elem.descripcion),
					"fecha_actualizacion" : FormatDate(elem.fecha_actualizacion),
					"fecha_alta" : FormatDate(elem.fecha_alta),
					"id_ubicacion" : elem.id_ubicacion,
					"lat" : elem.lat,
					"long" : elem.long,
					"titulo": elem.titulo,
					"ubicacion": elem.ubicacion,
					"ultimo_estado": elem.ultimo_estado,
					"user_id" : elem.user_id,
					"updated_at": FormatDate(elem.updated_at)
				}).save(lolo)
			} else {
				//
			}
		})
	}))
	if('function' == typeof cb)
		cb(data)		
}


var get_nagios = function(err, data, cb){
	var cb = null;
	console.log("updated emited puntos nagios");
	console.log(data.rows.length);
	asd(err, forEach(data, function(elem){
		Nagios.findOne({updated_at: FormatDate(elem.updated_at)}, function(a, result, c){
			if(result == null){
				NagiosSave = new Nagios({
					"id_nagio":  elem.id_nagio,
					"status": elem.status,
					"updated_at": FormatDate(elem.updated_at),
					"lat":elem.lat,
					"long":elem.long
				}).save()
			} else {
				//
			}
		})
	}))
	if('function' == typeof cb)
		cb(data)
}

var get_festadistica = function(err, data, cb){
	var cb = null;
	console.log("updated emited fracciones estadistica");
	console.log(data.rows.length);
	asd(err, forEach(data, function(elem){
		Estadisticas.findOne({updated_at: FormatDate(elem.updated_at)}, function(a, result, c){
			if(result == null){
				EstadisticasSave = new Estadisticas({
					"cartodb_id" : elem.cartodb_id,
					"cantidad_luminarias": elem.cantidad_luminarias,
					"percentil_edad": elem.percentil_edad,
					"percentil_pisos": elem.percentil_pisos,
					"fraccion_id" : elem.fraccion_id,
					"porcentaje_sin_luz" : elem.porcentaje_sin_luz,
					"puntaje_ranking" : elem.puntaje_ranking,
					"tiempo_sin_luz" : elem.tiempo_sin_luz,
					"updated_at": FormatDate(elem.updated_at)
				}).save()
			} else {
				//
			}
		})
	}))
	if('function' == typeof cb)
		cb(data)
}

var get_luminarias = function(err, data, cb){
	var cb = null;
	console.log("updated emited puntos luminarias");
	console.log(data.rows.length);
	asd(err, forEach(data, function(elem){
		Luminarias.findOne({updated_at: FormatDate(elem.updated_at)}, function(a, result, c){
			if(result == null){
				LuminariasSave = new Luminarias({
					"id_fraccion": elem.id_fraccion,
					"status": elem.status,
					"lat": elem.lat,
					"long": elem.long,
					"external_id": elem.external_id,
					"tiempo_sin_luz": elem.tiempo_sin_luz,
					"cartodb_id": elem.cartodb_id,
					"updated_at": FormatDate(elem.updated_at)
				}).save()
			} else {
				//console.log("ya esta guardado")
			}
		});
	}))
	// emite los segmentos traidos de la api de cartodb al cliente
	if('function' == typeof cb)
		cb(data)
}

setInterval(function(){
	client.on('connect', function(){
		client
			.query(getQuery["puntos_luminarias"] + " WHERE {interval} < updated_at", {interval: "current_timestamp-interval'60 minute'"}, get_luminarias)
			.query(getQuery['fracciones_estadistica'] + " WHERE {interval} < updated_at", {interval: "current_timestamp-interval'60 minute'"}, get_festadistica)
			.query(getQuery['puntos_nagios'] + " WHERE {interval} < updated_at", {interval: "current_timestamp-interval'60 minute'"}, get_nagios)
			.query(getQuery['status_informantes'] + " WHERE {interval} < updated_at", {interval: "current_timestamp-interval'60 minute'"}, get_informantes)
	});
	try {
		client.connect()
		process.on('uncaughtException', function(err){
			save_err(err)
		})
	} catch (err) {
		save_err(err)
	}
}, calinterval(3));