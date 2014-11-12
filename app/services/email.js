var 
  MailListener = require("mail-listener2")
  , config = require('../config.json')
  , mongoose = require('mongoose')
  , pubsub = require('../lib/pubsub').pubsub
  , mongoose = require('mongoose');


var Email = function(_normalizador){
  
  var mailListener = {}
    , Report = require('../models');

  pubsub.on('newTaxonomy', function(){
    console.log('new newTaxonomy');
    restart();
  });
  
  var start = function(){

    console.log('Start Email service');

    mailListener = new MailListener({
      username: config.mail.user,
      password: config.mail.pass,
      host: config.mail.host,
      port: config.mail.port, // imap port
      tls: false,
      tlsOptions: { rejectUnauthorized: true },
      mailbox: "INBOX", // mailbox to monitor
      markSeen: true, // all fetched email willbe marked as seen and not fetched next time
      fetchUnreadOnStart: true, // use it only if you want to get all unread email on lib start. Default is `false`,
      mailParserOptions: {streamAttachments: true} // options to be passed to mailParser lib.
    });

    mailListener.on("server:connected", function(){
      console.log("imapConnected");
    });

    mailListener.on("server:disconnected", function(){
      console.log("imapDisconnected");
    });

    mailListener.on("error", function(err){
      console.log(err);
    });

    mailListener.on("mail", onNewMail);

    mailListener.start();

  };

  var restart = function(){
    stop();
    start();
  };

  var stop = function(){
      mailListener.stop();
  };

  var onNewMail = function(mail, seqno, attributes){

    var ReportSave = new Report({
      "text": mail.subject + ': ' + mail.text,
      "origin" : "EMAIL"

    }).save();

    console.log(mail);
    console.log(seqno);
    console.log(attributes);

    //console.log(mail.subject + ': ' + mail.text);
    //pubsub.emit('reports.received', mail);
  }

  //Public methods
  return {
    start : start,
    stop : stop
  }

};

module.exports = Email;