const express = require('express');
const {restrictToLoggedinUserOnly} = require('../middleware/logincheck')
const {askQuestion, postQuestion, fetchMessage, postMessage} = require('../controller/question');

const router = express.Router();

router.get('/',restrictToLoggedinUserOnly, askQuestion);
router.post('/', restrictToLoggedinUserOnly, postQuestion);
router.get('/:id', restrictToLoggedinUserOnly, fetchMessage);
// router.post('/:id', restrictToLoggedinUserOnly, postMessage);

module.exports = router;