var Segmentos = require('../models/dump');

exports.All = function(req, res) {
	Segmentos.find({ status: "1" }, function(err, segmentos) {
		if (err)
			res.send(err);

		res.json(segmentos);
	});
}


// Mongoose: estadosegmentos.find({ updated_at: { '$gte': new Date("Thu, 06 Nov 2014 16:00:00 GMT"), '$lte': new Date("Thu, 06 Nov 2014 17:30:00 GMT") } }) { fields: undefined }  


exports.rangeDates = function(req, res) {
	console.log(req.params.start)
	console.log(req.params.end)
	Segmentos.find({updated_at: {$gte: req.params.start, $lte: req.params.end}},  function(err, segmentos) {
		if (err)
			res.send(err);

		res.json(segmentos);
	});	
}

exports.getCalle = function(req, res) {
	console.log(req.params.id_calle)
	Segmentos.find({ id_calle: req.params.id_calle },  function(err, segmentos) {
		if (err)
			res.send(err);

		res.json(segmentos);
	});
}