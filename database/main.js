

var creator=require('../database/init');
var mongoose = require('mongoose');


function connect(){
    0
mongoose.connect('mongodb://localhost/FARMDROID', function(err) {
    if (err) { throw err; }
  });

  console.log("Connexion effectuée avec succès");
  creator(mongoose);
  //mongoose.connection.close();

}
connect();