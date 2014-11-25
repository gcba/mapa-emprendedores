var mongoose = require('mongoose');
var config = require('../config');

//mongoose.connect(config.db.url || ('mongodb://' + config.db.host + '/'+ config.db.name));

// puntos luminarias
var informantes = new mongoose.Schema({
	cartodb_id : Number,
	descripcion : String,
	fecha_actualizacion : Date,
	fecha_alta : Date,
	id_ubicacion : Number,
	lat : Number,
	long : Number,
	titulo: String,
	ubicacion: String,
	ultimo_estado: String,
	user_id : Number,
	created_at: Date,
	// updated_at: Date
});


var informantes = mongoose.model('informantes', informantes);

module.exports = informantes;