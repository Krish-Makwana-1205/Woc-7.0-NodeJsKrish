const mongoose = require('mongoose');


const filedata = new mongoose.Schema({
    sub: {
        type:String,
        required:true
    },
    files:[String]
})

const file = mongoose.model('file', filedata);

module.exports = file;