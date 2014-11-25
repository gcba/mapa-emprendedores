var CartoDB = require('cartodb');

var client = new CartoDB({
	user:"baemprende",
	api_key:"f2d531bee1002c47a2bcc52f2262c3c28d6ef311"
});

var getQuery = {
	"puntos_nagios": "SELECT id_nagio, status, updated_at FROM puntos_nagios ",
	"puntos_luminarias" : "SELECT cartodb_id, external_id, fraccion_id, status, tiempo_sin_luz, updated_at FROM puntos_luminarias ",
	"fracciones_estadistica" : "SELECT cartodb_id, cantidad_luminarias, fraccion_id, porcentaje_sin_luz, puntaje_ranking, tiempo_sin_luz, updated_at FROM fracciones_estadistica "
}

setInterval(function(){
	client.on('connect', function(){
		client.query(getQuery["puntos_luminarias"] + " WHERE {interval} < updated_at", {interval: "current_timestamp-interval'60 minute'"}, function(err, data){
			console.log("emit update... puntos_luminarias")
			console.log(data)
		});
		client.query(getQuery["puntos_nagios"] + " WHERE {interval} < updated_at", {interval: "current_timestamp-interval'60 minute'"}, function(err, data){
			console.log("emit update... puntos_nagios")
			console.log(data)
		});
		client.query(getQuery["fracciones_estadistica"] + " WHERE {interval} < updated_at", {interval: "current_timestamp-interval'60 minute'"}, function(err, data){
			console.log("emit update... fracciones_estadistica")
			console.log(data)
		});		
	});
	client.connect()
}, 15000);