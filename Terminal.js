var repl       = require('repl'),
    docManager = require('./documentManager'),

    mongoose   = require('mongoose');

    mongoose.connect('mongodb://localhost/mongoose');

var replServer = repl.start({
  prompt : 'mongoose ODM > '
});

console.log('Node REPL\n' +
            'Type: DM.<query>.<promise>\n\n' +
            'Here\'s an example: DM.getAllUsers().then(function(users){ console.log(users) })\n\n' + 
            'Type: .help to see few special REPL commands or DM to see all operations: \n'
          );

replServer.context.mongoose = mongoose;
replServer.context.DM = docManager;
