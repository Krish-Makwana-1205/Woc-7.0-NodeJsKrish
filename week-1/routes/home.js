const express = require('express');
const {putEmail, allEmail} = require('../controller/CRUD');
const router = express.Router();

router.get('/', (req, res)=>{
    res.render('post');
})
router.get('/email',allEmail);
router.post('/',putEmail);

module.exports = router;