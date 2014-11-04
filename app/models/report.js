var mongoose = require('mongoose');
var config = require('../config');

//mongoose.connect(config.db.url || ('mongodb://' + config.db.host + '/'+ config.db.name));

var report =  new mongoose.Schema({
	type: String,
	updated_at: Date
});

var report = mongoose.model('reporterror', report);

module.exports = report;