const express = require('express');
const {makeUser, loginUser} = require('../controller/userveri');

const router = express.Router();

router.post('/registeration', makeUser);
router.get('/registeration',(req, res)=>{
    return res.render('register');
})
router.get('/login',(req, res)=>{
    return res.render('login');
})
router.post('/login', loginUser);
module.exports = router;