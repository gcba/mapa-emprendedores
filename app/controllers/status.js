var Segmentos = require('../models/dump');

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

estadosegmentos4.find({ updated_at: { '$gte': new Date("Mon, 03 Nov 2014 20:45:24 GMT"), '$lte': new Date("Mon, 03 Nov 2014 23:45:23 GMT") } }) { fields: undefined }  

estadosegmentos4.find({ updated_at: { '$gte': new Date("Fri, 07 Nov 2014 02:30:00 GMT"), '$lte': new Date("Wed, 05 Nov 2014 23:00:00 GMT") } }) { fields: undefined }  

exports.rangeDates = function(req, res) {
	console.log(req.params.start)
	console.log(req.params.end)
	var start = new Date(req.params.start).toISOString()
	var end = new Date(req.params.end).toISOString()
	console.log(start)
	console.log(end)
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