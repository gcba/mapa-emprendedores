
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes/routes.js');
var http = require('http');
var path = require('path');
var compression = require('compression');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var normalizador = require('./lib/normalizador.js').init({ lazyDataLoad: false, aceptarCallesSinAlturas: false, callesEnMinusculas: true});
var pubsub = require('./lib/pubsub').pubsub;
var Email = require('./services/email.js')(normalizador);

// all environments
app.use(compression());
app.use(express.static(path.join(__dirname, 'public')));
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon(__dirname + '/public/favicon.ico'));
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.compress({
    filter: function (req, res) {
      return /json|text|javascript|css/.test(res.getHeader('Content-Type'));
    },
    level: 9
}));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// routas y socket
app.get('/', routes.index);
app.get('/mapa', routes.mapa);
require('./services/socket.js')(io);
Email.start();


server.listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});