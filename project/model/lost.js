const mongoose = require('mongoose');

const lostschema = new mongoose.Schema({
    lostuser : {
        type:String,
    },
     description : {
        type:String,
     },
     imgurl:{
        type:String
     },
     name:{
        type:String,
        unique:true,
     }
});

const category = new mongoose.Schema({
    category:{
        type:String,
        required:true,
    },
    lost:[lostschema]
});

const lost = mongoose.model('lost', category);

module.exports = lost;
