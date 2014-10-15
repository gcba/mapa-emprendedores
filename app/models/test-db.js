var mongoose = require('mongoose')
var config = require('../config')
, User = require('./user');

//mongoose.connect(config.db.url || ('mongodb://' + config.db.host + '/'+ config.db.name));
mongoose.connect("mongodb://factorialabgcba:thelabrocks123@ds043180.mongolab.com:43180/visualizacion-cucc");

//module.exports = function(mongoose){

var newUser = new User();
newUser.local.email = "invitado@email.com";
newUser.local.password = newUser.generateHash("remolacha");
newUser.save(function(err) {
    if (err)
        return console.log(err);
    mongoose.disconnect();
});
