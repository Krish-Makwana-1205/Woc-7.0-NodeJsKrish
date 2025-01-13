const question = require('../model/question');
const message = require('../model/message');
const sock = require('socket.io');
const http = require('http');

function initialServer(){
    
}

async function askQuestion(req, res) {
    const list = await question.find({}).sort({ createdAt: 1 });
    return res.render('ask-question', {
        list: list
    })
}

async function postQuestion(req, res) {
    try {
        const body = req.body;
        const Que = await question.create({
            text: body.questionText,
            createdAt: new Date(),
            name: req.user.name,
        })
        return res.redirect('/askQuestion');
    } catch (error) {
        return res.redirect('./askQuestion');
    }
}

async function fetchMessage(req, res) {
    try {
        const id = req.params.id;
        const mes = await message.find({ questionId: id });
        const ques = await question.findById(id);
        if (!ques) {
            return null;
        }
        return res.render('chat', {
            question: ques,
            messages: mes,
        })
    }catch(error){
        return res.status(500);
    }
}

async function postMessage(req, res){
    const qid = req.params.id;
    const text = req.body.textfield;
    const name = req.user.name;
    if(!text){
        return res.status(500);
    }
    try{
        const mes = await message.create({
            text:text,
            name:name,
            createdAt: new Date(),
            questionId:qid 
        })
        io.to(qid).emit('new-message', mes);
        return res.redirect("/askQuestion/"+qid);
    }catch(error){
        return res.status(500);
    }
}


module.exports = {
    askQuestion,
    postQuestion,
    fetchMessage,
    postMessage
}