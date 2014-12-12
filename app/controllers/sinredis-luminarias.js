//var Nagios = require('../models/nagios');
var fspath = require('path');
var FormatDate = require('../services/formatdate');
var Luminarias = require('../models/luminarias');
var fs = require('fs');

// extraigo todos los segmentos de la base de datos, que esten "prendidos con status:1"
exports.getall = function(req, res) {
	Luminarias.find({ status: "1" }, function(err, luminarias) {
		if (err)
			res.send(err);

		res.json(luminarias);
	});
}

var build_str = function(){
	str = "";
	str += "id_fraccion";
	str += "; " + "status";
	str += "; " + "lat";
	str += "; " + "long";
	str += "; " + "external_id";
	str += "; " + "tiempo_sin_luz";
	str += "; " + "cartodb_id";
	str += "; " + "updated_at";
	str += "\n";
}

// example  http://localhost:3001/api/2014-12-01T20:45:19.0Z/2014-12-01T20:45:23.0Z
exports.rangofecha = function(req, res) {
	var start = FormatDate(req.params.start)
	var end = FormatDate(req.params.end)
	var name = new Date(start).toJSON() +"__"+ new Date(end).toJSON() + ".csv"
	//var pathsavefile = fspath.dirname(__dirname) + "/cachefiles/" + name;
	var pathsavefile = __dirname + "/" + name
	console.log(start)
	console.log(end)
	console.log(pathsavefile)
	Luminarias.find({updated_at: {$gte: start, $lte: end}},  function(err, luminarias) {
		build_str()
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
		var buffstr = new Buffer(str);
		fs.writeFile(pathsavefile, buffstr, {encoding: 'utf8'}, function(err){
			if (err) throw err;
			console.log('It\'s saved! en ' + pathsavefile);
			res.send(pathsavefile);
		});
	});
	//res.header('Content-type', 'text/csv');
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