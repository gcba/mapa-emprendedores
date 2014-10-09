// var _ = require('lodash')
//   , config = require('../config')
//   , mongoose = require('mongoose')
//   , Report = mongoose.model('Report')
//   , Taxonomy = mongoose.model('Taxonomy')
//   , ObjectId = mongoose.Schema.ObjectId
//   , pubsub = require('../lib/pubsub').pubsub
//   , moment = require('moment');

// var ReportCtrl = {
//   remove: function(message) {
//     Report.findByIdAndRemove(message.item._id)
//     .exec(function(err, rp){
//       var socket = message.socket;
//       delete message.socket;
//       socket.in().emit('message', message);
//     });
//   },
//   save: function(message){
//     delete message.socket;
//     var rp = new Report(message.item);
//     rp.origin = 'FORM';
//     rp.tagged_as = 'revision';
//     pubsub.emit('reports.received', rp);
//   },
//   loadAll: function(req, res, next){
//     var filter = {
//       'time': {$gt: moment().subtract('days', 1)},
//       'geo.coordinates.custom': {$not: {$size: 0}},
//       'taxonomies': {$not: {$size: 0}}
//     };
//     if(req.query.tax){
//       filter.taxonomies = {$in: [req.query.tax]};
//       ReportCtrl._loadReports(res, filter);
//     } else {
//       Taxonomy.find().exec(function(err, t){
//         console.log(t);
//         filter.taxonomies = {$in: t};
//         ReportCtrl._loadReports(res, filter);
//       });
//     }  
//   },
//   _loadReports: function(res, filter){
//     var features = [];
//     Report.find(filter).exec(function(err,reports){
//       if(reports){
//         _.each(reports, function(r){
//           features.push(
//             { "type": "Feature",
//               "_id": r._id,
//               "geometry": {"type": "Point", "coordinates": r.geo.coordinates.custom},
//               "properties": r.toJSON()
//             }
//           );
//         });
//       }
//       res.jsonp({ "type": "FeatureCollection",
//         "features": features
//       }); 
//     });
//   },
//   markAsSpam: function(message){
//     Report.findByIdAndUpdate(message.item._id, {tagged_as:'spam'})
//     .exec(function(err, rp){
//       var socket = message.socket;
//       delete message.socket;
//       socket.in().emit('message', message);
//     });  
//   },
//   markAsVerified: function(message){
//     Report.findByIdAndUpdate(message.item.report_id, {tagged_as:'verified'})
//     .exec(function(err, rp){
//       var socket = message.socket;
//       delete message.socket;
//       socket.in().emit('message', message);
//     });     
//   }
// };

// module.exports = ReportCtrl;