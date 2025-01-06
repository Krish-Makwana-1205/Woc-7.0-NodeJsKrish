const mongoose = require('mongoose');

const emailschema = new mongoose.Schema({
    email_id : {
        required: true,
        unique: true,
        type: String
    },
    authorityname:{
        required: true,
        type: String
    }
})

const email = mongoose.model('email', emailschema);

module.exports = email;