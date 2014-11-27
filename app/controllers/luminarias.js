//var Nagios = require('../models/nagios');
var FormatDate = require('../services/formatdate');
var Luminarias = require('../models/luminarias');
var redis = require('redis');
var redisClient = redis.createClient(7379, "127.0.0.1", {detect_buffers: true});

/*
	modulo para 
	incorpor servidor cache de consultas
	primero se intenta extraer la consulta en redis, sino esta, se consulta en mongodb y se guarda en redis
*/

// extraigo todos los nagios de la base de datos, que esten "prendidos con status:1"
exports.getall = function(req, res) {
	Luminarias.find({ status: "1" }, function(err, luminarias) {
		if (err)
			res.send(err);

		res.json(luminarias);
	});
}

// extraigo todos los nagios de la base de datos, que correspondan a un rango de fecha dado, con start y end"
exports.rangofecha = function(req, res) {
	var start = FormatDate(req.params.start)
	var end = FormatDate(req.params.end)
	var savequery = start+end
	//consulto en redis , si la consulta hecha ya esta cacheada
	redisClient.get(savequery, function(err, cacheluminarias){
		if(cacheluminarias){
			//si esta, devuelvo en formato json
			console.log("cache-redis")
			return res.json(JSON.parse(cacheluminarias))
		} else {
			// sino esta, la extraigo de mongo
			Luminarias.find({updated_at: {$gte: start, $lte: end}},  function(err, luminarias) {
				if (err)
					res.send(err);
				// guardo la consulta en cache y la devuelvo en formato json
				redisClient.set(savequery, JSON.stringify(luminarias))
				res.json(luminarias);
			});	
		}
	});
}

// extraigo todos los nagios de la base de datos, que correspondan a un id correspondiente"
exports.idfraccion = function(req, res) {
	console.log(req.params.idfraccion)
	var idfraccion = req.params.idfraccion;
	//consulto en redis , si la consulta hecha ya esta cacheada
	redisClient.get(idfraccion, function(err, cachefraccion){
		if(cachefraccion){
			//si esta, devuelvo en formato json
			console.log("cache-redis")
			return res.json(JSON.parse(cachefraccion))
		} else {
			// sino esta, la extraigo de mongo
			Luminarias.find({ id_fraccion: idfraccion },  function(err, luminarias) {
				if (err)
					res.send(err);
				// guardo la consulta en cache y la devuelvo en formato json
				redisClient.set(idfraccion, JSON.stringify(luminarias))
				res.json(luminarias);
			});
		}
	})
}