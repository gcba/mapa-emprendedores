var mongoose = require('mongoose');
var config = require('../config');

//mongoose.connect(config.db.url || ('mongodb://' + config.db.host + '/'+ config.db.name));

// puntos luminarias
var informantes = new mongoose.Schema({
	cartodb_id : Number,
	descripcion : Date,
	fecha_actualizacion : Date,
	fecha_alta : Date,
	id_ubicacion : Number,
	lat : Number,
	long : Number,
	titulo: String,
	ubicacion: String,
	ultimo_estado: Number,
	user_id : Number,
	updated_at: Date
});

informantes.pre("save", function(next){
    var self = this;
    informantes.findOne({updated_at : this.updated_at}, 'updated_at', function(err, results) {
        if(err){
            next(err);
        } else if(results){
        	//console.log("ya existe")
        	//next(new Error("ya existe el objeto"));
        	next()	
        } else {
            next()
        }
    });
});

var informantes = mongoose.model('informantes', informantes);

module.exports = informantes;