const email = require('../model/email');

async function putEmail(req, res) {
    const body = req.body;
    if(req.user.name != 'admin'){
        return null;
    }
    try {
        console.log('I run');
        const y = await email.findOne(
            {department:body.category}
        )
        if(y == null){
            await email.create({
                department:body.category,
                list:[]
            })
        }
        const x = await email.findOneAndUpdate(
            { department: body.category },
            { $push: { list: {email_id:body.emailid,  authority_name:body.authorityname} }},
            { new: true, runValidators: true },
        )
    } catch (error) {
        return res.redirect('/email');
    }
    return res.redirect('/email');
}
function allEmail(req, res) {
    //const list = await email.find({});
    res.render('showall', {
        items: [],
        user: req.user
    })
}
async function deleteEmail(req, res) {
    if(req.user.name != 'admin'){
        return null;
    }
    const body = req.body;
    const x = await email.findOneAndUpdate(
        { department: body.category },
        { $pull: { list: {email_id:body.emailid}}},
        { new: true, runValidators: true },
    );
    res.redirect('/email');
}
async function chooseEmail(req, res){
    const query = req.query;
    try{
        const data = await email.findOne({department:query.category});
        const list = data.list;
        return res.render('showall', {
            user:req.user,
            items:list,
        })
    }catch(error){

    }
}
module.exports = {
    putEmail,
    allEmail,
    deleteEmail,
    chooseEmail
}