const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    questionId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true,
    },
    text:{
        type:String,
        required:true,
    },
    createdAt: {
        type:Date,
        default: Date.now,
    },
    name:{
        type:String,
        required:true,
    }
});

module.exports = mongoose.model('Message', messageSchema);