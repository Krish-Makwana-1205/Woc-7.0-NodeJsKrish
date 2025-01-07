const mongoose = require('mongoose');

const emailschema = new mongoose.Schema({
    email_id : {
        required: true,
        unique: true,
        type: String
    },
    authority_name:{
        type: String,
        required: true
    }
})

const email = mongoose.model('email', emailschema);

module.exports = email;