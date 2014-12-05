var CartoDB = require('cartodb');

var client = new CartoDB({
	user:"baemprende",
	api_key:"f2d531bee1002c47a2bcc52f2262c3c28d6ef311"
});

var calinterval = function(min){
	return min * 60  * 1000
}

     // { id_fraccion: '002_21',
     //   status: 1,
     //   lat: -34.593949,
     //   long: -58.41006633,
     //   external_id: 'SL-DUMMY_SC-m/mansilla 3096 40p30',
     //   tiempo_sin_luz: 0,
     //   the_geom: '0101000020E61000003745B20D7D344DC0F73E5585064C41C0',
     //   cartodb_id: 42928,
     //   created_at: '2014-11-27T14:23:13Z',
     //   updated_at: '2014-11-27T14:23:13Z',
     //   the_geom_webmercator: '0101000020110F000075E0D3B5C8CD58C1DB95ED3712594FC1' } ],



var getQuery = {
	"puntos_nagios": "SELECT id_nagio, status, updated_at FROM puntos_nagios ",
	"puntos_luminarias" : "SELECT id_fraccion, status, lat, long, external_id, tiempo_sin_luz, updated_at FROM status_luminarias ",
	"fracciones_estadistica" : "SELECT cartodb_id, cantidad_luminarias, fraccion_id, porcentaje_sin_luz, puntaje_ranking, tiempo_sin_luz, updated_at FROM fracciones_estadistica ",
	"status_informantes":"SELECT * FROM status_informantes "
}

var rowsLength = function(err, data) {
  console.log(data.rows.length);
};

 var asd = function(err, data){
	console.log("emit update... puntos_luminarias")
	var len = data.rows.length;
	console.log(len)
	//console.log(data)
	for(var i=0;i<len;i++){
		if(data.rows[i].status == "i"){
			console.log(data.rows[i])
			// 'CastError: Cast to number failed for value "i" at path "status'
		}
	}
}

setInterval(function(){
	client.on('connect', function(){
		client
			.query(getQuery["puntos_luminarias"] + " WHERE {interval} < updated_at", {interval: "current_timestamp-interval'60 minute'"}, rowsLength)
			.query(getQuery['fracciones_estadistica'] + " WHERE {interval} < updated_at", {interval: "current_timestamp-interval'60 minute'"}, rowsLength)
			.query(getQuery['puntos_nagios'] + " WHERE {interval} < updated_at", {interval: "current_timestamp-interval'60 minute'"}, rowsLength)
	});
	client.connect()
}, calinterval(5));