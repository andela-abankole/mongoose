// get packages
var express  = require('express'),

    // load mongoose library
    mongoose = require('mongoose'),
    app      = express(),
    // port
    port     = 3000;

/** connect to database database url comes from config file */
mongoose.connect('mongodb://localhost/mongoose');

// start the server
app.listen(port);
console.log('Success: http://localhost:%d', port);