//var Nagios = require('../models/nagios');
var FormatDate = require('../services/formatdate');
var Luminarias = require('../models/luminarias');

// extraigo todos los segmentos de la base de datos, que esten "prendidos con status:1"
exports.All = function(req, res) {
	Luminarias.find({ status: "1" }, function(err, luminarias) {
		if (err)
			res.send(err);

		res.json(luminarias);
	});
}

exports.rangeDates = function(req, res) {
	var start = FormatDate(req.params.start)
	var end = FormatDate(req.params.end)
	Luminarias.find({updated_at: {$gte: start, $lte: end}},  function(err, luminarias) {
		if (err)
			res.send(err);

		res.json(luminarias);
	});	
}

// extraigo todos los luminarias de la base de datos, que correspondan a un id correspondiente"
exports.getNagios = function(req, res) {
	console.log(req.params.fraccion_id)
	Luminarias.find({ fraccion_id: req.params.fraccion_id },  function(err, luminarias) {
		if (err)
			res.send(err);

		res.json(luminarias);
	});
}