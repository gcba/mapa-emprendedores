var Segmentos = require('../models/dump');
var FormatDate = require('../services/formatdate');


// extraigo todos los segmentos de la base de datos, que esten "prendidos con status:1"
exports.All = function(req, res) {
	Segmentos.find({ status: "1" }, function(err, segmentos) {
		if (err)
			res.send(err);

		res.json(segmentos);
	});
}

// extraigo todos los segmentos de la base de datos, que correspondan a un rango de fecha dado, con start y end"
exports.rangeDates = function(req, res) {
	var start = FormatDate(req.params.start)
	var end = FormatDate(req.params.end)
	Segmentos.find({updated_at: {$gte: start, $lte: end}},  function(err, segmentos) {
		if (err)
			res.send(err);

		res.json(segmentos);
	});	
}

// extraigo todos los segmentos de la base de datos, que correspondan a un id correspondiente"
exports.getCalle = function(req, res) {
	console.log(req.params.id_calle)
	Segmentos.find({ id_calle: req.params.id_calle },  function(err, segmentos) {
		if (err)
			res.send(err);

		res.json(segmentos);
	});
}