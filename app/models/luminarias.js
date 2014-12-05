var mongoose = require('mongoose');
var config = require('../config');

//mongoose.connect(config.db.url || ('mongodb://' + config.db.host + '/'+ config.db.name));

// puntos luminarias
var puntos_luminarias = new mongoose.Schema({
	id_fraccion : String,
	status : String,
	lat: Number,
	long: Number,
	external_id : String,
	tiempo_sin_luz : Number,
	cartodb_id: Number,
	updated_at: Date
});

puntos_luminarias.pre("save", function(next){
    var self = this;
    puntos_luminarias.findOne({updated_at : this.updated_at}, 'updated_at', function(err, results) {
        if(err){
            next(err);
        } else if(results){
        	//console.log("ya existe")
        	next();
        } else {
            next()
        }
    });
});


var puntos_luminarias = mongoose.model('puntos_luminarias', puntos_luminarias);

module.exports = puntos_luminarias;