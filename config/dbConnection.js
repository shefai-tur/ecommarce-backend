const mongoose = require('mongoose');
 function dbConnection(){
    mongoose.connect(process.env.MONGODBURL)
    .then(() => console.log('Connected!'));
 }

 module.exports=dbConnection