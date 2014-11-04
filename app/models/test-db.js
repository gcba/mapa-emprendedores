var mongoose = require('mongoose')
var config = require('../config')
, Segmentos = require('./dump')
, User = require('./user');

mongoose.connect(config.db.url || ('mongodb://' + config.db.host + '/'+ config.db.name));
//mongoose.connect("mongodb://factorialabgcba:thelabrocks123@ds043180.mongolab.com:43180/visualizacion-cucc");

//module.exports = function(mongoose){

// var newUser = new User();
// newUser.local.email = "lm@email.com";
// newUser.local.password = newUser.generateHash("password");
// newUser.save(function(err) {
//     if (err)
//         return console.log(err);
//     mongoose.disconnect();
// });

// var info = new dump({
// 	id: "C",
// 	status: "B",
// 	updated_at: "D",
// }).save();

// db.estadosegmentos2.find({"updated_at": {$gt: "2014-11-03T14:02:20.000Z", $lt: "2014-11-03T15:03:20.000Z"}})
// Segmentos.find({"update_at": {$lte:new Date("2014-11-03T16:31:04.0Z").toISOString()}},  function(err, segmentos) {

// db.estadosegmentos.find({"updated_at": {"$gt": ISODate("2014-10-29T15:30:56Z"), "$lt": ISODate("2014-10-29T18:01:05Z")}})
// 301020141156 301020141156
// formatting de las fechas , de ISO a una normal
//
// "Thu Oct 30 2014 14:45:38 GMT-0300 (ART)"
// db.estadosegmentos.find({"updated_at": {$gt: "Thu Oct 30 2014 14:45:38 GMT-0300 (ART)", $lt: "Thu Oct 30 2014 16:00:52 GMT-0300 (ART)"}})

var start = new Date("2014-11-03T19:30:35.0Z").toISOString()
var end = new Date("2014-11-03T21:31:34.0Z").toISOString()

Segmentos.find({updated_at: {$gte: start, $lte: end}},  function(err, segmentos) {
	if (err)
		console.log("err")

	console.log(segmentos);
});


// Segmentos.where('update_at').gte('2014-11-03T14:02:20.000Z').lte("2014-11-03T15:03:20.000Z").exec(function(err, segmentos){
// 	if (err)
// 		console.log("err")

// 	console.log(segmentos);
// });