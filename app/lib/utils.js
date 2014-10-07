var _ = require('lodash')
  , request = require('superagent')
  , Q = require('q')
  , natural = require('natural')
  , removeDiacritics = require('diacritics').remove;

_.str = require('underscore.string');
_.mixin(_.str.exports());

var normalizador = null;
var tokenizer = new natural.WordTokenizer()
var setNorm = function(norm){
  normalizador = norm;
};

/*
 * Geocode normalized addresses
 */
var geocode = function(addr, callback){
  var deferred = Q.defer();
  var url = 'http://ws.usig.buenosaires.gob.ar/geocoder/2.2/geocoding/?';
  try{
    var calleCruce = addr.getCalleCruce();
    if(calleCruce){
      url +='cod_calle1=' + addr.getCalle().codigo + '&cod_calle2=' + calleCruce.codigo;
    } else {
      url +='cod_calle=' + addr.getCalle().codigo + '&altura=' + addr.getAltura();
    }
  } catch (e){
    deferred.reject(new Error(e));
  }
  request.get(url)
  .end(function(err, res){
    deferred.resolve(JSON.parse(res.text.replace(/[()]/g,'')));
  });
  return deferred.promise;
};

/*
 * Reverse Geocoding lat and long
 */
var reverseGeocoding = function(lat, lon, callback) {
  var deferred = Q.defer();
  try {
    var url = 'http://ws.usig.buenosaires.gob.ar/geocoder/2.2/reversegeocoding?';
    url += 'y=' + lat;
    url += '&x=' + lon;
    request.get(url)
    .end(function(err, res){
      result = res.text.replace(/[()]/g,'');
      if(result != 'ErrorCoordenadasErroneas' && !err){
        deferred.resolve(JSON.parse(result));
      }else{
        deferred.reject(new Error('ErrorCoordenadasErroneas'));
      }      
    });
  } catch (e){
    deferred.reject(new Error('ErrorNoPrevisto'));
  }
  return deferred.promise;
};

/*
 * Reverse Geocoding lat and long
 */
var datosUtiles = function(x, y, callback) {
  var deferred = Q.defer();
  try {
    var url = 'http://ws.usig.buenosaires.gob.ar/datos_utiles?';
    url += 'x=' + x;
    url += '&y=' + y;
    request.get(url)
    .end(function(err, res){
      var datos;
      try{
        datos = JSON.parse(res.text);
      }catch(e){
        deferred.reject(new Error('ErrorParsingDatosUtiles'));
      }
      deferred.resolve(datos);
    });
  } catch (e){
    deferred.reject(new Error('ErrorDatosUtiles'));
  }
  return deferred.promise;
};

/*
 * Get geo object from text with addresses
 */
var geoFromText = function(text) {
  var deferred = Q.defer();
  var geo = {};
  geo.coordinates = {};
  var addrs = normalizador.buscarDirecciones(text, 200);
  if(addrs){
    var address = addrs[0].match;
    geocode(address).then(function(coords){
      if(coords && coords!='ErrorParametrosIncorrectos'){
        geo.address = address.toString();
        geo.coordinates.custom = [coords.x, coords.y];
        datosUtiles(coords.x, coords.y).then(function(datos){
          try{
            geo.district = datos.comuna;
            geo.neighborhood = datos.barrio;
          }catch(e){
            deferred.reject(new Error('ErrorGeoFromText'));
          }
          deferred.resolve(geo);
        });
      }
    }).fail(function(err){
      deferred.reject(new Error(err));
    });
  };
  return deferred.promise;
};

/*
 * Get geo object from UTM coords
 */
var geoFromCoords = function(x, y) {
  var deferred = Q.defer();
  var geo = {};
  geo.coordinates = {};
  reverseGeocoding(x, y).then(function(door){
    if(door.puerta){
      geo.coordinates.custom = [door.puerta_x, door.puerta_y];
      geo.address = door.puerta;
      datosUtiles(door.puerta_x, door.puerta_y).then(function(datos){
        geo.district = datos.comuna;
        geo.neighborhood = datos.barrio;
        deferred.resolve(geo);
      });
    }
  }).fail(function(err){
    deferred.reject(new Error(err));
  });
  return deferred.promise;
};

/*
 * Get track of text
 */
var hasWords = function(text, words) {
  var text = removeDiacritics(text);
  var test_words = _.map(words, function(item){
    return removeDiacritics(_.str.trim(item.toLowerCase()));
  });
  for (var i = test_words.length - 1; i >= 0; i--) {
    if(new RegExp('\\b' + test_words[i] + '\\b').test(text)){
      return true
    }
  };

  return false;
};

/*
* Verify is user is on tweet
*/
var hasUser = function(user, follows) {
  return (follows.indexOf(user) !== -1);
};

module.exports.setNorm = setNorm;
module.exports.geocode = geocode;
module.exports.reverseGeocoding = reverseGeocoding;
module.exports.datosUtiles = datosUtiles;
module.exports.geoFromCoords = geoFromCoords;
module.exports.geoFromText = geoFromText;
module.exports.hasWords = hasWords;
module.exports.hasUser = hasUser;