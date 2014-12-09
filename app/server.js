//require('newrelic');

var express = require('express');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose')
var compression = require('compression');
var passport = require('passport');
var app = express();
var config = require('./config');
var flash    = require('connect-flash');
var session = require('express-session');
var server = http.createServer(app);
var io = require('socket.io').listen(server);

// models y connect db
// {auto_reconnect: true, poolSize: 20}
require('./lib/passport')(passport); 
mongoose.connect(config.db.url || ('mongodb://' + config.db.host + '/'+ config.db.name));
mongoose.set('debug', false)
// all environments
app.set('port', process.env.PORT || 3001);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
	secret: 'iloveslolololoylolololo',
    proxy: true,
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash()); 
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.favicon(__dirname + '/public/favicon.ico'));
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
//
app.use(compression({
    filter: function (req, res){
      return /json|text|javascript|css/.test(res.getHeader('Content-Type'));
    },
    level: 9,
    threshold: 2048
}));
// manejo de caida conexion con error 400
app.use(function(req, res){
	res.status(400);
	res.render('404');

});
// // manejo de caida conexion con error 500
app.use(function(error, req, res, next) {
	console.log(error);
	res.status(500);
	res.render('500');
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var initServices = function(){
    require('./services/socket.js')(io);
};

initServices();

// require rutas
require('./routes/routes.js')(app);

// inicio server
server.listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
