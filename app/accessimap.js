var MailListener = require("mail-listener2");

console.log('Start Email service');

mailListener = new MailListener({
  username: "luisuranga@buenosaires.gob.ar",
  password: "ze8ucala",
  host: "imap.buenosaires.gob.ar",
  port: 143, // imap port
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

mailListener.on("mail", function(mail, seqno, attributes){

    var lolo = JSON.parse(mail);
    console.log(lolo.text);
    //console.log(seqno);
    //console.log(attributes);

});

mailListener.start();