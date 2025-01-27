const express = require('express');
const {putEmail, allEmail, deleteEmail} = require('../controller/CRUD');
const router = express.Router();
const {restrictToLoggedinUserOnly} = require('../middleware/logincheck');

// router.get('/', (req, res)=>{
//     res.render('showall'.{
//         items
//     });
// })
router.get('/', restrictToLoggedinUserOnly, allEmail);
router.post('/',putEmail);
router.post('/delete', deleteEmail);

module.exports = router;