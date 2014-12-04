var mongoose = require('mongoose');
var config = require('../config');

//mongoose.connect(config.db.url || ('mongodb://' + config.db.host + '/'+ config.db.name));

// puntos luminarias
var informantes = new mongoose.Schema({
	cartodb_id : Number,
	descripcion : Date,
	fecha_actualizacion : Date,
	fecha_alta : Date,
	id_ubicacion : Number,
	lat : Number,
	long : Number,
	titulo: String,
	ubicacion: String,
	ultimo_estado: Number,
	user_id : Number,
	updated_at: {
		type: Date,
		index: {
			unique: true
		}
	}
});


var informantes = mongoose.model('informantes', informantes);

module.exports = informantes;