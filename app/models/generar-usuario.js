var mongoose = require('mongoose')
var config = require('../config')
, User = require('./user');

// CONEXION LOCAL
mongoose.connect(config.db.url || ('mongodb://' + config.db.host + '/'+ config.db.name));

// CONEXION A MONGOLAB
//mongoose.connect("mongodb://factorialabgcba:thelabrocks123@ds043180.mongolab.com:43180/visualizacion-cucc");

/*
	ASIGNAMOS USUARIO CON, EMAIL Y PASSWORD
*/

var EMAIL = "soporte@mapacucc.com"
var PASSWORD = "mapacucc"


var newUser = new User();
newUser.local.email = EMAIL;
newUser.local.password = newUser.generateHash(PASSWORD);
newUser.save(function(err, result, otro) {
 	if (err){
 		return console.log(err);
 	} else {
 		console.log("usuario creado" + result)
 	}
 	mongoose.disconnect();
});