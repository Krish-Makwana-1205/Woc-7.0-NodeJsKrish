async function displayHome(req, res){
    return res.render('home',{
        user:req.user,
    });
}

module.exports = {
    displayHome
}