const express = require('express');
const {restrictToLoggedinUserOnly} = require('../middleware/logincheck')
const {askQuestion, postQuestion, fetchMessage} = require('../controller/question');

const router = express.Router();

router.get('/',restrictToLoggedinUserOnly, askQuestion);
router.post('/', restrictToLoggedinUserOnly, postQuestion)
router.get('/:id', restrictToLoggedinUserOnly, fetchMessage);

module.exports = router;