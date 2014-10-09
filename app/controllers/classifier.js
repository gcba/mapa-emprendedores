// var _ = require('lodash')
//   , mongoose = require('mongoose')
//   , Report = mongoose.model('Report')
//   , Taxonomy = mongoose.model('Taxonomy')
//   , ObjectId = mongoose.Schema.ObjectId
//   , pubsub = require('../lib/pubsub').pubsub
//   , natural = require('natural')
//   , classifier = new natural.BayesClassifier()
//   , moment = require('moment');

// var ClassifierCtrl = {
//   train: function(req, res){
//     Report.find({})
//     .exec(function(err, rps){
//       _.each(rps.toJSON(), function(rp){
//         if(rp.text.length){
//           classifier.addDocument(rp.text, rp.tagged_as);
//         }
//       });
//       try{
//         classifier.train();
//         res.json({err:null});
//       }catch(e){
//         console.log(e);
//         sendMessage({err:'Ocurrio un error al entrenar al clasificador'})
//       }
//     });
//   }
// };

// module.exports = ClassifierCtrl;