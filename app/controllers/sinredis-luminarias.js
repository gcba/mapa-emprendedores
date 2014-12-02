//var Nagios = require('../models/nagios');
var FormatDate = require('../services/formatdate');
var Luminarias = require('../models/luminarias');

// extraigo todos los segmentos de la base de datos, que esten "prendidos con status:1"
exports.getall = function(req, res) {
	Luminarias.find({ status: "1" }, function(err, luminarias) {
		if (err)
			res.send(err);

		res.json(luminarias);
	});
}

exports.rangofecha = function(req, res) {
	var start = FormatDate(req.params.start)
	var end = FormatDate(req.params.end)
	console.log(start)
	console.log(end)
	Luminarias.find({updated_at: {$gte: start, $lte: end}},  function(err, luminarias) {
		str = "";
		if (err)
			res.send(err);
		luminarias.forEach(function(lumi){
			str += lumi.id_fraccion;
			str += "; " + lumi.status;
			str += "; " + lumi.lat; 
			str += "; " + lumi.long;
			str += "; " + lumi.external_id;
			str += "; " + lumi.tiempo_sin_luz;
			str += "; " + lumi.cartodb_id;
			str += "; " + lumi.updated_at;
			str += "\n"; 
		});
		//console.log(str);
		res.header('Content-type', 'text/csv');
		res.send(str);
		str = "";
	});	
}

// extraigo todos los luminarias de la base de datos, que correspondan a un id correspondiente"
exports.idfraccion = function(req, res) {
	console.log(req.params.fraccion_id)
	Luminarias.find({ fraccion_id: req.params.fraccion_id },  function(err, luminarias) {
		if (err)
			res.send(err);

		res.json(luminarias);
	});
}