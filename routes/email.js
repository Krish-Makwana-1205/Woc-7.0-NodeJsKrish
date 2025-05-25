const express = require('express');
const {putEmail, allEmail, deleteEmail,chooseEmail} = require('../controller/email.js');
const router = express.Router();
const {restrictToLoggedinUserOnly} = require('../middleware/logincheck');

router.get('/', restrictToLoggedinUserOnly, allEmail);
router.post('/',restrictToLoggedinUserOnly,putEmail);
router.post('/delete',restrictToLoggedinUserOnly, deleteEmail);
router.get('/choose', restrictToLoggedinUserOnly,chooseEmail);
module.exports = router;