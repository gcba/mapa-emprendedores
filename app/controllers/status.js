var Segmentos = require('../models/dump');

exports.All = function(req, res) {
	Segmentos.find({ status: "1" }, function(err, segmentos) {
		if (err)
			res.send(err);

		res.json(segmentos);
	});
}


// Mongoose: estadosegmentos.find({ updated_at: { '$gte': new Date("Thu, 06 Nov 2014 16:00:00 GMT"), '$lte': new Date("Thu, 06 Nov 2014 17:30:00 GMT") } }) { fields: undefined }  

var formatToLocalTimeDate = function(inDate) {
	var today = new Date();
	var inDateMod = new Date(inDate);
	offSet = today.getTimezoneOffset();
	if(offSet < 0) {
		inDateMod.setMinutes(inDateMod.getMinutes()+offSet );
	} else {
		inDateMod.setMinutes(inDateMod.getMinutes()-offSet);
	}
	return inDateMod;
}

exports.rangeDates = function(req, res) {
	var start = formatToLocalTimeDate(req.params.start)
	var end = formatToLocalTimeDate(req.params.end)
	Segmentos.find({updated_at: {$gte: start, $lte: end}},  function(err, segmentos) {
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