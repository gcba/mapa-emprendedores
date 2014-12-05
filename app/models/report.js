var mongoose = require('mongoose');
var config = require('../config');

//mongoose.connect(config.db.url || ('mongodb://' + config.db.host + '/'+ config.db.name));

// modelo para guardar los errores que puede generar cartodb, con fecha ocasionado
var report =  new mongoose.Schema({
	type: String,
	updated_at: {
		type: Date,
		index: {
			unique: true
		}
	}
});

var report = mongoose.model('reporterror', report);

module.exports = report;