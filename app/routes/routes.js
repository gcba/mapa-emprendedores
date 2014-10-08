var ReportCtrl = require('../controllers/report.js');
var TaxonomyCtrl = require('../controllers/taxonomy.js');
var passport = require('passport');

module.exports = function(app){
	
	// GET home page.
	

	app.get('/', function(req, res) {
		res.render('login.ejs', { message: req.flash('loginMessage') });
	});

	// process the login form
	app.post('/', passport.authenticate('local-login', {
		successRedirect : '/index', // redirect to the secure profile section
		failureRedirect : '/', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	app.get('/index', isLoggedIn, function(req, res){
	  res.render('index', {
	  	h1: 'App - Real Time, Campanas.',
	  	title: 'App - Real Time, Campanas.',
	  });
	});

	/*
	 * GET mapa page.
	 */

	app.get('/mapa', isLoggedIn, function(req, res){
	  res.render('mapa', {
	  	h1: 'Mapa - Davo.',
	  	title: 'App - Real Time, Campanas.',
	  });
	});

	/*
	 * GET api reports emails.
	 */

	app.get('/api/reports', ReportCtrl.loadAll);
	app.get('/api/reports/add', TaxonomyCtrl.loadAll, render('reports/add'));
	app.get('/api/reports/update', render('reports/update'));
	app.get('/api/reports/:report_id/markAsSpam', ReportCtrl.markAsSpam);
	app.get('/api/reports/:report_id/markAsVerified', ReportCtrl.markAsVerified);
	app.get('/api/reports/all', ReportCtrl.loadAll, checkJSON);

}

var render = function(path) {
  return function(req, res) { 
    res.render(path, function(err, html){
      console.log(err);
      if(err) return res.send(500);
      res.json({html: html});
    });
  };
};

var checkJSON = function(req, res, next){
  if(req.get('accept') === 'application/json'){
    var response = {};
    for (var key in res.locals){
      if(!_.isFunction(res.locals[key])){
        response[key] = res.locals[key];
      }
    }
    res.json(response);
  }else{
    next();
  }
}

var sendMessage = function(m, res){
  if(res)
  res.json(m);
};

var isLoggedIn = function(req, res, next) {
	if (req.isAuthenticated())
		return next();

	res.redirect('/');
}
