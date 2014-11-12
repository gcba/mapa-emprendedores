var mongoose = require('mongoose')
, Report = require('../models')
, config = require('../config')
, User = require('./user');

require('../models')()
mongoose.connect(config.db.url || ('mongodb://' + config.db.host + '/'+ config.db.name));

// var asd = new Report();

// asd.text ="asd";
// asd.save();


var newUser = new User();

newUser.local.email = "lm@email.com";
newUser.local.password = newUser.generateHash("password");
newUser.save(function(err) {
    if (err)
        return console.log(err);
    mongoose.disconnect();
});

// http://localhost:3000/api/oauth2/authorize
// client_id 123
// response_type code
// redirect_uri http://localhost:3000
