const email = require('../model/email');

async function putEmail(req, res) {
    const body = req.body;
    if(req.user.name != 'admin'){
        return null;
    }
    try {
        await email.create({
            email_id: body.emailid,
            authority_name: body.authorityname
        });
    } catch (error) {
        return res.redirect('/email');
    }
    return res.redirect('/email');
}
async function allEmail(req, res) {
    const list = await email.find({});
    res.render('showall', {
        items: list,
        user: req.user
    })
}
async function deleteEmail(req, res) {
    if(req.user.name != 'admin'){
        return null;
    }
    await email.deleteOne({ email_id: req.body.emailid });
    res.redirect('/email');
}
module.exports = {
    putEmail,
    allEmail,
    deleteEmail
}