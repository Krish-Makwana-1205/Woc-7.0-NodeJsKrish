const user = require('../model/user');
const {setUser, getUser} = require('../service/auth');
async function makeUser(req, res) {
    const body = req.body;
    let using;
    if((!body.id) || (!body.name) || (!body.email) || (!body.password)){
        return res.redirect('/user/registra')
    }
    try {
        using = await user.create({
            id: body.id,
            name: body.name,
            email: body.email,
            password: body.password
        });
    } catch (error) {
        return res.redirect('/user/login');
    }
    const token = setUser(using);
    res.cookie('uid', token);
    return res.redirect('/askQuestion');
}

async function loginUser(req, res){
    const body = req.body;
    if((!body.id) || (!body.password)){
        return res.redirect('/user/login');
    }
    const User = await user.findOne({id:body.id, password:body.password});
    if(!User){
        return res.redirect('/user/login');
    }
    const token = setUser(User);
    res.cookie('uid', token);
    return res.redirect('/askQuestion');
}

module.exports = {
    makeUser,
    loginUser
}