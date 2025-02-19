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

const categoryschema = new mongoose.Schema({
    department:{
        type: String,
        required: true,
    },
    list:[emailschema],
});

const category = mongoose.model('email_cat', categoryschema);
const email = mongoose.model('email', emailschema);

module.exports = category;