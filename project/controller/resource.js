const file = require('../model/file');

async function get_files(req, res) {
    try {
        data = await file.findOne({sub: req.query.sub });
        if(!data){
            return res.render('Resource-share', {
                user: req.user,
                list: null
            })
        }
        const list = data.files;
        console.log(list);
        return res.render('Resource-share', {
            user: req.user,
            list: list,
        })
    } catch (error) {

    }
}

async function put_files(req, res) {
    try {
        const filename = req.file.filename;
        const link = '/uploads/' + filename;
        const subject = await file.findOne({ sub: req.body.sub });
        if (subject == null) {
            if (req.user.name == 'admin') {
                await file.create({
                    sub: req.body.sub
                });
            }
            else {
                return res.status(500);
            }
        }
        const x = await file.findOneAndUpdate(
            { sub: req.body.sub },
            { $push: { files: link } },
            { new: true, runValidators: true },
        )
        return res.render('Resource-share', {
            user: req.user,
            list:null,
        });
    } catch (error) {

    }
}

module.exports = {
    get_files,
    put_files
};