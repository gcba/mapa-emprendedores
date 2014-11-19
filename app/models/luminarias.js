var mongoose = require('mongoose');
var config = require('../config');

//mongoose.connect(config.db.url || ('mongodb://' + config.db.host + '/'+ config.db.name));

// puntos luminarias
var puntos_luminarias = new mongoose.Schema({
	cartodb_id : Number,
	external_id : String,
	fraccion_id : String,
	status : Number,
	tiempo_sin_luz : Number,
	updated_at : Date
});


var puntos_luminarias = mongoose.model('puntos_luminarias', puntos_luminarias);

module.exports = puntos_luminarias;