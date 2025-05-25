const express = require('express');
const Message = require('../model/message'); 
const {restrictToLoggedinUserOnly} = require('../middleware/logincheck');

const router = express.Router();

module.exports = (io) => {
    router.post('/send/:id', restrictToLoggedinUserOnly,async (req, res) => {
        try {
            const body = req.body;
            const questionId = req.params.id;    
            const newMessage =  await Message.create({
                questionId:questionId,
                text: body.textfield,
                createdAt: new Date(),
                name: req.user.name,
            });
            io.to(questionId).emit('message', newMessage);
            return res.redirect(`/askQuestion/${questionId}`);
        } catch (error) {
            return res.status(500);
        }
    });

    return router;
};
