const mongoose = require('mongoose');

const lostschema = new mongoose.Schema({
    lostuser : {
        type:String,
        required:true,
    },
     description : {
        type:String,
     },
     imgurl:{
        type:String
     },
     createdAt:{
        type:Date,
        required:true
     },
     name:{
        type:String,
        required:true,
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

const found = mongoose.model('found', category);

module.exports = found;