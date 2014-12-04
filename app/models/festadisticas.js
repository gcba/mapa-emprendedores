var mongoose = require('mongoose');
var config = require('../config');

//mongoose.connect(config.db.url || ('mongodb://' + config.db.host + '/'+ config.db.name));

// fracciones estadistica
var fracciones_estadistica =  new mongoose.Schema({
	cartodb_id : Number,
	cantidad_luminarias: Number,
	fraccion_id : String,
	porcentaje_sin_luz : Number,
	puntaje_ranking : Number,
	tiempo_sin_luz : Number,
	updated_at: {
		type: Date,
		index: {
			unique: false
		}
	}
});

var fracciones_estadistica = mongoose.model('fracciones_estadistica', fracciones_estadistica);

module.exports = fracciones_estadistica;