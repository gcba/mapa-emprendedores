var CartoDB = require('cartodb');
var secret = require('./secrets.js');
var savefile = require('fs').createWriteStream(__dirname + '/result-query.json');
var Segmentos = require('../models/dump');
var Report = require('../models/report');

// intervalo cada 70 minutos
const interval = 7000000;
const interval2 = 4000000;

var client = new CartoDB({
	user:secret.user,
	api_key:secret.api_key
});

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

var forEach = function(data, cb){
	len = data.total_rows
	if (len >= 1){
		for (var i = 0;i<len;i++){
			cb(data.rows[i])
		}
	} 
}

module.exports = function(io) {
	io.debug = false;
	io.sockets.on('connection', function(socket){
		socket.emit('connected');
		setInterval(function(){
			//var hr = new Date()
			//console.log(hr.toLocaleString())
			//socket.emit("time", hr);
			client.on('connect', function(){
				client.query("SELECT id_calle, status, updated_at FROM status_luminarias WHERE {interval} < updated_at", {interval: "current_timestamp-interval'60 minute'"}, function(err, data){
					//console.log("emit update...")
					if (err){
						report(socket, err);
					} else {
						forEach(data, function(elem){
							SegDump = new Segmentos({
								"id_calle":  elem.id_calle,
								"status": elem.status,
								"updated_at": new Date(elem.updated_at).toISOString()
							}).save()
						})
					}
					socket.emit("update", data);
					//console.log("updated emited");
				});
			});
			client.connect()
			console.log("lleno con datos")
		}, (1000 * 60) * 10);
	});
}