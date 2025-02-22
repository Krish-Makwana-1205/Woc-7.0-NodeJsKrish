const question = require('../model/question');
const message = require('../model/message');
const day = require('dayjs');

async function adminquestion(req, res){
    let list = await question.find({}).sort({ createdAt: 1 });
    for(let i = 0; i < list.length; ++i){
        list[i].shorten = day(list[i].createdAt).format('DD/MM/YYYY');
    }
    return res.render('ask-question', {
        list: list,
        user: req.user,
    })
} 
async function askQuestion(req, res) {
    let list = await question.find({}).sort({ createdAt: 1 });
    for(let i = 0; i < list.length; ++i){
        list[i].shorten = day(list[i].createdAt).format('DD/MM/YYYY');
    }
    return res.render('ask-question', {
        list: list,
        user: req.user,
    })
}

async function postQuestion(req, res) {
    
    try {
        if(req.body.option == "delete"){
            const body = req.body;
            const temp = await question.deleteOne({text:body.questionText});
            console.log(temp);
            return res.redirect('/askQuestion');
        }
        const body = req.body;
        const Que = await question.create({
            text: body.questionText,
            createdAt: new Date(),
            name: req.user.name,
        })
        return res.redirect('/askQuestion');
    } catch (error) {
        return res.redirect('/askQuestion');
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
            user:req.user
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
    postMessage,
    adminquestion,
}