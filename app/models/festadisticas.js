var mongoose = require('mongoose');
var config = require('../config');

//mongoose.connect(config.db.url || ('mongodb://' + config.db.host + '/'+ config.db.name));
// fraccion_id,cantidad_luminarias,percentil_edad,percentil_pisos,porcentaje_sin_luz,tiempo_sin_luz,puntaje_ranking/
// fracciones estadistica
var fracciones_estadistica =  new mongoose.Schema({
	cartodb_id : Number,
	cantidad_luminarias: Number,
	percentil_edad: Number,
	percentil_pisos: Number,
	fraccion_id : String,
	porcentaje_sin_luz : Number,
	puntaje_ranking : Number,
	tiempo_sin_luz : Number,
	updated_at: Date
});

fracciones_estadistica.pre("save", function(next){
    var self = this;
    fracciones_estadistica.findOne({updated_at : this.updated_at}, 'updated_at', function(err, results) {
        if(err){
            next(err);
        } else if(results){
        	//console.log("ya existe")
			next(new Error("ya existe el objeto"));
        } else {
            next()
        }
    });
});

var fracciones_estadistica = mongoose.model('fracciones_estadistica', fracciones_estadistica);

module.exports = fracciones_estadistica;