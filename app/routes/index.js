
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { 
  	h1: 'App - Real Time, Campanas.',
  	title: 'lolo'
  });
};