//var Nagios = require('../models/nagios');
var FormatDate = require('../services/formatdate');
var Festadisticas = require('../models/festadisticas');
var redis = require('redis');
var redisClient = redis.createClient(7379, "127.0.0.1", {detect_buffers: true});

exports.filtroestadisticas = function(req, res) {
	var start = FormatDate(req.params.start)
	var end = FormatDate(req.params.end)
	var savequery = req.params.fraccion_id+start+end
	redisClient.get(savequery, function(err, cachefracciones){
		if(cachefracciones){
			//si esta, devuelvo en formato json
			console.log("cache-redis")
			return res.json(JSON.parse(cachefracciones))
		} else {
			Festadisticas.find({fraccion_id:req.params.fraccion_id, updated_at: {$gte: start, $lte: end}}, function(err, fracciones){
				if (err)
					res.send(err);

				redisClient.set(savequery, JSON.stringify(fracciones))
				res.json(fracciones);
			});
		}
	})
}