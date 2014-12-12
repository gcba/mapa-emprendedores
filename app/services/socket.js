// api key para conectarme a cartodb
var config = require('../config.json');
var FormatDate = require('./formatdate');
var Luminarias = require('../models/luminarias');
var Report = require('../models/report');

// defino los tipos de intervalos
const unahora = 3600000;
const mediahora = 1800000;
const quincemin = 900000;
const cincomin = 300000;

var calinterval = function(min){
	return min * 60  * 1000
}

const interval = calinterval(config.interval);

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

var emit_hr = function(socket){
	var hr = new Date().toLocaleString()
	console.log(hr.toLocaleString())
	socket.emit("time", hr);
}

var filterLuz = function(socket, data){
	var len = data.rows.length;
	var send = []
	socket.emit("time", new Date().toLocaleString())
	if (len>0){
		for (var i=0; i<len ;i++){
			var newdata = {};
			if(data.rows[i].status == 0){
				//console.log(data.rows[i])
				newdata['id_fraccion'] = data.rows[i].id_fraccion
				newdata['status'] = data.rows[i].status
				newdata['tiempo_sin_luz'] = data.rows[i].tiempo_sin_luz
				send.push(newdata)
			}
		}						
		socket.emit("update", send)
	} else {
		socket.emit("update", "segmentos no actualizados")
	}
}

module.exports = function(io) {
	io.sockets.on('connection', function(socket){
		console.log("lolo connect");
		socket.emit('connected');
		setInterval(function(){
			Luminarias.find({ status: "0" }, function(err, data) {
				if (err)
					res.send(err);
				filterLuz(socket, data)
			});
		}, calinterval(70));
	})
}
