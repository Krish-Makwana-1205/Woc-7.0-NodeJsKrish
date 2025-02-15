const lostschem = require('../model/lost');
const foundschem = require('../model/found');

async function get_lost(req, res) {
    if (req.query.option == null) {
        return res.render('Lost', {
            user: req.user,
            list:[]
        });
    }
    else{
        if(req.query.option == 'lost'){
            const data = await lostschem.findOne({category:req.query.place});
            list = data.lost;
            return res.render('Lost',{
                user:req.user,
                datalist:list
            });

        }
        else{
            const data = await foundschem.findOne({category:req.query.place});
            list = data.lost;
            return res.render('Lost',{
                user:req.user,
                datalist:list
            });
        }
    }
    return res.render('Lost',{user:req.user, list:[]});
}

async function post_lost(req, res) {
    try {
        const body = req.body;
        console.log(req.file);
        if (body.lnf == 'lost') {
            const search = await lostschem.findOne({ category: body.place });
            console.log(search);
            if (search == null) {
                console.log('run');
                await lostschem.create({
                    category: body.place,
                    lost: [{
                        lostuser: req.user.name,
                        name: body.iname,
                        description: body.desc,
                        imgurl: req.file.path
                    }

                    ],
                });
                console.log('pop');
            }
            else {
                const n = await lostschem.findOneAndUpdate(
                    {
                        category: body.place
                    }, {
                    $push: {
                        lost: {
                            lostuser: req.user.name,
                            name: body.iname,
                            description: body.desc,
                            imgurl: req.file.path
                        }
                    }
                }
                )
            }
        }
        else{
            console.log('rundsv');
            const update = await lostschem.findOneAndUpdate(
                {category:body.place},
                {
                    $pull:{
                        lost:{
                            name:body.iname
                        }
                    }
                }
            );
            console.log('runvds');
            const createfound = await foundschem.findOneAndUpdate(
                {
                    category: body.place
                }, {
                $push: {
                    lost: {
                        lostuser: req.user.name,
                        name: body.iname,
                        description: body.desc,
                        imgurl: req.file.path,
                        createdAt: Date.now()
                    }
                }},
                { new: true, upsert: true }
            )
        }
        return res.redirect('/lostnfound');
    }
    catch (error) {

    }
}

module.exports = {
    get_lost,
    post_lost,
}