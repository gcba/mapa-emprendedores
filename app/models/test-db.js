var mongoose = require('mongoose')
, config = require('../config')
, User = require('./user');

//mongoose.connect(config.db.url || ('mongodb://' + config.db.host + '/'+ config.db.name));
mongoose.connect("mongodb://factorialabgcba:thelabrocks123@ds043180.mongolab.com:43180/visualizacion-cucc");

var newUser = new User();

newUser.local.email = "lm@email.com";
newUser.local.password = newUser.generateHash("password");
newUser.save(function(err) {
    if (err)
        return console.log(err);
    mongoose.disconnect();
});
