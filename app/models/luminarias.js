var mongoose = require('mongoose');
var config = require('../config');

//mongoose.connect(config.db.url || ('mongodb://' + config.db.host + '/'+ config.db.name));

// puntos luminarias
var puntos_luminarias = new mongoose.Schema({
	id_fraccion : String,
	status : String,
	lat: Number,
	long: Number,
	external_id : String,
	tiempo_sin_luz : Number,
	cartodb_id: Number,
	updated_at: Date
});


var puntos_luminarias = mongoose.model('puntos_luminarias', puntos_luminarias);

module.exports = puntos_luminarias;