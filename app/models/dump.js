var mongoose = require('mongoose');
var config = require('../config');

//mongoose.connect(config.db.url || ('mongodb://' + config.db.host + '/'+ config.db.name));

var estadosegmentos =  new mongoose.Schema({
	id_calle: String,
	status: String,
	updated_at: Date
});

var estadosegmentos = mongoose.model('estadosegmentos4', estadosegmentos);

module.exports = estadosegmentos;