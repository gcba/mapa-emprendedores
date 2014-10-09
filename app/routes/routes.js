var ReportCtrl = require('../controllers/report.js');
var TaxonomyCtrl = require('../controllers/taxonomy.js');
var passport = require('passport');
var ClassifierCtrl = require('../controllers/classifier.js')

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
	  	h1: 'Visuzalicion CUCC',
	  	title: 'Visuzalicion CUCC',
	  });
	});

	/*
	 * GET mapa page.
	 */

	app.get('/mapa', isLoggedIn, function(req, res){
	  res.render('mapa', {
	  	title: 'Visuzalicion CUCC',
	  });
	});

	/*
	 * GET api reports emails.
	 */

	// app.get('/api/taxonomies', isLoggedIn, TaxonomyCtrl.loadAll, render('taxonomies/index'));
	// app.get('/api/reports', isLoggedIn, ReportCtrl.loadAll)

	// app.get('/api/reports/add', isLoggedIn, TaxonomyCtrl.loadAll, render('reports/add'));

	// app.get('/api/reports/update', isLoggedIn, render('reports/update'));

	// app.get('/api/taxonomies/add', isLoggedIn, render('taxonomies/add'));
	// app.post('/api/taxonomies/add', isLoggedIn, TaxonomyCtrl.save);

	// app.get('/api/taxonomies/:taxonomy_id/update', isLoggedIn, TaxonomyCtrl.load, render('taxonomies/update'));
	// app.post('/api/taxonomies/:taxonomy_id/update', isLoggedIn, TaxonomyCtrl.update);

	// app.get('/api/taxonomies/:taxonomy_id/remove', isLoggedIn, TaxonomyCtrl.remove);

	// app.get('/api/reports/:report_id/markAsSpam', isLoggedIn, ReportCtrl.markAsSpam);
	// app.get('/api/reports/:report_id/markAsVerified', isLoggedIn, ReportCtrl.markAsVerified);
	// app.get('/api/classifier/train', isLoggedIn, ClassifierCtrl.train);

	// //Ajax
	// app.get('/api/reports/all', isLoggedIn, ReportCtrl.loadAll, checkJSON);
	// app.get('/api/taxonomies/all', isLoggedIn, TaxonomyCtrl.loadAll, checkJSON);

}

// var render = function(path) {
//   return function(req, res) { 
//     res.render(path, function(err, html){
//       console.log(err);
//       if(err) return res.send(500);
//       res.json({html: html});
//     });
//   };
// };

// var checkJSON = function(req, res, next){
//   if(req.get('accept') === 'application/json'){
//     var response = {};
//     for (var key in res.locals){
//       if(!_.isFunction(res.locals[key])){
//         response[key] = res.locals[key];
//       }
//     }
//     res.json(response);
//   }else{
//     next();
//   }
// }

// var sendMessage = function(m, res){
//   if(res)
//   res.json(m);
// };

var isLoggedIn = function(req, res, next) {
	if (req.isAuthenticated())
		return next();

	res.redirect('/');
}
