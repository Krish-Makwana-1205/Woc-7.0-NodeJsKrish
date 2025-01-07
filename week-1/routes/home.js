const express = require('express');
const {putEmail} = require('../controller/CRUD');
const router = express.Router();

router.get('/', (req, res)=>{
    res.render('post');
})
router.post('/',putEmail);

module.exports = router;