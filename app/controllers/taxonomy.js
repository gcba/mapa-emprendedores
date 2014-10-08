var _ = require('lodash')
  , mongoose = require('mongoose')
  , Report = mongoose.model('Report')
  , Taxonomy = mongoose.model('Taxonomy')
  , ObjectId = mongoose.Schema.ObjectId
  , pubsub = require('../lib/pubsub').pubsub
  , moment = require('moment')

var TaxonomyCtrl = {
  remove: function(message) {
    Taxonomy.findByIdAndRemove(message.item._id)
    .exec(function(err, tx){
      var socket = message.socket;
      delete message.socket;
      socket.in().emit('message', message);
    });
  },
  load: function(req, res, next) {
    Taxonomy.findById(req.params.taxonomy_id)
    .exec(function(err, tx){
      console.log("error load TaxonomyCtrl")
      console.log(err, tx);
      res.locals.taxonomy = tx;
      next();
    });
  },
  loadAll: function(req, res, next) {
    console.log(req.get('Content-Type'));
    Taxonomy.find({})
    .exec(function(err, txs){
      res.locals.taxonomies = txs;
      next();
    });
  },
  update: function(req, res) {
    var fields_updated = {
      name: req.body.name,
      description: req.body.description,
      keywords: (req.body.keywords.length == 0) ? [] : req.body.keywords.trim().toLowerCase().split(','),
      banned: (req.body.banned.length == 0) ? [] : req.body.banned.trim().toLowerCase().split(','),
      color: req.body.color
    };
    Taxonomy.findOneAndUpdate({
      _id: req.params.taxonomy_id}, fields_updated, function(err, tx){
      pubsub.emit('newTaxonomy');
      res.json({error: err, type:'taxonomies', op: 'update', item:tx, redirect_to:'/'});
    });
  },
  save: function(message){
    message.item.keywords = (!message.item.keywords) ? [] : message.item.keywords.trim().toLowerCase().split(',');
    message.item.banned = (!message.item.banned) ? [] : message.item.banned.trim().toLowerCase().split(',');
    var tx = new Taxonomy(message.item);
    tx.save(function(err, tx){
      pubsub.emit('newTaxonomy');
      var socket = message.socket;
      delete message.socket;
      message.item = tx;
      socket.in().emit('message', message);
    });
  }
};

module.exports = TaxonomyCtrl;