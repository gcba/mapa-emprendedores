var Segmentos = require('../models/dump');
var FormatDate = require('../services/formatdate');
var redis = require('redis');
var redisClient = redis.createClient(6379, "127.0.0.1", {detect_buffers: true});

/*
	modulo para 
	incorpor servidor cache de consultas
	primero se intenta extraer la consulta en redis, sino esta, se consulta en mongodb y se guarda en redis
*/

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
	var savequery = start+end
	//consulto en redis , si la consulta hecha ya esta cacheada
	redisClient.get(savequery, function(err, cachesegmentos){
		if(cachesegmentos){
			//si esta, devuelvo en formato json
			console.log("cache-redis")
			return res.json(JSON.parse(cachesegmentos))
		} else {
			// sino esta, la extraigo de mongo
			Segmentos.find({updated_at: {$gte: start, $lte: end}},  function(err, segmentos) {
				if (err)
					res.send(err);
				// guardo la consulta en cache y la devuelvo en formato json
				redisClient.set(savequery, JSON.stringify(segmentos))
				res.json(segmentos);
			});	
		}
	});
}

// extraigo todos los segmentos de la base de datos, que correspondan a un id correspondiente"
exports.getCalle = function(req, res) {
	console.log(req.params.id_calle)
	var idcalle = req.params.id_calle;
	//consulto en redis , si la consulta hecha ya esta cacheada
	redisClient.get(idcalle, function(err, cachecalle){
		if(cachecalle){
			//si esta, devuelvo en formato json
			console.log("cache-redis")
			return res.json(JSON.parse(cachecalle))
		} else {
			// sino esta, la extraigo de mongo
			Segmentos.find({ id_calle: idcalle },  function(err, infocalle) {
				if (err)
					res.send(err);
				// guardo la consulta en cache y la devuelvo en formato json
				redisClient.set(idcalle, JSON.stringify(infocalle))
				res.json(infocalle);
			});
		}
	})
}