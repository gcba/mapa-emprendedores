//var Nagios = require('../models/nagios');
var FormatDate = require('../services/formatdate');
var Festadisticas = require('../models/festadisticas');

exports.filtroestadisticas = function(req, res) {
	var start = FormatDate(req.params.start)
	var end = FormatDate(req.params.end)
	Festadisticas.find({fraccion_id:req.params.fraccion_id, updated_at: {$gte: start, $lte: end}}, function(err, fracciones){
		if (err)
			res.send(err);

		res.json(fracciones);
	});
}
