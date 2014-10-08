var express = require('express');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose')
var compression = require('compression');
var passport = require('passport');
var app = express();
var config = require('./config');
var memwatch = require('memwatch');
var flash    = require('connect-flash');
var session = require('express-session');
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var normalizador = require('./lib/normalizador.js').init({ lazyDataLoad: false, aceptarCallesSinAlturas: false, callesEnMinusculas: true});
var pubsub = require('./lib/pubsub').pubsub;
var Email = require('./services/email.js')(normalizador);

// models y connect db
require('./lib/passport')(passport); // pass passport for configuration
require('./models')()

var Report = mongoose.model('Report')
  , Taxonomy = mongoose.model('Taxonomy');

mongoose.connect(config.db.url || ('mongodb://' + config.db.host + '/'+ config.db.name));

// all environments
app.set('port', process.env.PORT || 3001);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.favicon(__dirname + '/public/favicon.ico'));
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);


app.use(compression({
    filter: function (req, res) {
      return /json|text|javascript|css/.test(res.getHeader('Content-Type'));
    },
    level: 9
}));

// manejo de caida conexion
app.use(function(req, res) {
	res.status(400);
	res.render('404');
});
app.use(function(error, req, res, next) {
	console.log(error);
	res.status(500);
	res.render('500');
});



// require parser
require('./lib/parser')(normalizador);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// inicio servicios
var initServices = function(){
	require('./services/socket.js')(io);
 	services = {
    //'Twitter': Twitter,
    'Email': Email
  	};
	Object.keys(services).forEach(function(key) {
		services[key].start();
	});
};

initServices();

// listen leak memory
memwatch.on('leak', function(info) {
  console.log(info);
});

// require rutas
require('./routes/routes.js')(app);

// inicio server
server.listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});