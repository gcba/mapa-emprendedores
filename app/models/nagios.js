var mongoose = require('mongoose');
var config = require('../config');

//mongoose.connect(config.db.url || ('mongodb://' + config.db.host + '/'+ config.db.name));

// puntos nagios
var puntos_nagios =  new mongoose.Schema({
	id_nagio: Number,
	status: Number,
	updated_at: Date,
	lat : Number,
	long : Number
});

var puntos_nagios = mongoose.model('puntos_nagios', puntos_nagios);

module.exports = puntos_nagios;