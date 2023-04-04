const mongoose = require('mongoose');

const link = new mongoose.Schema({
    oldlink : String , 
    newlink : String ,
    numberofvisit :  {
        type : Number ,
        default : 0 
    }
})

module.exports = mongoose.model('links' , link);