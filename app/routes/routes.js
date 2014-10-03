
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { 
  	h1: 'App - Real Time, Campanas.',
  	title: 'App - Real Time, Campanas.',
  });
};

exports.mapa = function(req, res){
  res.render('mapa', { 
  	h1: 'Mapa - Davo.',
  	title: 'App - Real Time, Campanas.',
  });
};