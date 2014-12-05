var mongoose = require('mongoose');
var config = require('../config');

//mongoose.connect(config.db.url || ('mongodb://' + config.db.host + '/'+ config.db.name));

// puntos nagios
var puntos_nagios =  new mongoose.Schema({
	id_nagio: Number,
	status: Number,
	updated_at: Date,
	lat : Number,
	long : Number
});

puntos_nagios.pre("save", function(next){
    var self = this;
    puntos_nagios.findOne({updated_at : this.updated_at}, 'updated_at', function(err, results) {
        if(err){
            next(err);
        } else if(results){
        	//console.log("ya existe")
        	//next(new Error("no guardar nada"));
        	next()
        } else {
            next()
        }
    });
});

var puntos_nagios = mongoose.model('puntos_nagios', puntos_nagios);

module.exports = puntos_nagios;