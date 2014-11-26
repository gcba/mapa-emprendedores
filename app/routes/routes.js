var passport = require('passport');
var CartoDB = require('cartodb');
var secret = require('../services/secrets.js');
var getStatus = require('../controllers/status');

module.exports = function(app){
	
	// GET home page.
	
	app.get('/', function(req, res) {
		res.render('login.ejs', { 
			message: req.flash('loginMessage') 
		});
	});

	// process the login form
	app.post('/', passport.authenticate('local-login', {
		successRedirect : '/index', // redirect to the secure profile section
		failureRedirect : '/', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	app.get('/index', isLoggedIn, function(req, res){
	  res.render('index', {
	  	title: 'Mapa de cortes de luz - v0.1',
	  });
	});

	/*
	 * GET mapa page.
	 */
	
	app.get('/algo', function(req, res){
	  res.render('algo', {
	  	title: 'Mapa de cortes de luz - v0.1',
	  });
	});
	
	/*
	*
	*/
	
	app.get('/mapa', isLoggedIn, function(req, res){
	  res.render('mapa', {
	  	title: 'Mapa de cortes de luz - v0.1',
	  });
	});

	/*
	 * API 
	 */

	app.get('/api', isLoggedIn, getStatus.All);
	app.get('/api/:start/:end', isLoggedIn, getStatus.rangeDates);
	app.get('/api/:id_calle', isLoggedIn, getStatus.getNagios);

}


// funcion que actua como mediadora de autentificacion para cada ruta

var isLoggedIn = function(req, res, next) {
	if (req.isAuthenticated())
		return next();

	res.redirect('/');
}