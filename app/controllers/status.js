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

//start  "2014-11-03T19:30:35.0Z"
//end "2014-11-03T21:31:34.0Z"
// 2014-11-20T03:00:00.000Z 
// 2014-11-30T02:59:00.000Z 

//estadosegmentos4.find({ updated_at: { '$gte': new Date("Mon, 03 Nov 2014 20:45:24 GMT"), '$lte': new Date("Mon, 03 Nov 2014 23:45:23 GMT") } }) { fields: undefined }  

//estadosegmentos4.find({ updated_at: { '$gte': new Date("Fri, 07 Nov 2014 02:30:00 GMT"), '$lte': new Date("Wed, 05 Nov 2014 23:00:00 GMT") } }) { fields: undefined }  

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