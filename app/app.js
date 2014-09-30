
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var CartoDB = require('cartodb');
var secret = require('./secrets.js');

var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon(__dirname + '/public/favicon.ico'));
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);

app.use(express.static(path.join(__dirname, 'public')));

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

app.get('/', routes.index);

var client = new CartoDB({
	user:secret.user,
	api_key:secret.api_key
});

var change = function(rows){
	var len = rows.length;
	var prendidos = [];
	for(var i=0;i<len;i++){
		if (rows[i].status == 1){
			prendidos.push(rows[i])
		}
	}
	return prendidos;
}

io.sockets.on('connection', function(socket){
	socket.emit('connected');
	setInterval(function(){
		client.on('connect', function(){
			client.query("SELECT * FROM campanas_colocadas", function(err, data){
				console.log("emit update...");
				socket.emit("update", change(data.rows));
				console.log("updated emited");
			});
		});
		client.connect()
		//client.pipe(file)
	}, 30000);
});

server.listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});