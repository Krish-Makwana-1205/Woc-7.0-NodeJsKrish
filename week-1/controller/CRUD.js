const email = require('../model/email');

async function putEmail(req, res){
    const body = req.body;
    if((!body.emailid) || (!body.authorityname)){
        return res.json({
            success:false
        })
    }
    console.log(body.authorityname);
    console.log("debug");
    await email.create({
        email_id: body.emailid,
        authority_name: body.authorityname
    });
    return res.json({
        success: true
    });
}

module.exports ={
    putEmail,
}