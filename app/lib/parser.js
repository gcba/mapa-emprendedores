var _ = require('lodash')
  , mongoose = require('mongoose')
  , config = require('../config.json')
  , pubsub = require('../lib/pubsub').pubsub
  , utils = require('../lib/utils.js');

var Taxonomy = mongoose.model('Taxonomy');

var Parser = function(normalizador){
  
  var self = this;
  self.normalizador = normalizador;  

  utils.setNorm(normalizador);

  self.received = function(report){
    console.log(report.text);
    self.parse(report, geolocalize, classify, saveReport);
  };

  self.parse = function(rp){
    var callbacks = [];
    var args = [].slice.call(arguments, 1);
    for (var i = 0; i < args.length; ++i) {
      callbacks.push(self.middleware(args[i]));
    }
    i = 0;
    function next() {
      var fn = callbacks[i++];
      if (fn) fn(rp, next);
    }
    next();
  };

  self.middleware = function(fn){
    var self = this;
    return function(rp, next){
      return fn(rp, next);
    };
  };

  self.saveReport = function(rp, next){
    console.log(rp);
    if(rp && rp.geo.coordinates.custom){
      rp.save(function(err, rp){
        pubsub.emit('reports.saved', rp);
        next();
      });
    }else{
      next();
    }
  };

  self.geolocalize = function(rp, next) {
    if (rp.geo.coordinates.utm.length || rp.geo.coordinates.custom.length){
      var coords = (rp.geo.coordinates.utm.length)? rp.geo.coordinates.utm : rp.geo.coordinates.custom;
      utils.geoFromCoords(coords[1], coords[0]).then(function(geo){
        rp.geo = geo;     
        next();
      }).fail(function (error) {
        console.log("error geolocalize")
        console.log(error);
      });
    } else{
      utils.geoFromText(rp.text).then(function(geo){
        rp.geo = geo;
        next();
      }).fail(function (error) {
        console.log("error geolocalize 2")
        console.log(error);
      });
    }
  };

  self.classify = function(rp, next){
    Taxonomy.find({}, function(err, txs){
      _.each(txs, function(tx){
        if(utils.hasWords(rp.text, tx.keywords) && !utils.hasWords(rp.text, tx.banned)){
          rp.taxonomies.push(tx._id);
        }
      });
      if(rp.taxonomies.length){
        next();
      }      
    });
  };
  pubsub.on('reports.received', received);
};

_.extend(Parser.prototype, {

});

module.exports = Parser;
